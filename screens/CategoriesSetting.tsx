import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  Button,
} from 'react-native';
import {useCallback, useEffect} from 'react';
import {Catergory, TT_CATEGORIES, VE_CATEGORIES} from '../constants/Categories';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {NativeStackParamsList} from '../navigators/Stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../components/UI/Icon';
import BackBtn from '../assets/back.png';
import ChosenIcon from '../assets/settings/have-chosen-16.png';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {Swipeable} from 'react-native-gesture-handler';
import {categoriesActions} from '../store/categories-slice';
import {NewsSource} from './Home';

type ScreenProps = StackScreenProps<NativeStackParamsList, 'CategoriesSetting'>;

export default function CategoriesSetting({navigation}: ScreenProps) {
  // const [data, setData] = useState<Catergory[]>(CATEGORIES);
  const data = useSelector<RootState>(
    state => state.categories.categories,
  ) as Catergory[];
  const newsSource = useSelector<RootState>(
    state => state.newsSource,
  ) as string;

  const userEmail = useSelector<RootState>(state => state.authentication.email);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  let row: Array<any> = [];

  const saveToStorage = async function (data: Catergory[]) {
    try {
      const dataFromStorage = await AsyncStorage.getItem(
        `${userEmail}-categories`,
      );
      if (dataFromStorage) {
        const parsedData = JSON.parse(dataFromStorage);

        // console.log(newsSource);
        // console.log(parsedData);

        // if (newsSource === NewsSource.VnExpress) {
        //   parsedData.vnexpress = data;
        // }
        // if (newsSource === NewsSource.TuoiTre) {
        //   parsedData.tuoitre = data;
        // }

        parsedData[newsSource] = data;

        await AsyncStorage.setItem(
          `${userEmail}-categories`,
          JSON.stringify(parsedData),
        );
      }
      //  else {
      //   // console.log(data);

      //   const dataToSave = {
      //     vnexpress: newsSource === NewsSource.VnExpress ? data : null,
      //     tuoitre: newsSource === NewsSource.TuoiTre ? data : null,
      //   };
      //   await AsyncStorage.setItem(
      //     `${userEmail}-categories`,
      //     JSON.stringify(dataToSave),
      //   );
      // }

      // await AsyncStorage.setItem(
      //   `${userEmail}-categories`,
      //   JSON.stringify(data),
      // );
    } catch (err) {
      console.log(err);
    }
  };

  // Drag End Handler
  const dragEndHandler = function (data: Catergory[]) {
    // setData(data);
    dispatch(categoriesActions.update(data));
    saveToStorage(data);
  };

  // Toggle option handler
  const toogleOptionHandler = function (index: number | undefined) {
    if (index || index === 0) {
      dispatch(categoriesActions.toggle(index));
    }
  };

  // Save data to storage when category's shown/hidden
  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  // Get category order from storage
  // useEffect(() => {
  //   const getDataFromStorage = async function () {
  //     try {
  //       const dataFromStorage = await AsyncStorage.getItem(
  //         `${userEmail}-categories`,
  //       );
  //       if (dataFromStorage && newsSource) {
  //         const parsedData = JSON.parse(dataFromStorage);
  //         if (newsSource === NewsSource.VnExpress) {
  //           // setData(JSON.parse(data));
  //           dispatch(categoriesActions.update(parsedData.vnexpress));
  //         }
  //         if (newsSource === NewsSource.TuoiTre) {
  //           // setData(JSON.parse(data));
  //           dispatch(categoriesActions.update(parsedData.tuoitre));
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getDataFromStorage();
  // }, []);

  const renderItem = useCallback(
    ({item, drag, isActive, getIndex}: RenderItemParams<Catergory>) => {
      return (
        <Swipeable
          ref={ref => {
            const index = getIndex();
            if (index || index === 0) {
              row[index] = ref;
            }
          }}
          renderRightActions={() => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const index = getIndex();
                if (index || index === 0) {
                  toogleOptionHandler(index);
                  row[index].close();
                }
              }}>
              <Text>{item.chosen ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          )}>
          <TouchableOpacity
            style={[styles.option, isActive && styles.optionActive]}
            onLongPress={drag}>
            <Text
              style={[styles.optionText, item.chosen && styles.optionChosen]}>
              {t(item.name)}
            </Text>
            {item.chosen && (
              <Icon source={ChosenIcon} style={{width: 16, height: 16}} />
            )}
          </TouchableOpacity>
        </Swipeable>
      );
    },
    [data],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon source={BackBtn} />
        </Pressable>
        <Text style={styles.title}>{t('interests')}</Text>
      </View>
      <View style={styles.listContainer}>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `draggable-item-${item.name}`}
          onDragEnd={({data}) => dragEndHandler(data)}
        />
      </View>
      <Button
        title="Clear"
        onPress={async () =>
          console.log(await AsyncStorage.removeItem(`${userEmail}-categories`))
        }
      />

      <Button
        title="Get All Keys"
        onPress={async () => console.log(await AsyncStorage.getAllKeys())}
      />
      <Button
        title="Get Data"
        onPress={async () =>
          console.log(await AsyncStorage.getItem(`${userEmail}-categories`))
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: '5%',
    height: '80%',
  },
  option: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '4%',
    paddingVertical: '4%',

    flexDirection: 'row',
    borderBottomWidth: 0.6,
    borderBottomColor: '#bbb',
    backgroundColor: 'white',
  },
  optionActive: {
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  optionText: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
    opacity: 0.7,
    fontStyle: 'italic',
  },
  optionChosen: {
    opacity: 1,
    fontStyle: 'normal',
  },
  titleContainer: {
    paddingHorizontal: '2%',
    paddingTop: ' 3%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    width: 80,
    height: 45,
    marginBottom: 1,
    backgroundColor: '#ccc',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
});
