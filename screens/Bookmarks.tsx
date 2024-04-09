import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import Categories from '../components/HomeScreen/Categories/Categories';
import NewsOverviewList from '../components/HomeScreen/NewsOverview/NewsOverviewList';
import {Bookmarks} from '../utils/database';
import {useState} from 'react';
import {CATEGORIES, Catergory} from '../constants/Categories';

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
  // Filter data based on current user

  const [data, setData] = useState<BookmarkInterface[]>([]);
  const [chosenCategory, setChosenCategory] = useState<Catergory>(
    CATEGORIES[0],
  );

  const getData = async function () {
    const data = await Bookmarks.data().filter(
      (item: BookmarkInterface) => item.category === chosenCategory.name,
    );

    setData(data);
  };

  useEffect(() => {
    // const data = Bookmarks.data().filter(
    //   (item: BookmarkInterface) => item.category === chosenCategory.name,
    // );

    // Bookmarks.onAvailable(() => {
    //   setData(data);
    // });
    // Bookmarks.onLoaded(() => {
    //   setData(data);
    // });
    Bookmarks.onChange(() => {
      getData();
    });
  }, []);

  // CHANGE CATEGORY HANDLER
  const changeCategoryHandler = function (category: Catergory) {
    setChosenCategory(category);

    // Filter data in database and setData again
    const result = Bookmarks.data().filter(
      (item: BookmarkInterface) => item.category === category.name,
    );

    setData(result);
  };

  // Remove bookmark handler
  const removeBookmarkHandler = async function (
    pressedItemData: BookmarkInterface,
  ) {
    await Bookmarks.remove({link: pressedItemData?.link}, true);

    Bookmarks.onChange(() => {
      setData(prev =>
        prev.filter(
          (item: BookmarkInterface) => item.link !== pressedItemData?.link,
        ),
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bookmarked</Text>
      </View>

      <Categories onChangeCategory={changeCategoryHandler} />

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
