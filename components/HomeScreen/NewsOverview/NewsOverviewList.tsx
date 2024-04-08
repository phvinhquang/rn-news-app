import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useState, useCallback} from 'react';
import NewsOverviewItem from './NewsOverviewItem';
import type {Overview, PressedItem} from '../../../screens/Home';
import {Bookmark} from '../../../screens/Bookmarks';

interface OverviewListProps {
  data: (Overview | Bookmark)[];
  isLoading: boolean;
  onRefresh: () => void;
  onShowPopover: (x: number, y: number, item: PressedItem) => void;
  onBookmark?: () => void;
}

// const DUMMY_DATA = [
//   {
//     id: 'n1',
//     title: 'Some long long title, just for show. Some more text',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
//     author: 'Quang',
//     category: 'World',
//     date: new Date('2024-03-05').toISOString(),
//   },
//   {
//     id: 'n2',
//     title: 'Some long long title, just for show',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
//     author: 'Quang',
//     category: 'Entertaiment',
//     date: new Date().toISOString(),
//   },
//   {
//     id: 'n3',
//     title: 'Some long long title, just for show',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
//     author: 'Quang',
//     category: 'Entertaiment',
//     date: new Date().toISOString(),
//   },
//   {
//     id: 'n4',
//     title: 'Some long long title, just for show',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
//     author: 'Quang',
//     category: 'Entertaiment',
//     date: new Date().toISOString(),
//   },
//   {
//     id: 'n5',
//     title: 'Some long long title, just for show',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
//     author: 'Quang',
//     category: 'Entertaiment',
//     date: new Date().toISOString(),
//   },
//   {
//     id: 'n6',
//     title: 'Some long long title, just for show',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
//     author: 'Quang',
//     category: 'Entertaiment',
//     date: new Date().toISOString(),
//   },
//   {
//     id: 'n7',
//     title: 'Some long long title, just for show',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
//     author: 'Quang',
//     category: 'Entertaiment',
//     date: new Date().toISOString(),
//   },
// ];

export default function NewsOverviewList({
  data,
  isLoading,
  onRefresh,
  onShowPopover,

  onBookmark,
}: OverviewListProps): React.JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  // Pull to refresh handler
  const refreshHandler = async function () {
    setRefreshing(true);
    try {
      await onRefresh();
    } catch (err) {
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!isLoading && (
        <>
          <FlatList
            data={data}
            keyExtractor={item => item.link}
            renderItem={itemData => (
              <NewsOverviewItem
                news={itemData.item}
                index={itemData.index}
                onGetPosition={onShowPopover}
                onBookmark={onBookmark}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshHandler}
              />
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    // marginLeft: 10,
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
