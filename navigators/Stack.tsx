import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabsNavigator from '../navigators/BottomTabs';
import SignUp from '../screens/SignUp';
import SignInScreen from '../screens/SignIn';
import {getFirebaseApp} from '../utils/firebaseConfig';
import {getAuth} from 'firebase/auth';
import {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {authActions} from '../store/auth-slice';
import {RootState} from '../store';
import DetailScreen from '../screens/Detail';
import {Overview} from '../screens/Home';

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

  const app = getFirebaseApp();
  const auth = getAuth(app);

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
