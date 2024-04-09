import {Button, Text, View} from 'react-native';
import {signOutAPI} from '../utils/api';
import {useTranslation} from 'react-i18next';
// import {useNavigation} from '@react-navigation/native';
// import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
// import {BottomTabsParamsList} from '../navigators/BottomTabs';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../store/auth-slice';
import {RootState} from '../store';

// type NavigationProps = BottomTabNavigationProp<
//   BottomTabsParamsList,
//   'SettingsScreen'
// >;

export default function SettingsScreen(): React.JSX.Element {
  const dispatch = useDispatch();
  const userEmail = useSelector<RootState>(
    state => state.authentication.email,
  ) as string;

  const signOutHandler = function () {
    signOutAPI().then(() => {
      dispatch(authActions.logout());
    });
  };

  const {t, i18n} = useTranslation();

  return (
    <View style={{paddingTop: '30%'}}>
      <Text style={{textAlign: 'center', fontSize: 20}}>{userEmail}</Text>
      <Text>{t('greet')}</Text>
      <Button
        title="Change Language"
        onPress={() => {
          i18n.changeLanguage('vn');
        }}
      />
      <Button title="Sign Out" onPress={signOutHandler} />
    </View>
  );
}
