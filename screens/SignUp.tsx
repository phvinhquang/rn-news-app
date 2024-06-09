import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {useWindowDimensions, useColorScheme} from 'react-native';
import {Colors} from '../constants/Color';
import AuthHeader from '../components/Authentication/AuthHeader';
import AuthForm from '../components/Authentication/AuthForm';
import SignInOptions from '../components/Authentication/SignInOptions';
import {StackScreenProps} from '@react-navigation/stack';
import {NativeStackParamsList} from '../navigators/Stack';

type AuthenticationProps = StackScreenProps<NativeStackParamsList, 'SignUp'>;

function AuthenticationScreen({route}: AuthenticationProps): React.JSX.Element {
  // const {width, height} = useWindowDimensions();
  const theme = useColorScheme() ?? 'light';

  // Sytle and theme
  const activeColor = Colors[theme];

  const styles = customStyle(activeColor);

  return (
    // <KeyboardAvoidingView style={{flex: 1}} behavior="height">
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <AuthHeader />
        <AuthForm signIn={false} />
        <SignInOptions />
      </View>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
}

const customStyle = (activeColor: any) =>
  StyleSheet.create({
    root: {
      paddingTop: '4%',
      flex: 1,
      alignItems: 'center',
      backgroundColor: activeColor.primary,
    },
    container: {flex: 1, backgroundColor: activeColor.primary},
  });

export default AuthenticationScreen;
