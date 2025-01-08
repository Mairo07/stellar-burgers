import {
  userOrdersSliceReducer,
  getUserOrdersThunk
} from './user-orders-slice';
import { TOrder } from '@utils-types';

describe('userOrdersSlice', () => {
  const initialState = {
    orders: [] as TOrder[],
    loading: false,
    error: null as string | null
  };

  describe('getUserOrdersThunk', () => {
    it('pending: должно устанавливать loading = true, error = null', () => {
      const action = { type: getUserOrdersThunk.pending.type };
      const nextState = userOrdersSliceReducer(initialState, action);

      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('rejected: должно устанавливать loading = false и записывать ошибку в error', () => {
      const errorMessage = 'Some error';
      const action = {
        type: getUserOrdersThunk.rejected.type,
        error: { message: errorMessage }
      };
      // имитируем, что загрузка уже идёт
      const prevState = { ...initialState, loading: true };

      const nextState = userOrdersSliceReducer(prevState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
      // Проверяем, что заказы не изменились
      expect(nextState.orders).toEqual([]);
    });

    it('fulfilled: должно устанавливать loading=false и записывать заказы в state.orders', () => {
      const mockOrders: TOrder[] = [
        {
          _id: '673a522ab27b06001c3e8c8b',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa094a',
            '643d69a5c3f7b9001cfa0948',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Антарианский астероидный краторный альфа-сахаридный био-марсианский бургер',
          createdAt: '2024-11-17T20:29:30.520Z',
          updatedAt: '2024-11-17T20:29:31.345Z',
          number: 59628
        },
        {
          _id: '673a52d9b27b06001c3e8c8c',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Метеоритный флюоресцентный бессмертный бургер',
          createdAt: '2024-11-17T20:32:25.083Z',
          updatedAt: '2024-11-17T20:32:25.937Z',
          number: 59629
        },
        {
          _id: '673a5872b27b06001c3e8ca7',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный люминесцентный бургер',
          createdAt: '2024-11-17T20:56:18.939Z',
          updatedAt: '2024-11-17T20:56:19.784Z',
          number: 59631
        }
      ];
      const action = {
        type: getUserOrdersThunk.fulfilled.type,
        payload: mockOrders
      };
      // имитируем, что загрузка уже идёт
      const prevState = { ...initialState, loading: true };

      const nextState = userOrdersSliceReducer(prevState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBeNull();
      expect(nextState.orders).toEqual(mockOrders);
    });
  });
});
