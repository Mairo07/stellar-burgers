import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrdersThunk,
  userOrdersSelector
} from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(userOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
