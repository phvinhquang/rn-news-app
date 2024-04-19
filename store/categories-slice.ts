import {createSlice} from '@reduxjs/toolkit';
import {
  CATEGORIES,
  CategoryInterface,
  Catergory,
  VE_CATEGORIES,
} from '../constants/Categories';
import {Alert} from 'react-native';
import {t} from 'i18next';

// const initialCategoriesState: Catergory[] = CATEGORIES;

interface CategoriesStateInterface {
  categories: CategoryInterface[];
  currentCategory: CategoryInterface;
}

const initialCategoriesState: CategoriesStateInterface = {
  categories: VE_CATEGORIES,
  currentCategory: VE_CATEGORIES[0],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialCategoriesState,
  reducers: {
    update(state, action) {
      state.categories = action.payload;
    },

    changeCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },

    setDefaultCurrentCategory(state) {
      state.currentCategory = state.categories[0];
    },

    toggle(state, action) {
      const index = action.payload;
      const updatedState = [...state.categories];
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
