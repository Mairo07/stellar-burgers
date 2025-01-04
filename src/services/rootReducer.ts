import { combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsSliceName,
  ingredientsSliceReducer
} from './slices/ingredientsSlice';
import {
  burgerContructorSliceName,
  burgerContructorSliceReducer
} from './slices/burgerConstructorSlice';
import { feedsSliceName, feedsSliceReducer } from './slices/feedsSlice';
import { authSliceName, authSliceReducer } from './slices/authSlice';
import {
  userOrdersSliceName,
  userOrdersSliceReducer
} from './slices/userOrdersSlice';
import {
  createOrderSliceName,
  createOrderSliceReducer
} from './slices/createOrderSlice';

export const rootReducer = combineReducers({
  [burgerContructorSliceName]: burgerContructorSliceReducer,
  [ingredientsSliceName]: ingredientsSliceReducer,
  [feedsSliceName]: feedsSliceReducer,
  [authSliceName]: authSliceReducer,
  [userOrdersSliceName]: userOrdersSliceReducer,
  [createOrderSliceName]: createOrderSliceReducer
});
