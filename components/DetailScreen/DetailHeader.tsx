import {View, Text, StyleSheet, Pressable, Share, Alert} from 'react-native';
import BottomTabIcon from '../UI/Icon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Bookmarks} from '../../utils/database';
import {NativeStackParamsList} from '../../navigators/Stack';
import {Overview} from '../../screens/Home';
import {useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';

// Icon
import BackBtn from '../../assets/back.png';
import ShareBtn from '../../assets/share.png';
import BookmarkBtn from '../../assets/bookmark.png';
import FilledBookmarkBtn from '../../assets/bottom-tab/bookmark.png';
import {RootState} from '../../store';

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
    const existingItem = Bookmarks.get({
      link: news?.link,
      userEmail: userEmail,
    });

    if (existingItem) {
      setBookmarked(true);
    }
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
  const addBookmarkHandler = function () {
    // Save item to bookmark database
    Bookmarks.insert(
      {
        title: news?.title,
        link: news?.link,
        author: news?.author,
        category: news?.category,
        pubDate: news?.pubDate,
        thumbnail: news?.thumbnail,
        userEmail: userEmail,
      },
      true,
    );

    setBookmarked(true);
    // Bookmarks.removeAllRecords();
  };

  const removeBookmarkHandler = async function () {
    try {
      await Bookmarks.remove({link: news?.link, userEmail: userEmail}, true);

      setBookmarked(false);
    } catch (err) {
      Alert.alert('Something went wrong');
    }
  };

  // Share handler
  const shareHandler = async function () {
    try {
      await Share.share({
        // message: 'Something',
        url: news.link,
      });
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: '6%',
    backgroundColor: 'white',
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
