import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AccountHeader from '../components/Account/AccountHeader';
import Input from '../components/UI/Input';
import {useEffect, useState} from 'react';
import {signOutAPI, updatePasswordAPI} from '../utils/api';
import {useDispatch} from 'react-redux';
import {authActions} from '../store/auth-slice';

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

  // const [currentPasswordIsTouched, setCurrentPasswordIsTouched] =
  //   useState<boolean>(false);
  // const [newPasswordIsTouched, setNewPasswordIsTouched] =
  //   useState<boolean>(false);
  // const [confirmPasswordIsTouched, setConfirmPasswordIsTouched] =
  //   useState<boolean>(false);

  const dispatch = useDispatch();

  // Change password request handler
  const changePasswordHandler = async function () {
    ////////
    try {
      await updatePasswordAPI(currentPassword, confirmNewPassword);

      await signOutAPI();
      dispatch(authActions.logout());
    } catch (err) {
      const error = err as Error;
      if (error.message === 'auth/wrong-password') {
        setCurrentPasswordError('Wrong Password');
      }
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
      setConfirmPasswordError(
        'New password and confirm new password must be the same',
      );
    } else {
      setConfirmPasswordError(false);
    }
  }, [newPassword, confirmNewPassword]);

  return (
    <SafeAreaView style={styles.container}>
      <AccountHeader
        onSubmit={changePasswordHandler}
        buttonDisable={btnDisabled as boolean}
      />

      <View style={styles.inputsContainer}>
        <Input
          isPassword={true}
          title="Current Password"
          error={currentPasswordError}
          showForgotPassword={false}
          onGetValue={setCurrentPassword}
          onSetError={setCurrentPasswordError}
        />

        <Input
          isPassword={true}
          title="New Password"
          error={newPasswordError}
          showForgotPassword={false}
          onGetValue={setNewPassword}
          onSetError={setNewPasswordError}
          lengthValidation={passwordLengthValidation}
        />

        <Input
          isPassword={true}
          title="Confirm New Password"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputsContainer: {
    marginTop: '15%',
    paddingHorizontal: '5%',
    gap: 10,
  },
});
