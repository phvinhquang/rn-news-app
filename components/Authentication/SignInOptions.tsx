import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import SignInOptionIcon from '../UI/SignInOptionIcon';
import {Link} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Sign in Icons
import GoogleIcon from '../../assets/signin_logo/signIn_google.png';
import FacebookIcon from '../../assets/signin_logo/signIn_facebook.png';
import XIcon from '../../assets/signin_logo/signIn_X.png';
import AplleIcon from '../../assets/signin_logo/signIn_apple.png';
import EmailIcon from '../../assets/signin_logo/signIn_email.png';
import {Colors} from '../../constants/Color';
import {NativeStackParamsList} from '../../navigators/Stack';

interface SignInOptionsProps {
  signIn?: boolean;
}
type NavigationProps = StackNavigationProp<NativeStackParamsList, 'SignUp'>;

function SignInOptions({signIn}: SignInOptionsProps): React.JSX.Element {
  const {height} = useWindowDimensions();
  const theme = useColorScheme() ?? 'light';
  const navigation = useNavigation<NavigationProps>();

  const goToSignIn = function () {
    navigation.replace('SignIn');
  };

  const goToSignUp = function () {
    navigation.push('SignUp');
  };

  // Theme and style inline
  const optionsMarginVertical: Object = {
    marginVertical: height < 700 ? '5%' : '12%',
  };
  const activeColor = Colors[theme];

  return (
    <View>
      <View style={styles.header}>
        <View
          style={[
            styles.line,
            {backgroundColor: activeColor.textPrimary},
          ]}></View>
        <Text style={{color: activeColor.textPrimary}}>or sign in with</Text>
        <View
          style={[
            styles.line,
            {backgroundColor: activeColor.textPrimary},
          ]}></View>
      </View>

      <View style={[styles.optionsContainer, optionsMarginVertical]}>
        {!signIn && (
          <SignInOptionIcon
            source={EmailIcon}
            style={styles.icon}
            onPress={goToSignIn}
          />
        )}
        <SignInOptionIcon source={GoogleIcon} style={styles.icon} />
        <SignInOptionIcon source={FacebookIcon} style={styles.icon} />
        <SignInOptionIcon source={XIcon} style={styles.icon} />
        <SignInOptionIcon source={AplleIcon} style={styles.icon} />
      </View>

      {!signIn && (
        <View style={styles.acceptanceContainer}>
          <Text
            style={[styles.acceptanceText, {color: activeColor.textPrimary}]}>
            By signing up to News24 you are accepting our
            <Link to="/Main" style={styles.boldText}>
              {' '}
              Terms & Conditions
            </Link>
          </Text>
        </View>
      )}

      {/* Move this to signin screen */}
      {signIn && (
        <Text style={[styles.acceptanceText, {color: activeColor.textPrimary}]}>
          Don't have an account ?{' '}
          <Text style={styles.boldText} onPress={goToSignUp}>
            Register
          </Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '75%',
  },
  line: {
    height: 1,
    flex: 1,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '10%',
  },
  acceptanceContainer: {
    width: '75%',
  },
  acceptanceText: {
    textAlign: 'center',
  },
  icon: {width: 48, height: 45},
  boldText: {
    fontWeight: 'bold',
  },
});

export default SignInOptions;
