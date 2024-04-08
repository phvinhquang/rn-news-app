import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Button} from 'react-native';
import Categories from '../components/HomeScreen/Categories/Categories';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Bookmarks} from '../utils/database';
import {useState} from 'react';

export interface Bookmark {
  id: string;
  title: string;
  category: string;
  author: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  userEmail: string;
}

export default function BookmarksScreen(): React.JSX.Element {
  // Filter data based on current user

  const [data, setData] = useState<Bookmark[]>(Bookmarks.data());

  Bookmarks.onChange(() => {
    setData(Bookmarks.data());
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bookmarked</Text>
      </View>

      <Categories onChangeCategory={() => {}} bookmarksScreen={true} />

      {/* <Button title="Get DB" onPress={() => console.log(Bookmarks.data())} /> */}

      <NewsOverviewList
        data={data}
        onRefresh={() => {}}
        onShowPopover={() => {}}
        isLoading={false}
      />
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
