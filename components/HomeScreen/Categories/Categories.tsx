import {View, FlatList, StyleSheet} from 'react-native';
import CategoryItem from './CategoryItem';
import {useEffect, useState, useRef} from 'react';
import {CATEGORIES} from '../../../constants/Categories';
import type {Catergory} from '../../../constants/Categories';

interface CategoriesProps {
  newsSource?: string;
  onChangeCategory: (category: Catergory) => void;
}

export default function Categories({
  onChangeCategory,
  newsSource,
}: CategoriesProps): React.JSX.Element {
  const flatlistRef = useRef<FlatList>(null);
  const [chosenCategoy, setChosenCategory] = useState<Catergory>(CATEGORIES[0]);

  function categoryPressedHandler(category: Catergory): void {
    setChosenCategory(category);
    onChangeCategory(category);
  }

  // Back to For You if news source change
  useEffect(() => {
    setChosenCategory(CATEGORIES[0]);
    onChangeCategory(CATEGORIES[0]);
    flatlistRef.current?.scrollToOffset({animated: true, offset: 0});
  }, [newsSource]);

  return (
    <View style={styles.listContainer}>
      <FlatList
        ref={flatlistRef}
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name}
        renderItem={itemData => (
          <CategoryItem
            onCatPress={() => categoryPressedHandler(itemData.item)}
            data={itemData.item}
            highlight={chosenCategoy.name === itemData.item.name}
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
