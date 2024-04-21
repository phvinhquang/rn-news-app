import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AccountHeader from '../components/Account/AccountHeader';
import Input from '../components/UI/Input';

export default function ChangePassword(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <AccountHeader />

      <View style={styles.inputsContainer}>
        <Input
          isPassword={true}
          title="Current Password"
          error=""
          showForgotPassword={false}
          onGetValue={() => {}}
          onSetError={() => {}}
        />

        <Input
          isPassword={true}
          title="New Password"
          error=""
          showForgotPassword={false}
          onGetValue={() => {}}
          onSetError={() => {}}
        />

        <Input
          isPassword={true}
          title="Confirm New Password"
          error=""
          showForgotPassword={false}
          onGetValue={() => {}}
          onSetError={() => {}}
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
