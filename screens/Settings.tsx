import {Button, Text, View} from 'react-native';
import {signOutAPI} from '../utils/api';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomTabsParamsList} from '../navigators/BottomTabs';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../store/auth-slice';
import {useEffect} from 'react';
import {RootState} from '../store';

type NavigationProps = BottomTabNavigationProp<
  BottomTabsParamsList,
  'SettingsScreen'
>;

export default function SettingsScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();

  const signOutHandler = function () {
    signOutAPI().then(() => {
      dispatch(authActions.logout());
    });
  };

  return (
    <View style={{paddingTop: '30%'}}>
      <Button title="Sign Out" onPress={signOutHandler} />
    </View>
  );
}
