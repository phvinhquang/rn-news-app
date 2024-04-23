import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Switch,
  Appearance,
  useColorScheme,
  Button,
} from 'react-native';
import {signOutAPI} from '../utils/api';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomTabsParamsList} from '../navigators/BottomTabs';
import {useLayoutEffect, useState} from 'react';

// Icon
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
import {StackNavigationProp} from '@react-navigation/stack';
import {NativeStackParamsList} from '../navigators/Stack';
import {themeActions} from '../store/theme-slice';
import {Colors} from '../constants/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProps = StackNavigationProp<NativeStackParamsList>;

export default function SettingsScreen(): React.JSX.Element {
  const [switchIsEnabled, setSwitchIsEnabled] = useState(false);
  const dispatch = useDispatch();
  // const theme = useSelector<RootState>(state => state.theme);
  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme as keyof typeof Colors];
  const navigation = useNavigation<NavigationProps>();
  const userEmail = useSelector<RootState>(
    state => state.authentication.email,
  ) as string;
  const {t} = useTranslation();

  const toggleSwitch = async () => {
    setSwitchIsEnabled(prev => !prev);
    // dispatch(themeActions.toggle());
    Appearance.setColorScheme(theme === 'light' ? 'dark' : 'light');

    // Save to storage
    await AsyncStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

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
  };

  useLayoutEffect(() => {
    if (theme === 'dark') {
      setSwitchIsEnabled(true);
    }
  }, []);

  const styles = customStyle(activeColor);

  return (
    <SafeAreaView
      style={{paddingTop: 20, flex: 1, backgroundColor: activeColor.primary}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('settings')}</Text>
      </View>

      {/* <Text style={{marginLeft: '5%', color: activeColor.textPrimary}}>
        {userEmail}
      </Text> */}

      <View style={styles.contentContainer}>
        {/* <View>
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
        </View> */}

        <View>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => console.log(navigation.push('Account'))}>
            <View style={styles.innerOptionContainer}>
              <Icon source={AccountIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('account')}</Text>
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
            onPress={() => navigation.push('CategoriesSetting')}>
            <View style={styles.innerOptionContainer}>
              <Icon source={InterestIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('interests')}</Text>
            </View>
            <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            />
          </TouchableOpacity>
          <View style={styles.bottomLine}></View>
        </View>

        {/* <View>
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
        </View> */}

        <View>
          <View style={styles.optionContainer}>
            <View style={styles.innerOptionContainer}>
              <Icon source={DarkModeIcon} style={{width: 20, height: 20}} />
              <Text style={styles.optionText}>{t('darkMode')}</Text>
            </View>
            {/* <Icon
              source={ArrowRight}
              style={{width: 22, height: 22, marginRight: 10}}
            /> */}
            <Switch
              style={{transform: [{scale: 0.8}], marginRight: 8}}
              trackColor={{false: '#909090', true: '#222'}}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#909090"
              onValueChange={toggleSwitch}
              value={switchIsEnabled}
            />
          </View>
          <View style={styles.bottomLine}></View>
        </View>

        {/* <View>
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
        </View> */}

        {/* <View>
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
        </View> */}

        <View>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => navigation.getParent()?.navigate('ChooseLanguage')}>
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

      {/* <Button
        title="get theme"
        onPress={async () => console.log(await AsyncStorage.getItem('theme'))}
      /> */}
    </SafeAreaView>
  );
}

const customStyle = (activeColor: any) =>
  StyleSheet.create({
    titleContainer: {
      paddingHorizontal: '3%',
      paddingTop: '5%',
      paddingBottom: '3%',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: activeColor.textPrimary,
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
      color: activeColor.textPrimary,
    },
    bottomLine: {
      height: 1,
      backgroundColor: '#ccc',
      width: '92%',
      alignSelf: 'flex-end',
    },
  });
