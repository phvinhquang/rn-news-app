import {View, Text, StyleSheet, Pressable, Share, Alert} from 'react-native';
import BottomTabIcon from '../UI/BottomTabIcon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Icon
import BackBtn from '../../assets/back.png';
import ShareBtn from '../../assets/share.png';
import BookmarkBtn from '../../assets/bookmark.png';
import {NativeStackParamsList} from '../../navigators/Stack';

type NavigationProps = NativeStackNavigationProp<
  NativeStackParamsList,
  'Detail'
>;

interface HeaderProps {
  url: string;
}

export default function DetailHeader({url}: HeaderProps) {
  const navigation = useNavigation<NavigationProps>();

  const goBackHandler = function () {
    navigation.goBack();
  };

  const shareHandler = async function () {
    try {
      const result = await Share.share({
        message: 'Something',
        url: url,
      });
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Pressable style={{marginLeft: 8}} onPress={goBackHandler}>
        <BottomTabIcon source={BackBtn} style={styles.icon} />
      </Pressable>

      <View style={styles.innerContainer}>
        <Pressable>
          <BottomTabIcon source={BookmarkBtn} style={styles.icon} />
        </Pressable>
        <Pressable onPress={shareHandler}>
          <BottomTabIcon source={ShareBtn} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: '6%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: '2%',
  },

  innerContainer: {
    marginRight: 15,
    flexDirection: 'row',
    gap: 20,
  },

  icon: {
    width: 30,
    height: 30,
  },
});
