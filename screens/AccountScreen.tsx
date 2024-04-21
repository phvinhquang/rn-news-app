import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from '../components/UI/Icon';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {StackScreenProps} from '@react-navigation/stack';

import LockIcon from '../assets/settings/lock.png';
import RightArrow from '../assets/settings/arrow_right.png';
import {NativeStackParamsList} from '../navigators/Stack';
import AccountHeader from '../components/Account/AccountHeader';

type SrceenProps = StackScreenProps<NativeStackParamsList>;

export default function AccountScreen({
  navigation,
}: SrceenProps): React.JSX.Element {
  const userEmail = useSelector<RootState>(
    state => state.authentication.email,
  ) as string;

  return (
    <SafeAreaView style={styles.container}>
      <AccountHeader />

      <View style={styles.emailContainer}>
        <Text style={styles.emailTitle}>Email</Text>
        <View style={styles.emailInnerContainer}>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => navigation.push('ChangePassword')}>
        <View style={styles.actionInnerContainer}>
          <Icon source={LockIcon} style={{width: 20, height: 20}} />
          <Text style={styles.actionText}>Change Password</Text>
        </View>

        <Icon source={RightArrow} style={{width: 22, height: 22}} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  emailContainer: {
    paddingVertical: '8%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    gap: 15,
  },
  emailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  emailInnerContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  email: {
    paddingBottom: '3%',
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },

  actionContainer: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionText: {
    fontSize: 16,
  },
});
