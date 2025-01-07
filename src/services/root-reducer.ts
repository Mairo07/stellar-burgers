import { combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsSliceName,
  ingredientsSliceReducer
} from './slices/ingredients-slice';
import {
  burgerContructorSliceName,
  burgerContructorSliceReducer
} from './slices/burger-constructor-slice';
import { feedsSliceName, feedsSliceReducer } from './slices/feeds-slice';
import { authSliceName, authSliceReducer } from './slices/auth-slice';
import {
  userOrdersSliceName,
  userOrdersSliceReducer
} from './slices/user-orders-slice';
import {
  createOrderSliceName,
  createOrderSliceReducer
} from './slices/create-order-slice';

export const rootReducer = combineReducers({
  [burgerContructorSliceName]: burgerContructorSliceReducer,
  [ingredientsSliceName]: ingredientsSliceReducer,
  [feedsSliceName]: feedsSliceReducer,
  [authSliceName]: authSliceReducer,
  [userOrdersSliceName]: userOrdersSliceReducer,
  [createOrderSliceName]: createOrderSliceReducer
});
