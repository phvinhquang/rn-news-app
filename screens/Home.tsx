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
import {Catergory} from '../constants/Categories';

import HomeHeader from '../components/HomeScreen/Header';
import PopoverMenu from '../components/UI/PopoverMenu';

export interface Overview {
  title: string;
  category: string;
  author: string;
  link: string;
  pubDate: string;
  thumbnail: string;
}

export enum NewsSource {
  VnExpress = 'VnExpress',
  TuoiTre = 'Tuoi Tre',
}

export default function HomeScreen(): React.JSX.Element {
  const [title, setTitle] = useState<string>(NewsSource.VnExpress);
  const [newsSource, setNewsSource] = useState<string>(NewsSource.VnExpress);
  const [overviews, setOverviews] = useState<Overview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSourcePopover, setShowSourcePopover] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [popoverCoord, setPopoverCoord] = useState({x: 0, y: 0});
  const [newsSourcePopoverCoord, setNewsSourcePopoverCoord] = useState({
    x: 0,
    y: 0,
  });

  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  // Change category handler
  const categoryChangeHandler = async function (chosenCategory: Catergory) {
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
      console.log(err);
    }
  };

  // Fetch news function
  const fetchData = useCallback(
    async function () {
      setIsLoading(true);

      // console.log('from fetch data', newsSource);

      try {
        const res = await fetchAndParseRss(
          newsSource,
          'tin-noi-bat.rss',
          'For You',
        );

        // console.log('response', res);

        setOverviews(res);
        setIsLoading(false);
      } catch (err) {
        Alert.alert('Something went wrong', 'Could not fetch news');
      }
    },
    [newsSource],
  );

  // Show share/bookmark popover handler
  const showPopoverHandler = function (pageX: number, pageY: number) {
    setPopoverCoord({x: pageX, y: pageY});
    setShowPopover(true);
  };

  // Show news source popover
  const showNewsSourcePopoverHandler = function (pageX: number, pageY: number) {
    setNewsSourcePopoverCoord({x: pageX, y: pageY});
    setShowSourcePopover(true);
  };

  // Hide popover
  const hidePopoverHandler = function () {
    setShowPopover(false);
    setShowSourcePopover(false);
  };

  // Change news source handler
  const changeNewsSourceHandler = function (
    e: GestureResponderEvent,
    source: string,
  ) {
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
            popoverIsShown={showPopover}
            newsSourcePopoverIsShown={showSourcePopover}
            onHidePopover={hidePopoverHandler}
            newsSource={newsSource}
          />
          {/* Articles list */}
          <NewsOverviewList
            data={overviews}
            onRefresh={fetchData}
            onShowPopover={showPopoverHandler}
            isLoading={isLoading}
            popoverIsShown={showPopover}
            newsSourcePopoverIsShown={showSourcePopover}
            onHidePopover={hidePopoverHandler}
          />

          {/* Share and Boomark Popover */}
          {showPopover && (
            <PopoverMenu
              onHidePopover={hidePopoverHandler}
              style={{
                position: 'absolute',
                top: popoverCoord.y,
                left: popoverCoord.x - 110,
              }}
            />
          )}

          {/* Change news source popover */}
          {showSourcePopover && (
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
