import {useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
} from 'react-native';
import ThreeDots from '../../../assets/menu.png';
import {Colors} from '../../../constants/Color';
import {Overview, PressedItem} from '../../../screens/Home';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NativeStackParamsList} from '../../../navigators/Stack';

// Time Ago
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {Bookmark} from '../../../screens/Bookmarks';

interface NewsOverviewItemProp {
  news: Overview | Bookmark;
  index: number;
  onGetPosition: (pageX: number, pageY: number, item: PressedItem) => void;
  onBookmark?: () => void;
}

type NavigationProps = StackNavigationProp<NativeStackParamsList, 'Main'>;

export default function NewsOverviewItem({
  news,
  onGetPosition,
  index,
}: NewsOverviewItemProp): React.JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const openMenuRef = useRef<Image>(null);

  const getPositionHandler = function () {
    openMenuRef.current?.measure((x, y, width, height, pageX, pageY) => {
      onGetPosition(pageX, pageY, {...(news as Overview), index});
    });
  };

  // Go to Detail Screen function
  const goToDetailHanlder = function () {
    navigation.push('Detail', {link: news.link});
  };

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  const time = timeAgo.format(new Date(news.pubDate).getTime(), 'mini');

  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  return (
    <Pressable style={styles.item} onPress={goToDetailHanlder}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              news.thumbnail === 'none'
                ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg'
                : news.thumbnail,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.title, {color: activeColor.textPrimary}]}>
          {news.title}
        </Text>

        <Text style={[styles.author, styles.greyText]}>By {news.author}</Text>
        <View style={styles.footer}>
          <View style={styles.footerInnerContainer}>
            <Text style={styles.category}>{news.category}</Text>
            <Text style={[{fontSize: 8}, styles.greyText]}>{`\u25CF`}</Text>
            <Text style={styles.greyText}>{time} ago</Text>
          </View>

          <Pressable
            // onPress={showModalHandler}
            onPress={getPositionHandler}
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

          {/* {showModal && <PopoverMenu style={styles.modalPosition} />} */}
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

  modalPosition: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
});
