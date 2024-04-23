import {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Logo from '../UI/Logo';
import NotificatonIcon from '../../assets/notification.png';

// Import Icons
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../constants/Color';

// IntrinsicAttributes & HomeHeaderProps;
interface HeaderProps {
  title: string;
  onShowNewsSource: (x: number, y: number) => void;
}

export default function HomeHeader({
  title,
  onShowNewsSource,
}: HeaderProps): React.JSX.Element {
  // const [showPopover, setShowPopover] = useState<boolean>(false);
  // const [title, setTitle] = useState<string>(NewsSource.VnExpress);
  const iconRef = useRef<Image>(null);
  const theme = useColorScheme() ?? 'light';

  const getPositionHandler = function () {
    iconRef.current?.measure((x, y, width, height, pageX, pageY) => {
      onShowNewsSource(pageX, pageY);
    });
  };

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
            {title}
          </Text>
        </View>

        <Pressable
          style={styles.notificationContainer}
          onPress={getPositionHandler}>
          <Image
            ref={iconRef}
            style={[
              styles.notification,
              theme === 'dark' && {tintColor: activeColor.textPrimary},
            ]}
            source={NotificatonIcon}
          />
        </Pressable>

        {/* <Popover
          isVisible={showPopover}
          backgroundStyle={{backgroundColor: 'transparent'}}
          onRequestClose={() => setShowPopover(false)}
          arrowSize={{width: 0, height: 0}}
          popoverStyle={{
            width: 120,
            height: 80,
            marginRight: 20,
            borderRadius: 10,
            // Box shadow Android
            elevation: 4,
            // Box shadow IOS
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowRadius: 6,
            shadowOpacity: 0.25,
            backgroundColor: '#fff',
          }}
          from={
            <Pressable
              style={styles.notificationContainer}
              onPress={() => setShowPopover(true)}>
              <Image
                style={[
                  styles.notification,
                  //  {tintColor: activeColor.textPrimary}
                ]}
                source={NotificatonIcon}
              />
            </Pressable>
          }>
        
        </Popover> */}
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

    position: 'relative',
  },
  notification: {
    height: '100%',
    width: '100%',
  },

  pressed: {
    opacity: 0.8,
  },
});
