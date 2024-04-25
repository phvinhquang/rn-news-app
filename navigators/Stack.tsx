import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabsNavigator from '../navigators/BottomTabs';

import {getFirebaseApp} from '../utils/firebaseConfig';
import {getAuth} from 'firebase/auth';
import {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  ActivityIndicator,
  Appearance,
  ColorSchemeName,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import CategoriesSetting from '../screens/CategoriesSetting';
import ChooseLanguage from '../screens/ChooseLanguage';
import AccountScreen from '../screens/AccountScreen';
import ChangePassword from '../screens/ChangePassword';
import SignUp from '../screens/SignUp';
import SignInScreen from '../screens/SignIn';
import {useColorScheme} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {authActions} from '../store/auth-slice';
import {RootState} from '../store';
import DetailScreen from '../screens/Detail';
import {Overview} from '../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../constants/Color';
import ForgotPassword from '../screens/ForgotPassword';
import {Bookmarks, News, Users} from '../utils/database';

export type NativeStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  Detail: {news: Overview};
  ChooseLanguage: undefined;
  CategoriesSetting: undefined;
  Account: undefined;
  ChangePassword: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<NativeStackParamsList>();

export default function StackNavigator() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [uid, setUid] = useState<string>('');
  const isSignedIn = useSelector<RootState>(
    state => state.authentication.isSignedIn,
  );
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const {i18n} = useTranslation();

  const app = getFirebaseApp();
  const auth = getAuth(app);

  // Get language from storage
  const getLanguageFromDb = async function (email: string) {
    try {
      const user = await Users.get({email: email});
      if (user) i18n.changeLanguage(user.language);
    } catch (err) {
      console.log(err);
    }
  };

  // Check authentication status and dispatch login action
  useEffect(() => {
    auth.onAuthStateChanged(data => {
      if (data) {
        data.getIdToken().then(token => {
          dispatch(authActions.login({token: token, email: data.email}));
        });

        getLanguageFromDb(data.email!);
      }

      setIsLoading(false);
    });

    News.onChange(() => {
      console.log('on changeee');
    });

    // getLanguageFromStorage();
  }, [auth]);

  // useLayoutEffect(() => {
  //   const getThemeFromStorage = async function () {
  //     try {
  //       const themeFromStorage = await AsyncStorage.getItem('theme');
  //       if (themeFromStorage) {
  //         Appearance.setColorScheme(themeFromStorage as ColorSchemeName);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   // getThemeFromStorage();
  // }, []);

  const activeColor = Colors[theme as keyof typeof Colors];

  // Show loading/splash screen while checking authentication
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: activeColor.primary,
        }}>
        <ActivityIndicator size="large" color="#909090" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={BottomTabsNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CategoriesSetting"
            component={CategoriesSetting}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChooseLanguage"
            component={ChooseLanguage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Account"
            component={AccountScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
