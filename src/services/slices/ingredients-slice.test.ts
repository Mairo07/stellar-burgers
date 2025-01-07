import {
  ingredientsSliceReducer,
  getIngredients,
  initialState
} from './ingredients-slice';
import { TIngredients } from '@utils-types';

describe('ingredientsSlice', () => {
  const mockIngredients: TIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
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
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
    }
  ];

  it('при вызове getIngredients.pending должно устанавливаться loading = true и error = null', () => {
    const action = { type: getIngredients.pending.type };
    const nextState = ingredientsSliceReducer(initialState, action);

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('при вызове getIngredients.fulfilled данные записываются в state.ingredients и loading = false', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const prevState = {
      ...initialState,
      loading: true
    };
    const nextState = ingredientsSliceReducer(prevState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
    expect(nextState.ingredients).toEqual(mockIngredients);
  });

  it('при вызове getIngredients.rejected ошибка записывается в state.error и loading = false', () => {
    const errorMessage = 'Test error';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };

    const prevState = {
      ...initialState,
      loading: true,
      error: null
    };
    const nextState = ingredientsSliceReducer(prevState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
    expect(nextState.ingredients).toEqual([]);
  });
});
