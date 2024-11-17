import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const getFeedsThunk = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

export const getOrderByNumberThunk = createAsyncThunk(
  'feeds/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

type TFeedsState = {
  orders: TOrder[];
  orderDetail: TOrder | null;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  orders: [],
  orderDetail: null,
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedsSelector: (state) => state,
    feedsOrdersSelector: (state) => state.orders,
    feedsLoadingSelector: (state) => state.loading,
    feedsErrorSelector: (state) => state.error,
    feedsOrderDetailSelector: (state) => state.orderDetail
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.orderDetail = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload.orders[0];
      });
  }
});

export const feedsSliceName = feedsSlice.name;
export const feedsSliceReducer = feedsSlice.reducer;

export const {
  feedsSelector,
  feedsOrdersSelector,
  feedsLoadingSelector,
  feedsErrorSelector,
  feedsOrderDetailSelector
} = feedsSlice.selectors;
