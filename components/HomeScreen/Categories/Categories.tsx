import {View, FlatList, StyleSheet} from 'react-native';
import CategoryItem from './CategoryItem';
import {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {
  CATEGORIES,
  TT_CATEGORIES,
  VE_CATEGORIES,
} from '../../../constants/Categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {CategoryInterface, Catergory} from '../../../constants/Categories';
import {useSelector, useDispatch} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../../store';
import {categoriesActions} from '../../../store/categories-slice';
import {NewsSource} from '../../../screens/Home';

interface CategoriesProps {
  newsSource: string;
  onChangeCategory: (source: string, category: CategoryInterface) => void;
}

const selectChosenCategories = createSelector(
  (state: RootState) => state.categories,
  categories => categories.categories.filter(cat => cat.chosen),
);

export default function Categories({
  newsSource,
  onChangeCategory,
}: CategoriesProps): React.JSX.Element {
  const flatlistRef = useRef<FlatList>(null);
  // const [categories, setCategories] = useState<Catergory[]>(CATEGORIES);
  const categories = useSelector<RootState>(
    selectChosenCategories,
  ) as Catergory[];
  // const [chosenCategory, setChosenCategory] = useState<Catergory>(
  //   categories[0],
  // );
  const chosenCategory = useSelector<RootState>(
    state => state.categories.currentCategory,
  ) as CategoryInterface;
  const userEmail = useSelector<RootState>(state => state.authentication.email);
  const dispatch = useDispatch();

  // Category press handler
  function categoryPressedHandler(category: CategoryInterface): void {
    // setChosenCategory(category);
    dispatch(categoriesActions.changeCurrentCategory(category));
    onChangeCategory(newsSource, category);
  }

  // Check if current chosen category is not chosen
  // If true, back to 1st category available
  useEffect(() => {
    const isShown = categories.find(cat => cat.name === chosenCategory.name);
    if (!isShown) {
      dispatch(categoriesActions.setDefaultCurrentCategory());
      // setChosenCategory(categories[0]);
      // onChangeCategory(chosenCategory);
    }
  }, [categories]);

  // Back to list's top if news source change
  useEffect(() => {
    // setChosenCategory(categories[0]);
    // onChangeCategory(chosenCategory);

    dispatch(
      categoriesActions.update(
        newsSource === NewsSource.VnExpress ? VE_CATEGORIES : TT_CATEGORIES,
      ),
    );
    dispatch(categoriesActions.setDefaultCurrentCategory());
    onChangeCategory(
      newsSource,
      newsSource === NewsSource.VnExpress ? VE_CATEGORIES[0] : TT_CATEGORIES[0],
    );

    flatlistRef.current?.scrollToOffset({animated: true, offset: 0});
  }, [newsSource]);

  // Get category order from storage
  useEffect(() => {
    const getDataFromStorage = async function () {
      try {
        const data = await AsyncStorage.getItem(`${userEmail}-categories`);
        if (data) {
          const result = JSON.parse(data);

          // Filter out not-chosen category
          // const filteredResult = result.filter(
          //   (item: Catergory) => item.chosen,
          // );

          // dispatch(categoriesActions.update(result));

          // setCategories(filteredResult);
          // setChosenCategory(categories[0]);
          // onChangeCategory(chosenCategory);
        }
      } catch (err) {
        console.log(err);
      }
    };

    // Get data if is focused
    getDataFromStorage();
  }, []);

  return (
    <View style={styles.listContainer}>
      <FlatList
        ref={flatlistRef}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name}
        renderItem={itemData => (
          <CategoryItem
            onCatPress={() => categoryPressedHandler(itemData.item)}
            data={itemData.item}
            highlight={
              chosenCategory && chosenCategory.name === itemData.item.name
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 20,
  },
});
