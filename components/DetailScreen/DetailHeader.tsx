import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  useColorScheme,
} from 'react-native';
import BottomTabIcon from '../UI/Icon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Bookmarks, News} from '../../utils/database';
import {NativeStackParamsList} from '../../navigators/Stack';
import {Overview} from '../../screens/Home';
import {useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';

// Icon
import BackBtn from '../../assets/back.png';
import ShareBtn from '../../assets/share.png';
import BookmarkBtn from '../../assets/bookmark.png';
import FilledBookmarkBtn from '../../assets/bottom-tab/bookmark.png';
import {RootState} from '../../store';
import {Colors} from '../../constants/Color';

type NavigationProps = NativeStackNavigationProp<
  NativeStackParamsList,
  'Detail'
>;

interface HeaderProps {
  news: Overview;
}

export default function DetailHeader({news}: HeaderProps) {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps>();
  const userEmail = useSelector<RootState>(state => state.authentication.email);

  useLayoutEffect(() => {
    // console.log('layout effect');

    const checkBookmark = async function () {
      const existingItem = await News.get({
        link: news?.link,
        userEmail: userEmail,
      });

      if (
        existingItem &&
        (existingItem.bookmarked === 1 || existingItem.bookmarked)
      ) {
        console.log('here');

        setBookmarked(true);
      }
    };

    checkBookmark();
  }, []);

  // Go back handler
  const goBackHandler = function () {
    navigation.goBack();
  };

  // Toggle bookmark handler
  const toggleBookmark = function () {
    if (bookmarked) {
      removeBookmarkHandler();
    } else {
      addBookmarkHandler();
    }
  };

  // Add Bookmark handler
  const addBookmarkHandler = async function () {
    // Check existing item in database
    const existingItem = await News.get({
      link: news?.link,
      userEmail: userEmail,
    });

    if (existingItem) {
      await News.update(existingItem.id, {bookmarked: true});
    } else {
      await News.insert(
        {
          title: news?.title,
          link: news?.link,
          author: news?.author,
          category: news?.category,
          pubDate: news?.pubDate,
          thumbnail: news?.thumbnail,
          userEmail: userEmail,
          viewedAt: 0,
          bookmarked: true,
        },
        true,
      );
    }

    setBookmarked(true);
    // Bookmarks.removeAllRecords();
  };

  const removeBookmarkHandler = async function () {
    try {
      // await Bookmarks.remove({link: news?.link, userEmail: userEmail}, true);

      const existingNews = News.get({link: news?.link});

      await News.update(existingNews.id, {bookmarked: false});

      setBookmarked(false);
    } catch (err) {
      Alert.alert('Something went wrong');
    }
  };

  // Share handler
  const shareHandler = async function () {
    try {
      await Share.open({
        // message: news.title,
        title: news.title,
        url: news.link,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];
  const styles = customStyle(activeColor);

  return (
    <View style={styles.headerContainer}>
      <Pressable style={{marginLeft: 8}} onPress={goBackHandler}>
        <BottomTabIcon source={BackBtn} style={styles.icon} />
      </Pressable>

      <View style={styles.innerContainer}>
        <Pressable onPress={toggleBookmark}>
          <BottomTabIcon
            source={bookmarked ? FilledBookmarkBtn : BookmarkBtn}
            style={styles.icon}
          />
        </Pressable>
        <Pressable onPress={shareHandler}>
          <BottomTabIcon source={ShareBtn} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
}

const customStyle = (activeColor: any) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      height: '6%',
      backgroundColor: activeColor.primary,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingBottom: '2%',
    },

    innerContainer: {
      marginRight: 15,
      flexDirection: 'row',
      gap: 20,
    },

    icon: {
      width: 30,
      height: 30,
    },
  });
