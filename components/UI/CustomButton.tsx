import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import {Colors} from '../../constants/Color';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  isLoading: boolean;
}

function CustomButton({
  title,
  disabled,
  onPress,
  style,
  isLoading,
}: CustomButtonProps): React.JSX.Element {
  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  return (
    <View style={[styles.root, style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({pressed}) => [
          styles.button,
          {backgroundColor: activeColor.textPrimary},
          pressed && styles.pressed,
          disabled && {backgroundColor: activeColor.secondary},
        ]}>
        <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
          {isLoading && (
            <ActivityIndicator size="small" color={activeColor.secondary} />
          )}
          {!isLoading && (
            <Text style={[styles.title, {color: activeColor.primary}]}>
              {title}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  button: {
    width: 150,
    borderRadius: 50,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: '#eee',
  },

  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});

export default CustomButton;
