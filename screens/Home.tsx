import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  Text,
  Button,
  GestureResponderEvent,
  Appearance,
} from 'react-native';
import Categories from '../components/HomeScreen/Categories/Categories';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Colors} from '../constants/Color';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
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
import {useIsFocused} from '@react-navigation/native';
import {Bookmarks, Users, News} from '../utils/database';
import {themeActions} from '../store/theme-slice';

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
  const newsSource = useSelector<RootState>(
    state => state.newsSource,
  ) as string;
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
  const userEmail = useSelector<RootState>(
    state => state.authentication.email,
  ) as string;
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  // const theme = useColorScheme() ?? 'light';
  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];

  // Change category handler
  const categoryChangeHandler = async function (
    newsSource: string,
    chosenCategory: CategoryInterface,
  ) {
    setIsLoading(true);

    try {
      const res = await fetchAndParseRss(
        newsSource,
        chosenCategory.url,
        chosenCategory.name,
        userEmail,
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
        userEmail,
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

  // Change news source handler
  const changeNewsSourceHandler = async function (
    e: GestureResponderEvent,
    source: string,
  ) {
    const userInDb = await Users.get({email: userEmail});
    const parsedCategories = JSON.parse(userInDb.categories);
    // Set new catgories
    const categories = parsedCategories[source];
    const chosenCategory = categories.find(
      (cat: CategoryInterface) => cat.chosen,
    );

    setShowSourcePopover(false);
    setTitle(source);
    dispatch(newsSourceActions.change(source));
    dispatch(categoriesActions.update(categories));
    dispatch(categoriesActions.changeCurrentCategory(chosenCategory));
    fetchData(source, chosenCategory);

    //Save new news source to database
    await Users.update(userInDb.id, {newsSource: source});
  };

  // Check database for current user
  // If true, load all settings
  // If false, create new default settings and save to database
  useEffect(() => {
    const getUserFromDb = async function () {
      const userInDb = await Users.find({email: userEmail});

      if (userInDb) {
        // console.log('user in db', userInDb);
        // console.log('categories here', JSON.parse(userInDb.categories));
        const userNewsSource = userInDb.newsSource;
        const parsedCategories = JSON.parse(userInDb.categories);
        const categories = parsedCategories[userNewsSource];

        const chosenCategory = categories.find(
          (cat: CategoryInterface) => cat.chosen,
        );

        setTitle(userNewsSource);
        dispatch(newsSourceActions.change(userNewsSource));
        dispatch(categoriesActions.update(categories));
        dispatch(categoriesActions.changeCurrentCategory(chosenCategory));
        fetchData(userNewsSource, chosenCategory);
      } else {
        // Create new default settings and save to database
        const defaultCategories = {
          vnexpress: VE_CATEGORIES,
          tuoitre: TT_CATEGORIES,
        };

        await Users.insert({
          email: userEmail,
          newsSource: NewsSource.VnExpress,
          categories: JSON.stringify(defaultCategories),
          language: 'en',
          theme: theme,
        });

        // Fetch news with default setting
        fetchData(newsSource, chosenCategory);

        News.onChange(() => {
          console.log('on change');
        });
      }
    };

    getUserFromDb();
  }, []);

  // Set bookmarked status when database changed
  // useEffect(() => {
  //   if (isFocused) {
  //     // console.log('focusing');
  //     // console.log(overviews);

  //     Promise.all(
  //       overviews.map(async item => {
  //         const isBookmarked = await News.get({
  //           link: item.link,
  //           bookmarked: true,
  //         });
  //         // console.log(isBookmarked);

  //         if (isBookmarked) {
  //           // console.log(283, isBookmarked);

  //           item.bookmarked = true;
  //         } else {
  //           item.bookmarked = false;
  //         }

  //         return item;
  //       }),
  //     ).then(updatedData => {
  //       setOverviews(updatedData);
  //     });
  //   }
  // }, [isFocused]);

  useLayoutEffect(() => {
    const getThemeFromDb = async function () {
      try {
        const user = await Users.get({email: userEmail});
        if (user) {
          const theme = user.theme;
          // console.log('user theme', theme);

          dispatch(themeActions.set(theme));
          // Appearance.setColorScheme(theme);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getThemeFromDb();
  }, []);

  const styles = customStyle(activeColor);

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
            onPress={async () => await Users.removeAllRecords()}
          /> 
          <Button
            title="Get DB"
            onPress={async () => console.log(await Users.data())}
          />*/}

          {/* Articles list */}
          <NewsOverviewList
            data={overviews}
            onRefresh={() => fetchData(newsSource, chosenCategory)}
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

const customStyle = (activeColor: any) =>
  StyleSheet.create({
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
      backgroundColor: activeColor.primary,
    },
    sourceOptions: {
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    menuText: {
      fontWeight: '600',
      fontSize: 16,
      color: activeColor.textPrimary,
    },
    sourceHighlight: {
      backgroundColor: activeColor.secondary,
      borderRadius: 10,
    },
  });
