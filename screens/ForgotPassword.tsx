import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  useColorScheme,
} from 'react-native';
import {Colors} from '../constants/Color';
import Icon from '../components/UI/Icon';
import Input from '../components/UI/Input';
import AuthHeader from '../components/Authentication/AuthHeader';
import BackIcon from '../assets/back.png';
import {useTranslation} from 'react-i18next';
import CustomButton from '../components/UI/CustomButton';
import {StackScreenProps} from '@react-navigation/stack';
import {NativeStackParamsList} from '../navigators/Stack';
import {useState} from 'react';
import {resetPasswordAPI} from '../utils/api';
import Toast from 'react-native-toast-message';

type ResetPasswordProps = StackScreenProps<NativeStackParamsList>;

export default function ForgotPassword({
  navigation,
}: ResetPasswordProps): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean | string>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const {t} = useTranslation();

  const emailChangeHandler = function (value: string) {
    setEmail(value);

    setBtnDisabled(false);
  };

  // Show toast function
  const showToastHandler = function () {
    Toast.show({
      type: 'success',
      text2: 'Email sent. Please check your email to reset your password',
    });
  };

  // Send reset password request
  const resetPasswordHandler = async function () {
    setIsLoading(true);

    try {
      await resetPasswordAPI(email);

      setBtnDisabled(true);

      // Show toast
      showToastHandler();
      // navigation.goBack()
    } catch (err) {
      if ((err as Error).message === 'auth/user-not-found') {
        setEmailError(t('emailNotFound'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const btnDisable = !email.trim().includes('@');

  const theme = useColorScheme() as keyof typeof Colors;
  const activeColor = Colors[theme];
  const styles = customStyle(activeColor);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={{paddingTop: '3%', marginLeft: '3%'}}>
          <Icon source={BackIcon} />
        </View>
      </Pressable>

      <AuthHeader />
      <View style={styles.inputContainer}>
        <Text style={{color: activeColor.textPrimary}}>
          {t('resetPasswordText')}
        </Text>
        <View style={{paddingVertical: '8%'}}>
          <Input
            title="Email"
            onGetValue={emailChangeHandler}
            onSetError={setEmailError}
            error={emailError}
          />
        </View>

        <CustomButton
          title="Reset"
          onPress={resetPasswordHandler}
          isLoading={isLoading}
          disabled={btnDisable || btnDisabled}
        />

        {btnDisabled && (
          <Text style={{textAlign: 'center', marginTop: 30}}>
            Didn't receive an email?{' '}
            <Text style={{fontWeight: '600'}} onPress={resetPasswordHandler}>
              Re-send
            </Text>
          </Text>
        )}

        {/* <Button title="Show Toast" onPress={showToastHandler} /> */}
      </View>
    </SafeAreaView>
  );
}

const customStyle = (activeColor: any) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: activeColor.primary,
    },
    inputContainer: {
      marginTop: '15%',
      paddingHorizontal: '10%',
    },
  });
