import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Icon from '../components/UI/Icon';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {StackScreenProps} from '@react-navigation/stack';

import LockIcon from '../assets/settings/lock.png';
import RightArrow from '../assets/settings/arrow_right.png';
import {NativeStackParamsList} from '../navigators/Stack';
import AccountHeader from '../components/Account/AccountHeader';
import {useTranslation} from 'react-i18next';
import {Colors} from '../constants/Color';

type SrceenProps = StackScreenProps<NativeStackParamsList>;

export default function AccountScreen({
  navigation,
}: SrceenProps): React.JSX.Element {
  const userEmail = useSelector<RootState>(
    state => state.authentication.email,
  ) as string;
  const {t} = useTranslation();

  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];
  const styles = customStyle(activeColor);

  return (
    <SafeAreaView style={styles.container}>
      <AccountHeader buttonDisable={true} />

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
          <Text style={styles.actionText}>{t('changePassword')}</Text>
        </View>

        <Icon source={RightArrow} style={{width: 22, height: 22}} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const customStyle = (activeColor: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: activeColor.primary,
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
      color: activeColor.textPrimary,
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
      color: activeColor.textPrimary,
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
      color: activeColor.textPrimary,
    },
  });
