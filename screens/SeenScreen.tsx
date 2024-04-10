import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Seens} from '../utils/database';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import type {BookmarkInterface} from './Bookmarks';
import {RootState} from '../store';
import {useTranslation} from 'react-i18next';

interface SeenInterface extends BookmarkInterface {
  viewedAt: Object;
}

export default function SeenScreen(): React.JSX.Element {
  const [data, setData] = useState<SeenInterface[]>([]);
  const userEmail = useSelector<RootState>(state => state.authentication.email);
  const newsSource = useSelector<RootState>(state => state.newsSource);

  const {t} = useTranslation();

  const getData = async function () {
    const data = await Seens.data().filter(
      (item: SeenInterface) =>
        item.userEmail === userEmail && item.author === newsSource,
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('seenNews')}</Text>
      </View>

      {/* <Categories onChangeCategory={changeCategoryHandler} /> */}

      {/* <Button title="Get DB" onPress={() => console.log(Seens.data())} />
      <Button title="Clear DB" onPress={() => Seens.removeAllRecords()} /> */}

      <NewsOverviewList data={data} onRefresh={() => {}} isLoading={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  titleContainer: {
    paddingHorizontal: '3%',
    paddingTop: ' 2%',
    paddingBottom: '3%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
