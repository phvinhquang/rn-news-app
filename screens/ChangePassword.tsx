import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import AccountHeader from '../components/Account/AccountHeader';
import Input from '../components/UI/Input';
import {useEffect, useState} from 'react';
import {signOutAPI, updatePasswordAPI} from '../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../store/auth-slice';
import {useTranslation} from 'react-i18next';
import {Colors} from '../constants/Color';
import {RootState} from '../store';

export default function ChangePassword(): React.JSX.Element {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | boolean
  >(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<string | boolean>(
    false,
  );
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | boolean
  >(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {t} = useTranslation();

  const dispatch = useDispatch();

  // Change password request handler
  const changePasswordHandler = async function () {
    ////////
    setIsLoading(true);
    try {
      await updatePasswordAPI(currentPassword, confirmNewPassword);

      signOutAPI().then(() => dispatch(authActions.logout()));
      // dispatch(authActions.logout());
    } catch (err) {
      const error = err as Error;
      if (error.message === 'auth/wrong-password') {
        setCurrentPasswordError(t('incorrectPassword'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Length validation (at least 6 characters)
  const passwordLengthValidation = function (value: string) {
    return value.trim().length < 6;
  };

  // Save button disabled conditions
  const btnDisabled =
    currentPasswordError ||
    newPasswordError ||
    confirmPasswordError ||
    currentPassword.trim() === '' ||
    newPassword.trim().length < 6 ||
    confirmNewPassword.trim().length < 6;

  useEffect(() => {
    if (
      newPassword.trim().length >= 1 &&
      confirmNewPassword.trim().length >= 1 &&
      newPassword !== confirmNewPassword
    ) {
      setConfirmPasswordError(t('sameNewPassword'));
    } else {
      setConfirmPasswordError(false);
    }
  }, [newPassword, confirmNewPassword]);

  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];
  const styles = customStyle(activeColor);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <Modal transparent>
          <View
            style={{
              backgroundColor: '#999',
              flex: 1,
              opacity: 0.4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Modal>
      )}

      <AccountHeader
        onSubmit={changePasswordHandler}
        buttonDisable={btnDisabled as boolean}
      />

      <View style={styles.inputsContainer}>
        <Input
          isPassword={true}
          title={t('currentPassword')}
          error={currentPasswordError}
          showForgotPassword={false}
          onGetValue={setCurrentPassword}
          onSetError={setCurrentPasswordError}
        />

        <Input
          isPassword={true}
          title={t('newPassword')}
          error={newPasswordError}
          showForgotPassword={false}
          onGetValue={setNewPassword}
          onSetError={setNewPasswordError}
          lengthValidation={passwordLengthValidation}
        />

        <Input
          isPassword={true}
          title={t('confirmNewPassword')}
          error={confirmPasswordError}
          showForgotPassword={false}
          onGetValue={setConfirmNewPassword}
          onSetError={setConfirmPasswordError}
          lengthValidation={passwordLengthValidation}
        />
      </View>
    </SafeAreaView>
  );
}

const customStyle = (activeColor: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: activeColor.primary,
    },
    inputsContainer: {
      marginTop: '15%',
      paddingHorizontal: '5%',
      gap: 10,
    },
  });
