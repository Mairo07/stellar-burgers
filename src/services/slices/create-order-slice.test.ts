import {
  createOrderSliceReducer,
  createOrderThunk,
  initialState
} from './create-order-slice';

describe('createOrderThunk из createOrderSlice', () => {
  const mockResponse = {
    order: {
      success: true,
      name: 'Space флюоресцентный метеоритный бургер',
      order: {
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-04-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa0940',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-04-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png'
          }
        ],
        status: 'done',
        name: 'Space флюоресцентный метеоритный бургер',
        number: 64935,
        price: 5056
      }
    }
  };

  it('pending: должно устанавливать orderRequest = true и error = null', () => {
    const action = { type: createOrderThunk.pending.type };
    const nextState = createOrderSliceReducer(initialState, action);

    expect(nextState.orderRequest).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('rejected: должно устанавливать error и orderRequest = false', () => {
    const errorMessage = 'Test error';
    const action = {
      type: createOrderThunk.rejected.type,
      error: { message: errorMessage }
    };
    const prevState = {
      ...initialState,
      orderRequest: true
    };

    const nextState = createOrderSliceReducer(prevState, action);

    expect(nextState.orderRequest).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it('fulfilled: должно записывать order в state и устанавливать orderRequest = false', () => {
    const action = {
      type: createOrderThunk.fulfilled.type,
      payload: mockResponse
    };
    const prevState = {
      ...initialState,
      orderRequest: true
    };

    const nextState = createOrderSliceReducer(prevState, action);

    expect(nextState.orderRequest).toBe(false);
    expect(nextState.order).toEqual(mockResponse.order);
    expect(nextState.error).toBeNull();
  });
});
