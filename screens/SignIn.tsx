import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from '../constants/Color';
import AuthHeader from '../components/Authentication/AuthHeader';
import AuthForm from '../components/Authentication/AuthForm';
import SignInOptions from '../components/Authentication/SignInOptions';

function AuthenticationScreen(): React.JSX.Element {
  const theme = useColorScheme() ?? 'light';

  // Sytle and theme
  const activeColor = Colors[theme];
  const styles = customStyle(activeColor);

  // useEffect(() => {
  //   console.log('devie theme', Appearance.getColorScheme());
  // }, [Appearance]);

  return (
    // <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <AuthHeader />
        <AuthForm signIn={true} />
        <SignInOptions signIn={true} />
      </View>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
}

const customStyle = (activeColor: any) =>
  StyleSheet.create({
    root: {
      paddingTop: '10%',
      paddingBottom: '5%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: activeColor.primary,
    },
    container: {
      flex: 1,
      backgroundColor: activeColor.primary,
    },
  });

export default AuthenticationScreen;
