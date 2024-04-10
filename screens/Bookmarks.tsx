import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Bookmarks} from '../utils/database';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useTranslation} from 'react-i18next';

export interface BookmarkInterface {
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
  const [data, setData] = useState<BookmarkInterface[]>([]);
  const userEmail = useSelector<RootState>(state => state.authentication.email);
  const newsSource = useSelector<RootState>(state => state.newsSource);
  const {t} = useTranslation();

  const getData = async function () {
    const data = await Bookmarks.data().filter(
      (item: BookmarkInterface) =>
        item.userEmail === userEmail && item.author === newsSource,
    );

    setData(data);
  };

  useEffect(() => {
    Bookmarks.onLoaded(() => {
      getData();
    });

    Bookmarks.onChange(() => {
      getData();
    });

    getData();
  }, [newsSource]);

  // CHANGE CATEGORY HANDLER
  // const changeCategoryHandler = function (category: Catergory) {
  //   setChosenCategory(category);

  //   // Filter data in database and setData again
  //   const result = Bookmarks.data().filter(
  //     (item: BookmarkInterface) =>
  //       item.category === category.name && item.userEmail === userEmail,
  //   );

  //   setData(result);
  // };

  // Remove bookmark handler
  const removeBookmarkHandler = async function (
    pressedItemData: BookmarkInterface,
  ) {
    await Bookmarks.remove({link: pressedItemData?.link}, true);

    Bookmarks.onChange(() => {
      getData();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('bookmarked')}</Text>
      </View>

      {/* <Categories onChangeCategory={changeCategoryHandler} /> */}
      {/* <Button title="Get DB" onPress={() => console.log(Bookmarks.data())} /> */}

      <NewsOverviewList
        bookmarkScreen={true}
        data={data}
        onRefresh={() => {}}
        // onShowPopover={showPopoverHandler}
        onRemoveBookmark={removeBookmarkHandler}
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
