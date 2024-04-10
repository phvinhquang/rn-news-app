import DetailHeader from '../components/DetailScreen/DetailHeader';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native';
import {NativeStackParamsList} from '../navigators/Stack';
import {StackScreenProps} from '@react-navigation/stack';
import {useEffect} from 'react';
import {Seens} from '../utils/database';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

type Props = StackScreenProps<NativeStackParamsList, 'Detail'>;

export default function DetailScreen({route}: Props) {
  const userEmail = useSelector<RootState>(state => state.authentication.email);

  useEffect(() => {
    const news = route.params.news;

    const addToSeen = async function () {
      // Check if news in the db already, if true, return
      const existingNews = await Seens.get({
        link: news.link,
        userEmail: userEmail,
      });
      if (existingNews) return;

      // Insert news to db
      await Seens.insert({
        title: news?.title,
        link: news?.link,
        author: news?.author,
        category: news?.category,
        pubDate: news?.pubDate,
        thumbnail: news?.thumbnail,
        userEmail: userEmail,
      });
    };

    addToSeen();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <DetailHeader news={route.params.news} />
      <WebView
        style={{flex: 1}}
        source={{uri: route.params.news.link}}
        allowsInlineMediaPlayback={true}
      />
    </SafeAreaView>
  );
}
