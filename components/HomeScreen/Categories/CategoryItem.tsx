import {Pressable, View, Text, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from '../../../constants/Color';

type CategoryItemProps = {
  title: string;
  onCatPress(category: string): void;
  highlight: boolean;
};

export default function CategoryItem({
  title,
  highlight,
  onCatPress,
}: CategoryItemProps): React.JSX.Element {
  function categoryPressedHandler(category: string): void {
    onCatPress(category);
  }

  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => categoryPressedHandler(title)}
        style={[
          styles.pressable,
          {backgroundColor: activeColor.secondary},
          highlight && {backgroundColor: activeColor.textPrimary},
        ]}>
        <Text
          style={[
            {color: activeColor.textPrimary, fontSize: 16},
            highlight && {color: activeColor.primary},
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  pressable: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 10,
    borderRadius: 30,
  },
  pressed: {
    opacity: 0.8,
  },
});
