import { v4 as uuid } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

const initialState: TBurgerConstructorState = {
  ingredients: [],
  bun: null
};

const burgerContructorSlice = createSlice({
  name: 'burgerContructor',
  initialState,
  reducers: {
    addToBurgerConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    changeIngredientPosition: (
      state,
      action: PayloadAction<{ currentIndex: number; targetIndex: number }>
    ) => {
      const temp = state.ingredients[action.payload.currentIndex];
      state.ingredients[action.payload.currentIndex] =
        state.ingredients[action.payload.targetIndex];
      state.ingredients[action.payload.targetIndex] = temp;
    },
    clearBurgerContructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    getBurgerContructorSelector: (state) => state
  }
});

export const burgerContructorSliceName = burgerContructorSlice.name;
export const burgerContructorSliceReducer = burgerContructorSlice.reducer;

export const {
  addToBurgerConstructor,
  removeIngredientFromConstructor,
  changeIngredientPosition,
  clearBurgerContructor
} = burgerContructorSlice.actions;
export const { getBurgerContructorSelector } = burgerContructorSlice.selectors;
