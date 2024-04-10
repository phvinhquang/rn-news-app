import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabsNavigator from '../navigators/BottomTabs';
import SignUp from '../screens/SignUp';
import SignInScreen from '../screens/SignIn';
import {getFirebaseApp} from '../utils/firebaseConfig';
import {getAuth} from 'firebase/auth';
import {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {authActions} from '../store/auth-slice';
import {RootState} from '../store';
import DetailScreen from '../screens/Detail';
import {Overview} from '../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type NativeStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  Detail: {news: Overview};
};

const Stack = createNativeStackNavigator<NativeStackParamsList>();

export default function StackNavigator() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [uid, setUid] = useState<string>('');
  const isSignedIn = useSelector<RootState>(
    state => state.authentication.isSignedIn,
  );
  const dispatch = useDispatch();
  const {i18n} = useTranslation();

  const app = getFirebaseApp();
  const auth = getAuth(app);

  // Get language from storage
  const getLanguageFromStorage = async function () {
    try {
      const language = await AsyncStorage.getItem('language');
      if (language) i18n.changeLanguage(language);
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
      }
      setIsLoading(false);
    });

    getLanguageFromStorage();
  }, [auth]);

  // Show loading/splash screen while checking authentication
  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
        </>
      )}
    </Stack.Navigator>
  );
}
