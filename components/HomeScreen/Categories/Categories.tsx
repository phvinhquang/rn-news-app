import {View, FlatList, StyleSheet} from 'react-native';
import CategoryItem from './CategoryItem';
import {useEffect, useState} from 'react';
import {CATEGORIES} from '../../../constants/Categories';
import type {Catergory} from '../../../constants/Categories';

interface CategoriesProps {
  popoverIsShown: boolean;
  newsSourcePopoverIsShown: boolean;
  newsSource: string;
  onChangeCategory: (category: Catergory) => void;
  onHidePopover: () => void;
}

export default function Categories({
  onChangeCategory,
  onHidePopover,
  popoverIsShown,
  newsSourcePopoverIsShown,
  newsSource,
}: CategoriesProps): React.JSX.Element {
  const [chosenCategoy, setChosenCategory] = useState<Catergory>(CATEGORIES[0]);

  function categoryPressedHandler(category: Catergory): void {
    // Close popover if it's shown
    if (popoverIsShown || newsSourcePopoverIsShown) {
      onHidePopover();
      return;
    }

    // Otherwise choose category
    setChosenCategory(category);
    onChangeCategory(category);
  }

  // Back to For You if news source change
  useEffect(() => {
    setChosenCategory(CATEGORIES[0]);
    onChangeCategory(CATEGORIES[0]);
  }, [newsSource]);

  return (
    <View style={styles.listContainer}>
      <FlatList
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
