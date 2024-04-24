import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  useColorScheme,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NativeStackParamsList} from '../../navigators/Stack';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import Icon from '../UI/Icon';
import BackIcon from '../../assets/back.png';
import {Colors} from '../../constants/Color';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

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
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];
  const styles = customStyle(activeColor);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon source={BackIcon} />
        </Pressable>
        <Text style={styles.screenTitle}>{t('account')}</Text>
      </View>

      <TouchableOpacity
        disabled={buttonDisable}
        onPress={(e: GestureResponderEvent) => onSubmit?.()}>
        <Text style={[styles.btnTitle, buttonDisable && styles.btnDisabled]}>
          {t('save')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const customStyle = (activeColor: any) =>
  StyleSheet.create({
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
      color: activeColor.textPrimary,
    },
    btnTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: activeColor.textPrimary,
      letterSpacing: 1.1,
    },
    btnDisabled: {
      color: '#999',
    },
  });
