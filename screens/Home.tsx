import {
  View,
  StyleSheet,
  useColorScheme,
  Alert,
  Pressable,
  Text,
  GestureResponderEvent,
} from 'react-native';
import Categories from '../components/HomeScreen/Categories/Categories';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Colors} from '../constants/Color';
import {useCallback, useEffect, useState} from 'react';
import {fetchAndParseRss} from '../utils/rssHandler';
import {CATEGORIES, Catergory} from '../constants/Categories';
import {Bookmarks} from '../utils/database';

import HomeHeader from '../components/HomeScreen/Header';
import PopoverMenu from '../components/UI/PopoverMenu';
import ModalOverlay from '../components/UI/ModalOverlay';

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
  VnExpress = 'VnExpress',
  TuoiTre = 'Tuoi Tre',
}

export default function HomeScreen(): React.JSX.Element {
  const [title, setTitle] = useState<string>(NewsSource.VnExpress);
  const [newsSource, setNewsSource] = useState<string>(NewsSource.VnExpress);
  const [chosenCategory, setChosenCategory] = useState<Catergory>(
    CATEGORIES[0],
  );
  const [overviews, setOverviews] = useState<Overview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSourcePopover, setShowSourcePopover] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [popoverCoord, setPopoverCoord] = useState({x: 0, y: 0});
  const [newsSourcePopoverCoord, setNewsSourcePopoverCoord] = useState({
    x: 0,
    y: 0,
  });
  const [pressedItemData, setPressedItemData] = useState<
    PressedItem | undefined
  >(undefined);

  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  // Change category handler
  const categoryChangeHandler = async function (chosenCategory: Catergory) {
    setIsLoading(true);
    setChosenCategory(chosenCategory);

    try {
      const res = await fetchAndParseRss(
        newsSource,
        newsSource === NewsSource.VnExpress
          ? chosenCategory.vneUrl
          : chosenCategory.tuoiTreUrl,
        chosenCategory.name,
      );

      setOverviews(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch news function
  const fetchData = useCallback(
    async function () {
      setIsLoading(true);

      try {
        const res = await fetchAndParseRss(
          newsSource,
          newsSource === NewsSource.VnExpress
            ? chosenCategory.vneUrl
            : chosenCategory.tuoiTreUrl,
          chosenCategory.name,
        );

        setOverviews(res);
        setIsLoading(false);
      } catch (err) {
        Alert.alert('Something went wrong', 'Could not fetch news');
      }
    },
    [newsSource, chosenCategory],
  );

  // Show share/bookmark popover handler
  const showPopoverHandler = function (
    pageX: number,
    pageY: number,
    pressedItem: PressedItem,
  ) {
    setPressedItemData(pressedItem);
    setPopoverCoord({x: pageX, y: pageY});
    setShowPopover(true);
  };

  // Save item to bookmark database
  // const bookmarkHandler = function () {
  //   // Check if item is already bookmarked
  //   if (pressedItemData?.bookmarked) {
  //     Alert.alert('Already bookmarked', 'You can see this in bookmark page');
  //     // Un-bookmark later
  //     return;
  //   }

  //   // Save item to bookmark database
  //   Bookmarks.insert(
  //     {
  //       title: pressedItemData?.title,
  //       link: pressedItemData?.link,
  //       author: pressedItemData?.author,
  //       category: pressedItemData?.category,
  //       pubDate: pressedItemData?.pubDate,
  //       thumbnail: pressedItemData?.thumbnail,
  //       userEmail: 'quang@gmail.com',
  //     },
  //     true,
  //   );

  //   // Bookmarks.removeAllRecords();
  //   // Change bookmark status of the item then setOverviews
  //   setOverviews(prev => {
  //     const updatedState = [...prev];
  //     updatedState[pressedItemData?.index as number].bookmarked = true;

  //     return updatedState;
  //   });

  //   // Close popover menu
  //   setShowPopover(false);
  // };

  // Show news source popover
  const showNewsSourcePopoverHandler = function (pageX: number, pageY: number) {
    setNewsSourcePopoverCoord({x: pageX, y: pageY});
    setShowSourcePopover(true);
  };

  // Hide popover
  const hidePopoverHandler = function () {
    setPressedItemData(undefined);
    setShowPopover(false);
    setShowSourcePopover(false);
  };

  // Change news source handler
  const changeNewsSourceHandler = function (
    e: GestureResponderEvent,
    source: string,
  ) {
    hidePopoverHandler();
    setNewsSource(source);
    setTitle(source);
  };

  // Fetch news on initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Pressable style={{flex: 1}} onPress={hidePopoverHandler}>
        <View
          style={[styles.container, {backgroundColor: activeColor.primary}]}>
          <HomeHeader
            title={title}
            onShowNewsSource={showNewsSourcePopoverHandler}
          />

          {/* Categories */}
          <Categories
            onChangeCategory={categoryChangeHandler}
            newsSource={newsSource}
          />
          {/* Articles list */}
          <NewsOverviewList
            data={overviews}
            onRefresh={fetchData}
            onShowPopover={showPopoverHandler}
            // onBookmark={bookmarkHandler}
            isLoading={isLoading}
          />

          {/* Share and Boomark Popover */}
          {showPopover && (
            <ModalOverlay onPress={hidePopoverHandler}>
              <PopoverMenu
                onBookmark={() => {}}
                onHidePopover={hidePopoverHandler}
                style={{
                  position: 'absolute',
                  top: popoverCoord.y,
                  left: popoverCoord.x - 110,
                }}
              />
            </ModalOverlay>
          )}

          {/* Change news source popover */}
          {showSourcePopover && (
            <ModalOverlay onPress={hidePopoverHandler}>
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
                  style={styles.sourceOptions}
                  onPress={e => {
                    changeNewsSourceHandler(e, NewsSource.VnExpress);
                    setShowSourcePopover(false);
                  }}>
                  <Text style={styles.menuText}>VnExpress</Text>
                </Pressable>
                <Pressable
                  style={styles.sourceOptions}
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
});
