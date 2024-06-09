import {Image, StyleSheet, View, useColorScheme} from 'react-native';
import logo from '../../assets/logo/newsLogo.png';
import {Colors} from '../../constants/Color';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export default function Logo(): React.JSX.Element {
  // const theme = useColorScheme() ?? 'light';
  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];

  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, {tintColor: activeColor.textPrimary}]}
        source={logo}
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
