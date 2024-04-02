import {
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
} from 'react-native';
import ThreeDots from '../../../assets/menu.png';

// Time Ago
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {Colors} from '../../../constants/Color';
import {Overview} from '../../../screens/Home';

interface NewsOverviewItemProp {
  news: Overview;
}

export default function NewsOverviewItem({
  news,
}: NewsOverviewItemProp): React.JSX.Element {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  const time = timeAgo.format(new Date(news.pubDate).getTime());

  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  return (
    <Pressable style={({pressed}) => [styles.item, pressed && styles.pressed]}>
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
        <Text style={[styles.author, styles.greyText]}>By VnExpress</Text>

        <View style={styles.footer}>
          <View style={styles.footerInnerContainer}>
            <Text style={styles.category}>{news.category}</Text>
            <Text style={[{fontSize: 8}, styles.greyText]}>{`\u25CF`}</Text>
            <Text style={styles.greyText}>{time}</Text>
          </View>

          <Image
            style={[styles.threedots, {tintColor: activeColor.textPrimary}]}
            source={ThreeDots}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: '3%',
    marginBottom: 20,
    flexDirection: 'row',
    gap: 15,
    paddingBottom: 30,
    borderBottomColor: '#909090',
    borderBottomWidth: 1,
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
  threedots: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
});
