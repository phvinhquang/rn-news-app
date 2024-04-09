import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import Categories from '../components/HomeScreen/Categories/Categories';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Seens} from '../utils/database';
import {useState, useEffect} from 'react';
import {CATEGORIES} from '../constants/Categories';
import {useSelector} from 'react-redux';
import type {BookmarkInterface} from './Bookmarks';
import type {Catergory} from '../constants/Categories';
import {RootState} from '../store';

export default function SeenScreen(): React.JSX.Element {
  const [data, setData] = useState<BookmarkInterface[]>([]);
  const [chosenCategory, setChosenCategory] = useState<Catergory>(
    CATEGORIES[0],
  );
  const userEmail = useSelector<RootState>(state => state.authentication.email);

  // CHANGE CATEGORY HANDLER
  const changeCategoryHandler = function (category: Catergory) {
    setChosenCategory(category);

    // Filter data in database and setData again
    const result = Seens.data().filter(
      (item: BookmarkInterface) =>
        item.category === category.name && item.userEmail === userEmail,
    );
    result.reverse();

    setData(result);
  };

  const getData = async function () {
    const data = await Seens.data().filter(
      (item: BookmarkInterface) =>
        item.category === chosenCategory.name && item.userEmail === userEmail,
    );
    data.reverse();

    setData(data);
  };

  useEffect(() => {
    Seens.onLoaded(() => {
      getData();
    });
    Seens.onChange(() => {
      getData();
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Seen News</Text>
      </View>

      <Categories onChangeCategory={changeCategoryHandler} />

      {/* <Button title="Get DB" onPress={() => console.log(Seens.data())} /> */}
      {/* <Button title="Clear DB" onPress={() => Seens.removeAllRecords()} /> */}

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
