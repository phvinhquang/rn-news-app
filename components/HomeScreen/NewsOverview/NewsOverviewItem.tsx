import {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
  Alert,
  Share,
} from 'react-native';
import ThreeDots from '../../../assets/menu.png';
import {Colors} from '../../../constants/Color';
import {Overview} from '../../../screens/Home';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NativeStackParamsList} from '../../../navigators/Stack';
import {BookmarkInterface} from '../../../screens/Bookmarks';
import PopoverMenu from '../../UI/PopoverMenu';
import ModalOverlay from '../../UI/ModalOverlay';
import {Bookmarks, Seens} from '../../../utils/database';
import {useTranslation} from 'react-i18next';
import BookmarkedIcon from '../../../assets/bottom-tab/bookmark.png';

// Time Ago
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import Icon from '../../UI/Icon';

interface NewsOverviewItemProp {
  news: Overview | BookmarkInterface;
  index: number;
  bookmarkScreen?: boolean;
}

type NavigationProps = StackNavigationProp<NativeStackParamsList, 'Main'>;

export default function NewsOverviewItem({
  news,
  bookmarkScreen,
}: NewsOverviewItemProp): React.JSX.Element {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [popoverCoord, setPopoverCoord] = useState({x: 0, y: 0});
  const [bookmarked, setBookmarked] = useState<boolean>(
    (news as Overview).bookmarked,
  );
  const userEmail = useSelector<RootState>(state => state.authentication.email);
  const {t} = useTranslation();

  const navigation = useNavigation<NavigationProps>();
  const openMenuRef = useRef<Image>(null);

  // Go to Detail Screen function
  const goToDetailHanlder = function () {
    navigation.push('Detail', {news: news as Overview});
  };

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  const time = timeAgo.format(new Date(news.pubDate).getTime(), 'mini');

  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  // Show popover handler
  const showPopoverHandler = function () {
    openMenuRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setPopoverCoord({x: pageX, y: pageY});
    });
    setShowPopover(true);
  };

  // Save item to bookmark database
  const bookmarkHandler = function () {
    try {
      const existingItem = Bookmarks.get({
        link: news?.link,
        userEmail: userEmail,
      });
      if (existingItem) {
        Alert.alert(`${t('alreadyBookmarked')}`, `${t('seeBookmarkScreen')}`);
        setShowPopover(false);
        return;
      }

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
      // Bookmarks.removeAllRecords();

      // Close popover menu
      setShowPopover(false);
    } catch (err) {}
  };

  // Remove bookmark handler
  const removeBookmarkHandler = async function () {
    await Bookmarks.remove({link: news?.link}, true);

    setShowPopover(false);
  };

  // Share handler
  const shareHandler = async function () {
    try {
      await Share.share({
        // message: 'Something',
        url: news.link,
      });

      setShowPopover(false);
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  // console.log((news as Overview).bookmarked);

  useEffect(() => {
    // console.log('item', (news as Overview).bookmarked);

    Bookmarks.onChange(async () => {
      const isBookmarked = await Bookmarks.get({link: news.link});
      if (isBookmarked) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    });
  }, []);

  return (
    <Pressable style={styles.item} onPress={goToDetailHanlder}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              news.thumbnail === 'none'
                ? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                : news.thumbnail,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.title, {color: activeColor.textPrimary}]}>
          {news.title}
        </Text>

        <View style={styles.authorContainer}>
          <Text style={[styles.author, styles.greyText]}>
            {t('by')} {news.author}
          </Text>
          {bookmarked && !bookmarkScreen && (
            <Icon source={BookmarkedIcon} style={{width: 18, height: 18}} />
          )}
        </View>
        <View style={styles.footer}>
          <View style={styles.footerInnerContainer}>
            <Text style={styles.category}>{t(news.category)}</Text>
            <Text style={[{fontSize: 8}, styles.greyText]}>{`\u25CF`}</Text>
            <Text style={styles.greyText}>
              {time} {t('ago')}
            </Text>
          </View>

          <Pressable
            // onPress={showModalHandler}
            onPress={showPopoverHandler}
            style={({pressed}) => [
              pressed && styles.pressed,
              pressed && {backgroundColor: '#ccc', borderRadius: 30},
            ]}>
            <Image
              ref={openMenuRef}
              style={[styles.threedots, {tintColor: activeColor.textPrimary}]}
              source={ThreeDots}
            />
          </Pressable>

          {showPopover && (
            <ModalOverlay
              onPress={() => {
                setShowPopover(false);
              }}>
              <PopoverMenu
                isBookmarked={bookmarked}
                bookmarkScreen={bookmarkScreen}
                onBookmark={bookmarkHandler}
                onRemoveBookmark={removeBookmarkHandler}
                onShare={shareHandler}
                style={{
                  position: 'absolute',
                  top: popoverCoord.y + 5,
                  left:
                    popoverCoord.x - (bookmarkScreen || bookmarked ? 160 : 110),
                  width: bookmarkScreen || bookmarked ? 190 : 140,
                }}
              />
            </ModalOverlay>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: '3%',
    // marginBottom: 20,
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 20,
    borderBottomColor: '#909090',
    borderBottomWidth: 1,
    zIndex: 1,
  },
  pressed: {
    opacity: 0.6,
  },
  imageContainer: {
    width: 160,
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  author: {
    fontWeight: '500',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  category: {
    fontWeight: 'bold',
    color: '#57b6ff',
  },
  greyText: {
    color: '#999',
  },

  threedotsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  threedots: {
    width: 25,
    height: 25,
    // marginRight: 15,
    // position: 'relative',
  },

  modal: {
    width: 140,
    height: 80,
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
});
