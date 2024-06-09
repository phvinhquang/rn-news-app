import DetailHeader from '../components/DetailScreen/DetailHeader';
import {WebView} from 'react-native-webview';
import {SafeAreaView, useColorScheme} from 'react-native';
import {NativeStackParamsList} from '../navigators/Stack';
import {StackScreenProps} from '@react-navigation/stack';
import {useEffect} from 'react';
import {Seens, News} from '../utils/database';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {Colors} from '../constants/Color';

type Props = StackScreenProps<NativeStackParamsList, 'Detail'>;

export default function DetailScreen({route}: Props) {
  const userEmail = useSelector<RootState>(state => state.authentication.email);

  useEffect(() => {
    const news = route.params.news;

    const addToSeen = async function () {
      // Check if news in the db already, if true, return
      const existingNews = await News.get({
        link: news.link,
        userEmail: userEmail,
      });
      if (existingNews) {
        // Update viewedAt property of existing news
        await News.update(existingNews.id, {viewedAt: Date.now()});
        return;
      } else {
        // Insert news to db
        await News.insert({
          title: news?.title,
          link: news?.link,
          author: news?.author,
          category: news?.category,
          pubDate: news?.pubDate,
          thumbnail: news?.thumbnail,
          userEmail: userEmail,
          viewedAt: Date.now(),
          bookmarked: false,
        });
      }
    };

    addToSeen();
  }, []);

  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: activeColor.primary}}>
      <DetailHeader news={route.params.news} />
      <WebView
        style={{flex: 1}}
        source={{uri: route.params.news.link}}
        originWhitelist={['*']}
        allowsInlineMediaPlayback={true}
      />
    </SafeAreaView>
  );
}
