import {
  View,
  StyleSheet,
  useColorScheme,
  Alert,
  Pressable,
  Text,
  Button,
  GestureResponderEvent,
} from 'react-native';
import Categories from '../components/HomeScreen/Categories/Categories';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Colors} from '../constants/Color';
import {useCallback, useEffect, useState} from 'react';
import {fetchAndParseRss} from '../utils/rssHandler';
import {
  CategoryInterface,
  TT_CATEGORIES,
  VE_CATEGORIES,
} from '../constants/Categories';

import HomeHeader from '../components/HomeScreen/Header';
import ModalOverlay from '../components/UI/ModalOverlay';
import {useSelector, useDispatch} from 'react-redux';
import {newsSourceActions} from '../store/news-source-slice';
import {categoriesActions} from '../store/categories-slice';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Bookmarks} from '../utils/database';

export interface Overview {
  title: string;
  category: string;
  author: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  bookmarked: boolean;
}

export interface PressedItem extends Overview {
  index: number;
}

export enum NewsSource {
  VnExpress = 'vnexpress',
  TuoiTre = 'tuoitre',
}

export default function HomeScreen(): React.JSX.Element {
  const [title, setTitle] = useState<string>(NewsSource.VnExpress);
  // const [newsSource, setNewsSource] = useState<string>(NewsSource.VnExpress);
  const newsSource = useSelector<RootState>(
    state => state.newsSource,
  ) as string;
  // const [chosenCategory, setChosenCategory] = useState<CategoryInterface>(
  //   VE_CATEGORIES[0],
  // );
  const chosenCategory = useSelector<RootState>(
    state => state.categories.currentCategory,
  ) as CategoryInterface;
  const [overviews, setOverviews] = useState<Overview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSourcePopover, setShowSourcePopover] = useState<boolean>(false);
  const [newsSourcePopoverCoord, setNewsSourcePopoverCoord] = useState({
    x: 0,
    y: 0,
  });
  const userEmail = useSelector<RootState>(state => state.authentication.email);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  // Change category handler
  const categoryChangeHandler = async function (
    newsSource: string,
    chosenCategory: CategoryInterface,
  ) {
    setIsLoading(true);
    // setChosenCategory(chosenCategory);

    try {
      // console.log('here', chosenCategory.url);

      const res = await fetchAndParseRss(
        newsSource,
        chosenCategory.url,
        chosenCategory.name,
      );

      setOverviews(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch news function
  const fetchData = useCallback(async function (
    newsSource: string,
    chosenCategory: CategoryInterface,
  ) {
    setIsLoading(true);

    try {
      const res = await fetchAndParseRss(
        newsSource,
        chosenCategory.url,
        chosenCategory.name,
      );

      setOverviews(res);
      setIsLoading(false);
    } catch (err) {
      Alert.alert('Something went wrong', 'Could not fetch news');
    }
  },
  []);

  // Show news source popover
  const showNewsSourcePopoverHandler = function (pageX: number, pageY: number) {
    setNewsSourcePopoverCoord({x: pageX, y: pageY});
    setShowSourcePopover(true);
  };

  // Save news source to storage
  const saveToStorage = async function (source: string) {
    try {
      await AsyncStorage.setItem(`${userEmail}-news-source`, source);
    } catch (err) {
      console.log(err);
    }
  };

  // Change news source handler
  const changeNewsSourceHandler = async function (
    e: GestureResponderEvent,
    source: string,
  ) {
    const dataFromStorage = await AsyncStorage.getItem(
      `${userEmail}-categories`,
    );
    if (dataFromStorage) {
      const parsedData = JSON.parse(dataFromStorage);
      if (source === NewsSource.VnExpress) {
        const chosenCategory = parsedData.vnexpress.find(
          (cat: CategoryInterface) => cat.chosen,
        );
        dispatch(categoriesActions.update(parsedData.vnexpress));
        dispatch(categoriesActions.changeCurrentCategory(chosenCategory));
        fetchData(source, chosenCategory);
      }

      if (source === NewsSource.TuoiTre) {
        const chosenCategory = parsedData.tuoitre.find(
          (cat: CategoryInterface) => cat.chosen,
        );
        dispatch(categoriesActions.update(parsedData.tuoitre));
        dispatch(categoriesActions.changeCurrentCategory(chosenCategory));
        fetchData(source, chosenCategory);
      }
    }

    setShowSourcePopover(false);
    // setNewsSource(source);
    dispatch(newsSourceActions.change(source));
    setTitle(source);

    saveToStorage(source);
  };

  // Fetch news on initial load
  useEffect(() => {
    console.log('running ');
    // Load news source from storage if true
    const getDataFromStorage = async function () {
      try {
        const newsSource =
          (await AsyncStorage.getItem(`${userEmail}-news-source`)) ??
          NewsSource.VnExpress;
        const categoriesInStorage = await AsyncStorage.getItem(
          `${userEmail}-categories`,
        );
        // Set news source
        if (newsSource) {
          dispatch(newsSourceActions.change(newsSource));
          setTitle(newsSource);
        }

        // Set categories
        if (categoriesInStorage) {
          const parsedData = JSON.parse(categoriesInStorage);
          const categories = parsedData[newsSource as string];

          const firstCategory = categories.find(
            (cat: CategoryInterface) => cat.chosen,
          );
          dispatch(categoriesActions.update(categories));
          dispatch(categoriesActions.changeCurrentCategory(firstCategory));
          fetchData(newsSource as string, firstCategory);
        } else {
          const categories =
            newsSource === NewsSource.VnExpress ? VE_CATEGORIES : TT_CATEGORIES;
          const firstCategory = categories.find(
            (cat: CategoryInterface) => cat.chosen,
          );
          dispatch(categoriesActions.update(categories));
          dispatch(categoriesActions.changeCurrentCategory(firstCategory));
          fetchData(newsSource as string, firstCategory as CategoryInterface);

          await AsyncStorage.setItem(
            `${userEmail}-categories`,
            JSON.stringify({
              vnexpress: VE_CATEGORIES,
              tuoitre: TT_CATEGORIES,
            }),
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    getDataFromStorage();

    Bookmarks.onChange(() => {
      console.log('on change');
    });
  }, []);

  // Set bookmarked false
  useEffect(() => {
    if (isFocused) {
      Promise.all(
        overviews.map(async item => {
          const isBookmarked = await Bookmarks.get({link: item.link});
          if (isBookmarked) {
            item.bookmarked = true;
          } else {
            item.bookmarked = false;
          }

          return item;
        }),
      ).then(updatedData => {
        setOverviews(updatedData);
      });
    }
  }, [isFocused]);

  return (
    <>
      <Pressable style={{flex: 1}}>
        <View
          style={[styles.container, {backgroundColor: activeColor.primary}]}>
          <HomeHeader
            title={title === NewsSource.VnExpress ? 'VnExpress' : 'Tuổi Trẻ'}
            onShowNewsSource={showNewsSourcePopoverHandler}
          />
          {/* Categories */}
          <Categories
            onChangeCategory={categoryChangeHandler}
            newsSource={newsSource}
          />
          {/* <Button
            title="Clear"
            onPress={async () =>
              console.log(
                await AsyncStorage.removeItem(`${userEmail}-categories`),
              )
            }
          />
      
          <Button
            title="Clear News Source"
            onPress={async () =>
              console.log(
                await AsyncStorage.removeItem(`${userEmail}-news-source`),
              )
            }
          />
          <Button
            title="Categories"
            onPress={async () =>
              console.log(await AsyncStorage.getItem(`${userEmail}-categories`))
            }
          />*/}

          {/* Articles list */}
          <NewsOverviewList
            data={overviews}
            onRefresh={() => {}}
            isLoading={isLoading}
          />
          {/* Change news source popover */}
          {showSourcePopover && (
            <ModalOverlay onPress={() => setShowSourcePopover(false)}>
              <View
                style={[
                  styles.sourcePopover,
                  {
                    position: 'absolute',
                    top: newsSourcePopoverCoord.y + 20,
                    left: newsSourcePopoverCoord.x - 100,
                  },
                ]}>
                <Pressable
                  style={[
                    styles.sourceOptions,
                    newsSource === NewsSource.VnExpress &&
                      styles.sourceHighlight,
                  ]}
                  onPress={e => {
                    changeNewsSourceHandler(e, NewsSource.VnExpress);
                    setShowSourcePopover(false);
                  }}>
                  <Text style={styles.menuText}>VnExpress</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.sourceOptions,
                    newsSource === NewsSource.TuoiTre && styles.sourceHighlight,
                  ]}
                  onPress={e => {
                    changeNewsSourceHandler(e, NewsSource.TuoiTre);
                    setShowSourcePopover(false);
                  }}>
                  <Text style={styles.menuText}>Tuoi Tre</Text>
                </Pressable>
              </View>
            </ModalOverlay>
          )}
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },

  sourcePopover: {
    flex: 1,
    justifyContent: 'space-between',

    width: 120,
    height: 80,
    marginRight: 20,
    borderRadius: 10,
    // Box shadow Android
    elevation: 4,
    // Box shadow IOS
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    backgroundColor: '#fff',
  },
  sourceOptions: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuText: {
    fontWeight: '600',
    fontSize: 16,
  },
  sourceHighlight: {
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
  },
});
