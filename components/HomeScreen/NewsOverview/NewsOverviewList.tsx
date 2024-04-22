import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useState} from 'react';
import NewsOverviewItem from './NewsOverviewItem';
import type {Overview} from '../../../screens/Home';
import {BookmarkInterface} from '../../../screens/Bookmarks';

interface OverviewListProps {
  data: (Overview | BookmarkInterface)[];
  isLoading: boolean;
  bookmarkScreen?: boolean;
  onRefresh: () => void;
}

export default function NewsOverviewList({
  data,
  isLoading,
  bookmarkScreen,
  onRefresh,
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
      {!isLoading && data.length > 0 && (
        <>
          <FlatList
            data={data}
            keyExtractor={item => item.link}
            renderItem={itemData => (
              <NewsOverviewItem
                news={itemData.item}
                index={itemData.index}
                bookmarkScreen={bookmarkScreen}
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
    paddingBottom: 80,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
