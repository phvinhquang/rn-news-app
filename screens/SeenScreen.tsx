import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  useColorScheme,
} from 'react-native';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Bookmarks, Seens} from '../utils/database';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import type {BookmarkInterface} from './Bookmarks';
import {RootState} from '../store';
import {useTranslation} from 'react-i18next';
import {NewsSource} from './Home';
import {Colors} from '../constants/Color';

interface SeenInterface extends BookmarkInterface {
  viewedAt: Object;
}

export default function SeenScreen(): React.JSX.Element {
  const [data, setData] = useState<SeenInterface[]>([]);
  const userEmail = useSelector<RootState>(state => state.authentication.email);
  const newsSource = useSelector<RootState>(state => state.newsSource);

  const {t} = useTranslation();

  const getData = async function () {
    const source =
      newsSource === NewsSource.VnExpress ? 'VnExpress' : 'Tuoi Tre';

    const data = await Seens.data().filter(
      (item: SeenInterface) =>
        item.userEmail === userEmail && item.author === source,
    );

    // Sort data based on viewed-at time
    data.sort(
      (a: SeenInterface, b: SeenInterface) =>
        (b.viewedAt as any) - (a.viewedAt as any),
    );
    // data.reverse();

    setData(data);
  };

  useEffect(() => {
    Seens.onLoaded(() => {
      getData();
    });
    Seens.onChange(() => {
      getData();
    });
  }, [newsSource]);

  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];
  const styles = customStyle(activeColor);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('seenNews')}</Text>
      </View>

      {/* <Categories onChangeCategory={changeCategoryHandler} /> */}

      {/* <Button title="Get DB" onPress={() => console.log(Seens.data())} />*/}
      <Button title="Clear Seens" onPress={() => Seens.removeAllRecords()} />
      <Button
        title="Clear Bookmarks"
        onPress={() => Bookmarks.removeAllRecords()}
      />

      <NewsOverviewList data={data} onRefresh={() => {}} isLoading={false} />
    </SafeAreaView>
  );
}

const customStyle = (activeColor: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: activeColor.primary,
    },
    titleContainer: {
      paddingHorizontal: '3%',
      paddingTop: ' 2%',
      paddingBottom: '3%',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: activeColor.textPrimary,
    },
  });
