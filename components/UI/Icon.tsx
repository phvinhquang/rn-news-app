import React from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../constants/Color';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

type IconProps = {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
};

export default function Icon(props: IconProps): React.JSX.Element {
  // const theme = useColorScheme() ?? 'light';
  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];

  return (
    <View style={[styles.container, props.style]}>
      <Image
        style={[styles.image, {tintColor: activeColor.textPrimary}]}
        source={props.source}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
