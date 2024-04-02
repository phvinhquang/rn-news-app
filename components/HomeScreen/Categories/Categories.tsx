import {View, ScrollView, FlatList, StyleSheet} from 'react-native';
import CategoryItem from './CategoryItem';
import {useState} from 'react';

const CATEGORIES = [
  'For You',
  'Top',
  'World',
  'Politics',
  'Entertainment',
  'Science',
];

export default function Categories(): React.JSX.Element {
  const [chosenCategoy, setChosenCategory] = useState<string>('For You');

  function categoryPressedHandler(category: string): void {
    setChosenCategory(category);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={itemData => (
          <CategoryItem
            onCatPress={categoryPressedHandler}
            title={itemData.item}
            highlight={chosenCategoy === itemData.item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
