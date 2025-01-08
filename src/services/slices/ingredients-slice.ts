import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredients } from '@utils-types';

type TIngredientsState = {
  ingredients: TIngredients;
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (sliceState) => sliceState.ingredients,
    getIngredientsLoadingSelector: (sliceState) => sliceState.loading,
    getIngredientsErrorSelector: (sliceState) => sliceState.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsSliceName = ingredientsSlice.name;
export const ingredientsSliceReducer = ingredientsSlice.reducer;

export const {
  getIngredientsSelector,
  getIngredientsLoadingSelector,
  getIngredientsErrorSelector
} = ingredientsSlice.selectors;
