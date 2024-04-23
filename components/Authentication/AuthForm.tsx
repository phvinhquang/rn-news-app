import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Alert,
  useColorScheme,
} from 'react-native';
import Input from '../UI/Input';
import CustomButton from '../UI/CustomButton';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NativeStackParamsList} from '../../navigators/Stack';
import {signInAPI, signUpAPI} from '../../utils/api';
import {useDispatch} from 'react-redux';
import {authActions} from '../../store/auth-slice';
import {useTranslation} from 'react-i18next';

interface AuthFormProps {
  signIn?: boolean;
}
type StackNavigatorProp = StackNavigationProp<NativeStackParamsList, 'SignUp'>;

function AuthForm({signIn}: AuthFormProps): React.JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [showUsernameInput, setShowUsernameInput] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | boolean>(false);
  const [passwordError, setPasswordError] = useState<string | boolean>(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {height} = useWindowDimensions();

  // Simple validation
  const inputsNotEmpty = username && email && password;

  // Sign up event handler
  async function submitHandler() {
    setIsLoading(true);
    try {
      if (signIn) {
        // Send HTTP request to login
        const result = await signInAPI(username, email, password);

        // Save token if there is one
        if (result?.token) {
          // Use redux
          dispatch(authActions.login({token: result.token, email: email}));
        }
      } else {
        // Send HTTP request to signup
        await signUpAPI(username, email, password);
      }
    } catch (e: any) {
      if (e.message === 'auth/email-already-in-use')
        setEmailError(t('emailAlreadyUsed'));
      if (e.message === 'auth/user-not-found') {
        setEmailError(t('emailNotFound'));
        setShowUsernameInput(false);
      }
      if (e.message === 'auth/wrong-password') {
        setPasswordError(t('incorrectPassword'));
        setShowUsernameInput(false);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Style inline
  const buttonVerticalMarigin: Object = {
    marginVertical: height < 860 ? '15%' : '20%',
  };

  return (
    <View style={styles.root}>
      <View>
        {showUsernameInput && (
          <View>
            <Input
              title={t('username')}
              onGetValue={setUsername}
              error={false}
              onSetError={() => {}}
            />
          </View>
        )}
        <View>
          <Input
            title="Email"
            onGetValue={setEmail}
            error={emailError}
            onSetError={setEmailError}
          />
        </View>
        <View>
          <Input
            title={t('password')}
            isPassword={true}
            onGetValue={setPassword}
            error={passwordError}
            onSetError={setPasswordError}
            showForgotPassword={signIn}
          />
        </View>
      </View>

      <CustomButton
        style={buttonVerticalMarigin}
        title={signIn ? t('signIn') : t('signUp')}
        isLoading={isLoading}
        disabled={!inputsNotEmpty}
        onPress={submitHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: '10%',
    width: '75%',
  },
});

export default AuthForm;
