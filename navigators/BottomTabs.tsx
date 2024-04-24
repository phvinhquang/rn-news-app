import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator, View, useColorScheme} from 'react-native';
import {Colors} from '../constants/Color';

// Import bottom tab source
import HomeIconActive from '../assets/bottom-tab/home.png';
import HomeIcon from '../assets/bottom-tab/home_unselected.png';
import SearchIconActice from '../assets/bottom-tab/search.png';
import SearchIcon from '../assets/bottom-tab/search_unselected.png';
import BookmarksIconActive from '../assets/bottom-tab/bookmark.png';
import BookmarksIcon from '../assets/bottom-tab/bookmark_unselected.png';
import SettingIconActive from '../assets/bottom-tab/settings.png';
import SettingIcon from '../assets/bottom-tab/settings_unselected.png';
import Icon from '../components/UI/Icon';

// Import Components
import HomeScreen from '../screens/Home';
import BookmarksScreen from '../screens/Bookmarks';
import SettingsScreen from '../screens/Settings';
import SeenScreen from '../screens/SeenScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

export type BottomTabsParamsList = {
  HomeScreen: undefined;
  SeenScreen: undefined;
  BookmarksScreen: undefined;
  SettingsScreen: undefined;
  // Profile: {userId: string};
  // Feed: {sort: 'latest' | 'top'} | undefined;
};

const BottomTabs = createBottomTabNavigator<BottomTabsParamsList>();

export default function BottomTabsNavigator() {
  // const theme = useColorScheme() ?? 'light';
  const theme = useSelector<RootState>(
    state => state.theme,
  ) as keyof typeof Colors;
  const activeColor = Colors[theme];

  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: activeColor.primary,
        },
        // tabBarActiveTintColor: 'black',
      }}>
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          // header: () => <HomeHeader title="VnExpress" />,
          tabBarIcon: ({focused}) => {
            if (!focused) {
              return <Icon source={HomeIcon} />;
            } else {
              return <Icon source={HomeIconActive} />;
            }
          },
        }}
      />
      <BottomTabs.Screen
        name="SeenScreen"
        component={SeenScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if (!focused) {
              return <Icon source={SearchIcon} />;
            } else {
              return <Icon source={SearchIconActice} />;
            }
          },
        }}
      />
      <BottomTabs.Screen
        name="BookmarksScreen"
        component={BookmarksScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if (!focused) {
              return <Icon source={BookmarksIcon} />;
            } else {
              return <Icon source={BookmarksIconActive} />;
            }
          },
        }}
      />
      <BottomTabs.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if (!focused) {
              return <Icon source={SettingIcon} />;
            } else {
              return <Icon source={SettingIconActive} />;
            }
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}
