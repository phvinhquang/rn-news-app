import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Icon from '../UI/Icon';
import BackIcon from '../../assets/back.png';
import {NativeStackParamsList} from '../../navigators/Stack';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

type NavigationProps = StackNavigationProp<NativeStackParamsList>;

interface HeaderProps {
  onSubmit?: Function;
  buttonDisable?: boolean;
}

export default function AccountHeader({
  onSubmit,
  buttonDisable,
}: HeaderProps): React.JSX.Element {
  // const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon source={BackIcon} />
        </Pressable>
        <Text style={styles.screenTitle}>Account</Text>
      </View>

      <TouchableOpacity
        disabled={buttonDisable}
        onPress={(e: GestureResponderEvent) => onSubmit?.()}>
        <Text style={[styles.btnTitle, buttonDisable && styles.btnDisabled]}>
          SAVE
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  btnTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    letterSpacing: 1.1,
  },
  btnDisabled: {
    color: '#999',
  },
});
