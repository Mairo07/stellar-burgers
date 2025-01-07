import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createOrderThunk = createAsyncThunk(
  'uerOrders/createOrer',
  async (data: string[]) => orderBurgerApi(data)
);

type TCreateOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

export const initialState: TCreateOrderState = {
  order: null,
  orderRequest: false,
  error: null
};

export const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.order = null;
    }
  },
  selectors: {
    createOrderSelector: (state) => state.order,
    createOrderRequestSelector: (state) => state.orderRequest,
    createOrderErrorSelector: (state) => state.error
  },
  extraReducers(builder) {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.orderRequest = false;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderRequest = false;
      });
  }
});
export const createOrderSliceName = createOrderSlice.name;
export const createOrderSliceReducer = createOrderSlice.reducer;

export const { clearOrderData } = createOrderSlice.actions;

export const {
  createOrderErrorSelector,
  createOrderRequestSelector,
  createOrderSelector
} = createOrderSlice.selectors;
