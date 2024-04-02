import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import Logo from '../../assets/logo/newsLogo_large.png';
import {Colors} from '../../constants/Color';

function AuthHeader(): React.JSX.Element {
  const {height} = useWindowDimensions();
  const theme = useColorScheme() ?? 'light';

  // Theme and style
  const activeColor = Colors[theme];

  const logoStyle = {
    width: height < 700 ? 80 : 100,
    height: height < 700 ? 80 : 100,
  };

  const titleStyle: Object = {
    fontSize: height < 860 ? 18 : 22,
    fontWeight: '600',
  };

  const headerMarginBottm: Object = {
    marginTop: height < 700 ? '3%' : '5%',
  };

  return (
    <View style={[styles.container, headerMarginBottm]}>
      <Image
        style={[logoStyle, {tintColor: activeColor.textPrimary}]}
        source={Logo}
      />
      <Text style={[titleStyle, {color: activeColor.textPrimary}]}>
        News 24
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
});

export default AuthHeader;
