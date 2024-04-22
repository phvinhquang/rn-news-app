import {useState} from 'react';
import {Image, Pressable, useColorScheme} from 'react-native';
import {Text, View, TextInput, StyleSheet} from 'react-native';

// Show/Hide password Icon
import showPasswordIcon from '../../assets/show_password/eye.png';
import hidePasswordIcon from '../../assets/show_password/eye_hide.png';
import {Colors} from '../../constants/Color';
import {useTranslation} from 'react-i18next';

interface InputProps {
  title: string;
  isPassword?: boolean;
  onGetValue: Function;
  onSetError: Function;
  onFocus?: Function;
  lengthValidation?: Function;
  error: string | boolean;
  showForgotPassword?: boolean;
}

function Input({
  title,
  isPassword,
  onGetValue,
  error,
  showForgotPassword,
  onSetError,
  lengthValidation,
  onFocus,
}: InputProps): React.JSX.Element {
  const [input, setInput] = useState<string>('');
  const [showLabel, setShowLabel] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {t} = useTranslation();

  // Input change handler
  function inputChangeHandler(inputText: string) {
    onSetError(false);
    onGetValue(inputText);
    setInput(inputText);
  }

  // Input focused handler
  function inputFocusHandler() {
    setShowLabel(true);
  }

  // Input blurred handler
  function inputBlurHandler() {
    if (lengthValidation?.(input)) {
      onSetError('Password must be at least 6 characters');
    }

    if (input.trim() === '') {
      onSetError('Password must not be empty');
    }

    setShowLabel(false);
  }

  function toggleShowPassword() {
    setShowPassword(prev => !prev);
  }

  // Style and theme
  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];
  // const showLabelStyle: Object = {
  //   color: '#909090',
  // };
  const errorMessage: Object = {
    marginTop: '3%',
    // Has error actually
    color: error ? '#BA1818' : 'transparent',

    // isSignIn ? '#BA1818' : 'transparent',
  };

  if (isPassword) {
    return (
      <View style={styles.passwordContainer}>
        <Text style={[styles.label, showLabel && styles.showLabel]}>
          {title}
        </Text>
        <View style={styles.passwordInnerContainer}>
          <TextInput
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            onChangeText={inputChangeHandler}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
            style={[styles.passwordInput, {color: activeColor.textPrimary}]}
            placeholder={title}
            value={input}
            placeholderTextColor="#909090"
          />

          <Pressable
            style={styles.showPasswordContainer}
            onPress={toggleShowPassword}>
            <Image
              style={styles.showPassword}
              source={showPassword ? showPasswordIcon : hidePasswordIcon}
            />
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={errorMessage}>
            {error ? error : t('incorrectPassword')}
          </Text>
          {showForgotPassword && (
            <Text style={styles.forgotPassword}>{t('forgotPassword')}</Text>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={[styles.label, showLabel && styles.showLabel]}>
          {title}
        </Text>
        <TextInput
          autoCapitalize="none"
          onChangeText={inputChangeHandler}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
          style={[styles.input, {color: activeColor.textPrimary}]}
          placeholder={title}
          value={input}
          placeholderTextColor="#909090"
        />
        <Text style={errorMessage}>{error ? error : 'Email error'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Style Text Input
  input: {
    width: '100%',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#909090',
    paddingBottom: '1%',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  label: {
    fontSize: 16,
    marginBottom: '2%',
    color: 'transparent',
  },
  showLabel: {
    color: '#909090',
  },

  // Style Password Input
  passwordContainer: {
    width: '100%',
  },
  passwordInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#909090',
    paddingBottom: 8,
  },
  passwordInput: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  showPasswordContainer: {
    width: 20,
    height: 20,
  },
  showPassword: {
    width: '100%',
    height: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: '3%',
  },
});

export default Input;
