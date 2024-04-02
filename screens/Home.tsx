import {View, StyleSheet, useColorScheme, Alert} from 'react-native';
import Categories from '../components/HomeScreen/Categories/Categories';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Colors} from '../constants/Color';
import {useCallback, useEffect, useState} from 'react';
import {fetchAndParseRss} from '../utils/rssHandler';

export interface Overview {
  title: string;
  category: string;
  link: string;
  pubDate: string;
  thumbnail: string;
}

export default function HomeScreen(): React.JSX.Element {
  const [overviews, setOverviews] = useState<Overview[]>([]);

  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  // Fetch news function
  const fetchData = useCallback(async function () {
    try {
      const res = await fetchAndParseRss();
      setOverviews(res);
    } catch (err) {
      Alert.alert('Something went wrong', 'Could not fetch news');
    }
  }, []);

  // Fetch news on initial load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: activeColor.primary}]}>
      {/* Categories */}
      <Categories />
      {/* Articles list */}
      <NewsOverviewList data={overviews} onRefresh={fetchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
