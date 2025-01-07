import {
  feedsSliceReducer,
  getFeedsThunk,
  getOrderByNumberThunk,
  initialState
} from './feeds-slice';

describe('feedsSlice', () => {
  describe('getFeedsThunk', () => {
    it('pending: должен устанавливать loading = true, error = null', () => {
      const action = { type: getFeedsThunk.pending.type };
      const nextState = feedsSliceReducer(initialState, action);

      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('rejected: должен устанавливать loading = false и записывать ошибку в state.error', () => {
      const errorMessage = 'Test get feeds error';
      const action = {
        type: getFeedsThunk.rejected.type,
        error: { message: errorMessage }
      };
      const prevState = {
        ...initialState,
        loading: true
      };

      const nextState = feedsSliceReducer(prevState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
      // Убеждаемся,  остальные поля без изменений
      expect(nextState.orders).toEqual([]);
      expect(nextState.total).toBe(0);
      expect(nextState.totalToday).toBe(0);
    });

    it('fulfilled: должен устанавливать loading=false, записывать заказы и total в стейт', () => {
      const mockOrders = [
        {
          _id: '677dae30133acd001be48ec8',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-01-07T22:44:00.992Z',
          updatedAt: '2025-01-07T22:44:02.311Z',
          number: 64975
        },
        {
          _id: '677dabe4133acd001be48ec2',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный метеоритный бургер',
          createdAt: '2025-01-07T22:34:12.285Z',
          updatedAt: '2025-01-07T22:34:13.293Z',
          number: 64974
        },
        {
          _id: '677da0e4133acd001be48e9b',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный метеоритный бургер',
          createdAt: '2025-01-07T21:47:16.967Z',
          updatedAt: '2025-01-07T21:47:17.886Z',
          number: 64972
        },
        {
          _id: '677d9fb1133acd001be48e8e',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa0943',
            null,
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный space антарианский бургер',
          createdAt: '2025-01-07T21:42:09.406Z',
          updatedAt: '2025-01-07T21:42:10.432Z',
          number: 64971
        }
      ];
      const testPayload = {
        orders: mockOrders,
        total: 123,
        totalToday: 12
      };
      const action = {
        type: getFeedsThunk.fulfilled.type,
        payload: testPayload
      };
      const prevState = {
        ...initialState,
        loading: true
      };

      const nextState = feedsSliceReducer(prevState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBeNull();
      expect(nextState.orders).toEqual(mockOrders);
      expect(nextState.total).toBe(123);
      expect(nextState.totalToday).toBe(12);
    });
  });

  describe('getOrderByNumberThunk', () => {
    it('pending: должен установить orderDetail = null, loading = true, error = null', () => {
      const action = { type: getOrderByNumberThunk.pending.type };
      const nextState = feedsSliceReducer(initialState, action);

      expect(nextState.orderDetail).toBeNull();
      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('rejected: должен установить loading = false и записать ошибку', () => {
      const errorMessage = 'Test get order error';
      const action = {
        type: getOrderByNumberThunk.rejected.type,
        error: { message: errorMessage }
      };
      const prevState = {
        ...initialState,
        loading: true
      };

      const nextState = feedsSliceReducer(prevState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
      // Проверим, что orderDetail не изменился и остался null
      expect(nextState.orderDetail).toBeNull();
    });

    it('fulfilled: должен установить orderDetail, loading=false, error=null', () => {
      const mockOrderInfo = [
        {
          success: true,
          orders: [
            {
              _id: '677dabe4133acd001be48ec2',
              ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa0940',
                '643d69a5c3f7b9001cfa093d'
              ],
              owner: '67697cee750864001d373c8d',
              status: 'done',
              name: 'Флюоресцентный метеоритный бургер',
              createdAt: '2025-01-07T22:34:12.285Z',
              updatedAt: '2025-01-07T22:34:13.293Z',
              number: 64974,
              __v: 0
            }
          ]
        }
      ];
      const action = {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: {
          orders: mockOrderInfo
        }
      };
      const prevState = {
        ...initialState,
        loading: true
      };

      const nextState = feedsSliceReducer(prevState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBeNull();

      expect(nextState.orderDetail).toEqual(mockOrderInfo[0]);
    });
  });
});
