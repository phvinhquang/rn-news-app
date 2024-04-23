import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast, {BaseToast} from 'react-native-toast-message';

import {Provider} from 'react-redux';
import store from './store';

import StackNavigator from './navigators/Stack';
import './utils/i18n/i18n';
import {useColorScheme} from 'react-native';
import {Colors} from './constants/Color';

function App(): React.JSX.Element {
  const theme = useColorScheme() as keyof typeof Colors;
  const activeColor = Colors[theme];

  const toastCongig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftWidth: 'none',
          borderRadius: 50,
          backgroundColor: activeColor.textPrimary,
          position: 100,
          height: 60,
        }}
        text1Style={{display: 'none'}}
        text2Style={{
          fontSize: 16,
          color: activeColor.primary,
          textAlign: 'center',
        }}
        text2NumberOfLines={2}
      />
    ),
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <StackNavigator />
          <Toast config={toastCongig} position="bottom" visibilityTime={2000} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
