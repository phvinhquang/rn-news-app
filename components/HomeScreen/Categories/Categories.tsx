import {View, FlatList, StyleSheet} from 'react-native';
import CategoryItem from './CategoryItem';
import {useEffect, useRef, useLayoutEffect} from 'react';
import type {CategoryInterface} from '../../../constants/Categories';
import {useSelector, useDispatch} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../../store';
import {categoriesActions} from '../../../store/categories-slice';

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
  const categories = useSelector<RootState>(
    selectChosenCategories,
  ) as CategoryInterface[];
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

  // Check if current chosen category is not shown
  // If true, back to 1st category available
  useEffect(() => {
    const isShown = categories.find(cat => cat.name === chosenCategory.name);
    if (!isShown) {
      dispatch(categoriesActions.changeCurrentCategory(categories[0]));
      onChangeCategory(newsSource, categories[0]);
      // setChosenCategory(categories[0]);
    }
  }, [categories]);

  // Scroll to top when news source changes
  useEffect(() => {
    flatlistRef.current?.scrollToOffset({animated: true, offset: 0});
  }, [newsSource]);

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
