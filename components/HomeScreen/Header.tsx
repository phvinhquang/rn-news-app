import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Image,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import Logo from '../UI/Logo';
import NotificatonIcon from '../../assets/notification.png';

// Import Icons
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../constants/Color';

// IntrinsicAttributes & HomeHeaderProps;

export default function HomeHeader(): React.JSX.Element {
  const theme = useColorScheme() ?? 'light';

  const activeColor = Colors[theme];

  return (
    <SafeAreaView style={{backgroundColor: activeColor.primary}}>
      <View
        style={[
          styles.headerContainer,
          {backgroundColor: activeColor.primary},
        ]}>
        {/* DUMMY VIEW */}
        <View>
          <Feather
            name="bell"
            color="transparent"
            style={{fontSize: 24, marginRight: 10}}
          />
        </View>

        <View style={styles.titleContainer}>
          <Logo />
          <Text
            style={{
              color: activeColor.textPrimary,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            News 24
          </Text>
        </View>

        <View style={styles.notificationContainer}>
          <Image
            style={[styles.notification, {tintColor: activeColor.textPrimary}]}
            source={NotificatonIcon}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationContainer: {
    width: 20,
    height: 25,
    marginRight: 20,
  },
  notification: {
    height: '100%',
    width: '100%',
  },
});
