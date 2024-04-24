import {Pressable, View, Text, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from '../../../constants/Color';
import type {Catergory} from '../../../constants/Categories';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

type CategoryItemProps = {
  data: Catergory;
  onCatPress(): void;
  highlight: boolean;
};

export default function CategoryItem({
  data,
  highlight,
  onCatPress,
}: CategoryItemProps): React.JSX.Element {
  // const theme = useColorScheme() ?? 'light';
  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onCatPress}
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
          {t(data.name)}
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
