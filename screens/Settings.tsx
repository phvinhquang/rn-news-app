import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {signInAPI, signOutAPI} from '../utils/api';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {useNavigation} from '@react-navigation/native';
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
// import {BottomTabsParamsList} from '../navigators/BottomTabs';

// Icon
import {ImageSourcePropType} from 'react-native';
import ProfileIcon from '../assets/settings/profile.png';
import AccountIcon from '../assets/settings/account.png';
import InterestIcon from '../assets/settings/interests.png';
import NotificationIcon from '../assets/settings/notifications.png';
import DarkModeIcon from '../assets/settings/darkmode.png';
import QuestionMarkIcon from '../assets/settings/questionmark.png';
import LogOutIcon from '../assets/settings/logout.png';
import LanguageIcon from '../assets/settings/change_language.png';
import ArrowRight from '../assets/settings/arrow_right.png';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../store/auth-slice';
import {RootState} from '../store';
import Icon from '../components/UI/Icon';
import {TouchableOpacity} from 'react-native';

// type NavigationProps = BottomTabNavigationProp<
//   BottomTabsParamsList,
//   'SettingsScreen'
// >;

export default function SettingsScreen(): React.JSX.Element {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const userEmail = useSelector<RootState>(
    state => state.authentication.email,
  ) as string;

  // Log out handler
  const signOutHandler = function () {
    Alert.alert(`${t('loggingOut')}`, `${t('areYouSure')}`, [
      {
        text: `${t('logOut')}`,
        onPress: () => {
          signOutAPI().then(() => {
            dispatch(authActions.logout());
          });
        },
      },
      {
        text: `${t('cancel')}`,
        style: 'destructive',
      },
    ]);

    // signOutAPI().then(() => {
    //   dispatch(authActions.logout());
    // });
  };

  // Save data to storage handler
  const saveToStorage = async function () {
    try {
      await AsyncStorage.setItem('language', i18n.language);
    } catch (err) {
      Alert.alert((err as any).message);
    }
  };

  // Change language handler
  const changeLanguageHandler = function () {
    if (i18n.language === 'en') i18n.changeLanguage('vn');
    else i18n.changeLanguage('en');

    saveToStorage();
  };

  return (
    <SafeAreaView style={{paddingTop: 20, flex: 1, backgroundColor: 'white'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('settings')}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View>
          <View style={styles.optionContainer}>
            <View style={styles.innerOptionContainer}>
              <Icon source={ProfileIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('profile')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </View>
          <View style={styles.bottomLine}></View>
        </View>

        <View>
          <View style={styles.optionContainer}>
            <View style={styles.innerOptionContainer}>
              <Icon source={AccountIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('account')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </View>
          <View style={styles.bottomLine}></View>
        </View>

        <View>
          <View style={styles.optionContainer}>
            <View style={styles.innerOptionContainer}>
              <Icon source={InterestIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('interests')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </View>
          <View style={styles.bottomLine}></View>
        </View>

        <View>
          <View style={styles.optionContainer}>
            <View style={styles.innerOptionContainer}>
              <Icon source={NotificationIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('notifications')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </View>
          <View style={styles.bottomLine}></View>
        </View>

        <View>
          <View style={styles.optionContainer}>
            <View style={styles.innerOptionContainer}>
              <Icon source={DarkModeIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('darkMode')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </View>
          <View style={styles.bottomLine}></View>
        </View>

        <View>
          <View style={styles.optionContainer}>
            <View style={styles.innerOptionContainer}>
              <Icon source={QuestionMarkIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('terms')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </View>
          <View style={styles.bottomLine}></View>
        </View>

        <View>
          <View style={styles.optionContainer}>
            <View style={styles.innerOptionContainer}>
              <Icon source={AccountIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('about')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </View>
          <View style={styles.bottomLine}></View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={changeLanguageHandler}>
            <View style={styles.innerOptionContainer}>
              <Icon source={LanguageIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('changeLanguage')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </TouchableOpacity>
          <View style={styles.bottomLine}></View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={signOutHandler}>
            <View style={styles.innerOptionContainer}>
              <Icon source={LogOutIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('logOut')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </TouchableOpacity>
          <View style={styles.bottomLine}></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: '3%',
    paddingTop: '5%',
    paddingBottom: '3%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  contentContainer: {
    paddingLeft: '5%',
  },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    paddingVertical: '5%',
  },
  innerOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionTextContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  optionText: {
    fontSize: 17,
    fontWeight: '500',
  },
  bottomLine: {
    height: 1,
    backgroundColor: '#ccc',
    width: '92%',
    alignSelf: 'flex-end',
  },
});
