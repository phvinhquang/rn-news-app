import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import store from './store';

import StackNavigator from './navigators/Stack';
import './utils/i18n/i18n';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
