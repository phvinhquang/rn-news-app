import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../constants/Color';
import {useTranslation} from 'react-i18next';
import Icon from '../components/UI/Icon';
import {TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {NativeStackParamsList} from '../navigators/Stack';

// Icon
import ChosenIcon from '../assets/settings/have-chosen-16.png';
import BackBtn from '../assets/back.png';

interface MenuOptionInterface {
  title: string;
  key: string;
  onPress: () => void;
}

type ScreenProps = StackScreenProps<NativeStackParamsList, 'ChooseLanguage'>;

export default function ChooseLanguage({navigation}: ScreenProps) {
  const {t, i18n} = useTranslation();
  const theme = useColorScheme() ?? 'light';
  const activeColor = Colors[theme];

  // Save data to storage handler
  const saveToStorage = async function () {
    try {
      await AsyncStorage.setItem('language', i18n.language);
    } catch (err) {
      Alert.alert((err as any).message);
    }
  };

  const MenuOption: MenuOptionInterface[] = [
    {
      title: 'English',
      key: 'en',
      onPress: () => {
        i18n.changeLanguage('en');
        saveToStorage();
      },
    },
    {
      title: 'Tiếng Việt',
      key: 'vn',
      onPress: () => {
        i18n.changeLanguage('vn');
        saveToStorage();
      },
    },
  ];

  const currentLanguage = i18n.language;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: activeColor.primary}}>
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon source={BackBtn} />
        </Pressable>
        <Text style={styles.title}>{t('chooseLanguage')}</Text>
      </View>

      <View style={styles.listContainer}>
        {MenuOption.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={option.onPress}>
            <Text style={styles.listText}>{option.title}</Text>
            {currentLanguage === option.key && (
              <Icon source={ChosenIcon} style={{width: 16, height: 16}} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: '2%',
    paddingTop: ' 2%',
    paddingBottom: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  listContainer: {
    paddingHorizontal: '5%',
    marginTop: '5%',
    gap: 20,
  },
  optionContainer: {
    paddingBottom: '2%',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
