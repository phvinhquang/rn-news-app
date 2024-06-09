import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  useColorScheme,
} from 'react-native';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Bookmarks, News} from '../utils/database';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useTranslation} from 'react-i18next';
import {NewsSource} from './Home';
import {Colors} from '../constants/Color';

export interface BookmarkInterface {
  id: string;
  title: string;
  category: string;
  author: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  userEmail: string;
  viewedAt: number;
  bookmarked: boolean;
}

export default function BookmarksScreen(): React.JSX.Element {
  const [data, setData] = useState<BookmarkInterface[]>([]);
  const userEmail = useSelector<RootState>(state => state.authentication.email);
  const newsSource = useSelector<RootState>(state => state.newsSource);
  const {t} = useTranslation();

  const getData = async function () {
    const source =
      newsSource === NewsSource.VnExpress ? 'VnExpress' : 'Tuoi Tre';
    const data = await News.data().filter(
      (item: BookmarkInterface) =>
        item.userEmail === userEmail &&
        item.author === source &&
        item.bookmarked,
    );

    setData(data);
  };

  useEffect(() => {
    News.onLoaded(() => {
      getData();
    });

    News.onChange(() => {
      getData();
    });

    getData();
  }, [newsSource]);

  // Remove bookmark handler
  // const removeBookmarkHandler = async function (
  //   pressedItemData: BookmarkInterface,
  // ) {
  //   await Bookmarks.remove({link: pressedItemData?.link}, true);

  //   Bookmarks.onChange(() => {
  //     getData();
  //   });
  // };

  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];
  const styles = customStyle(activeColor);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('bookmarked')}</Text>
      </View>

      {/* <Categories onChangeCategory={changeCategoryHandler} /> */}
      {/* <Button
        title="Get DB"
        onPress={async () => console.log(await News.data())}
      /> */}
      {/* <Button title="Clear DB" onPress={() => News.removeAllRecords()} /> */}

      <NewsOverviewList
        bookmarkScreen={true}
        data={data}
        onRefresh={() => {}}
        isLoading={false}
      />
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
