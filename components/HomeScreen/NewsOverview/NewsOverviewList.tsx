import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {useState, useCallback} from 'react';
import NewsOverviewItem from './NewsOverviewItem';
import type {Overview} from '../../../screens/Home';

interface OverviewListProps {
  data: Overview[];
  onRefresh: () => void;
}

const DUMMY_DATA = [
  {
    id: 'n1',
    title: 'Some long long title, just for show. Some more text',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    author: 'Quang',
    category: 'World',
    date: new Date('2024-03-05').toISOString(),
  },
  {
    id: 'n2',
    title: 'Some long long title, just for show',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    author: 'Quang',
    category: 'Entertaiment',
    date: new Date().toISOString(),
  },
  {
    id: 'n3',
    title: 'Some long long title, just for show',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    author: 'Quang',
    category: 'Entertaiment',
    date: new Date().toISOString(),
  },
  {
    id: 'n4',
    title: 'Some long long title, just for show',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    author: 'Quang',
    category: 'Entertaiment',
    date: new Date().toISOString(),
  },
  {
    id: 'n5',
    title: 'Some long long title, just for show',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    author: 'Quang',
    category: 'Entertaiment',
    date: new Date().toISOString(),
  },
  {
    id: 'n6',
    title: 'Some long long title, just for show',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    author: 'Quang',
    category: 'Entertaiment',
    date: new Date().toISOString(),
  },
  {
    id: 'n7',
    title: 'Some long long title, just for show',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    author: 'Quang',
    category: 'Entertaiment',
    date: new Date().toISOString(),
  },
];

export default function NewsOverviewList({
  data,
  onRefresh,
}: OverviewListProps): React.JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  // Pull to refresh handler
  const refreshHandler = useCallback(async function () {
    setRefreshing(true);
    try {
      await onRefresh();
    } catch (err) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.title}
        renderItem={itemData => <NewsOverviewItem news={itemData.item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // marginLeft: 10,
    flex: 1,
  },
});