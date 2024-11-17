import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getUserOrdersThunk = createAsyncThunk(
  'userOrders/getOrders',
  async () => getOrdersApi()
);

type TUserOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TUserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    userOrdersSelector: (state) => state.orders,
    userOrdersLoadingSelector: (state) => state.loading,
    userOrdersErrorSelector: (state) => state.error
  },
  extraReducers(builder) {
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const userOrdersSliceName = userOrdersSlice.name;
export const userOrdersSliceReducer = userOrdersSlice.reducer;

export const {
  userOrdersSelector,
  userOrdersErrorSelector,
  userOrdersLoadingSelector
} = userOrdersSlice.selectors;
