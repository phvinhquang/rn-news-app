import React from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  StyleSheet,
  useColorScheme,
  Pressable,
} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import {Colors} from '../../constants/Color';

type SignInIconProps = {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  onPress?(): void;
};

export default function SignInOptionIcon(
  props: SignInIconProps,
): React.JSX.Element {
  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  return (
    <View style={[styles.container, props.style]}>
      <Pressable
        style={({pressed}) => [pressed && styles.pressed]}
        onPress={props.onPress}>
        <Image
          style={[styles.image, {tintColor: activeColor.textPrimary}]}
          source={props.source}
        />
      </Pressable>
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
  pressed: {
    opacity: 0.5,
  },
});
