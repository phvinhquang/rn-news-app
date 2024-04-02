import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import store from './store';

import StackNavigator from './navigators/Stack';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

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
