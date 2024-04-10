import {createSlice} from '@reduxjs/toolkit';
import {CATEGORIES, Catergory} from '../constants/Categories';
import {Alert} from 'react-native';
import {t} from 'i18next';

const initialCategoriesState: Catergory[] = CATEGORIES;

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialCategoriesState,
  reducers: {
    update(_, action) {
      return action.payload;
    },

    toggle(state, action) {
      const index = action.payload;
      const updatedState = [...state];
      updatedState[index].chosen = !updatedState[index].chosen;

      if (!updatedState.find(cat => cat.chosen)) {
        Alert.alert(t('emptyCategory'), t('mustChooseOneCategory'));
        updatedState[index].chosen = !updatedState[index].chosen;
      }
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice;
