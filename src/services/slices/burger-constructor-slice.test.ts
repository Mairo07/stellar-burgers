import {
  addToBurgerConstructor,
  removeIngredientFromConstructor,
  changeIngredientPosition,
  clearBurgerContructor,
  burgerContructorSliceReducer,
  initialState
} from './burger-constructor-slice';

const bunIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const mainIngredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
};

const anotherMainIngreient = {
  _id: '643d69a5c3f7b9001cfa0947',
  name: 'Плоды Фалленианского дерева',
  type: 'main',
  proteins: 20,
  fat: 5,
  carbohydrates: 55,
  calories: 77,
  price: 874,
  image: 'https://code.s3.yandex.net/react/code/sp_1.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
};

const sauceIngredient = {
  _id: 'test-sauce-id',
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
};

describe('burgerContructorSlice', () => {
  describe('addToBurgerConstructor', () => {
    it('должен добавлять булку в состояние, если type === "bun"', () => {
      const nextState = burgerContructorSliceReducer(
        initialState,
        addToBurgerConstructor(bunIngredient)
      );

      expect(nextState.bun?.name).toEqual(bunIngredient.name);
      expect(nextState.bun?._id).toEqual(bunIngredient._id);
      expect(nextState.ingredients).toEqual([]);
    });

    it('должен добавлять начинку в state.ingredients', () => {
      const nextState = burgerContructorSliceReducer(
        initialState,
        addToBurgerConstructor(mainIngredient)
      );

      expect(nextState.bun).toBeNull();
      expect(nextState.ingredients).toHaveLength(1);
      expect(nextState.ingredients[0].name).toEqual(mainIngredient.name);
      expect(nextState.ingredients[0]._id).toEqual(mainIngredient._id);
    });
  });

  describe('removeIngredientFromConstructor', () => {
    it('должен удалять ингредиент по id', () => {
      const prevState = {
        bun: null,
        ingredients: [
          {
            ...mainIngredient,
            id: '1'
          },
          {
            ...sauceIngredient,
            id: '2'
          }
        ]
      };

      const nextState = burgerContructorSliceReducer(
        prevState,
        removeIngredientFromConstructor('1')
      );
      expect(nextState.ingredients).toHaveLength(1);
      expect(nextState.ingredients[0]).toEqual({
        ...sauceIngredient,
        id: '2'
      });
    });

    it('не должен менять state, если ингредиента с таким id нет', () => {
      const prevState = {
        bun: null,
        ingredients: [
          {
            ...mainIngredient,
            id: '1'
          }
        ]
      };

      const nextState = burgerContructorSliceReducer(
        prevState,
        removeIngredientFromConstructor('10')
      );
      expect(nextState.ingredients).toHaveLength(1);
      expect(nextState.ingredients[0].id).toBe('1');
    });
  });

  describe('changeIngredientPosition', () => {
    it('должен менять местами ингредиенты в массиве по индексам', () => {
      const prevState = {
        bun: null,
        ingredients: [
          {
            ...mainIngredient,
            id: '1'
          },
          {
            ...sauceIngredient,
            id: '2'
          },
          {
            ...anotherMainIngreient,
            id: '3'
          }
        ]
      };

      const nextState = burgerContructorSliceReducer(
        prevState,
        changeIngredientPosition({ currentIndex: 0, targetIndex: 2 })
      );

      // Проверяем, что ингредиенты поменялись местами
      expect(nextState.ingredients[0].id).toBe('3');
      expect(nextState.ingredients[2].id).toBe('1');
      // Средний элемент остался прежним
      expect(nextState.ingredients[1].id).toBe('2');
    });
  });

  describe('clearBurgerContructor', () => {
    it('должен очищать массив ingredients и сбрасывать bun в null', () => {
      const prevState = {
        bun: { ...bunIngredient, id: 'bun-id' },
        ingredients: [
          {
            ...mainIngredient,
            id: '1'
          },
          {
            ...sauceIngredient,
            id: '2'
          }
        ]
      };

      const nextState = burgerContructorSliceReducer(
        prevState,
        clearBurgerContructor()
      );

      expect(nextState.bun).toBeNull();
      expect(nextState.ingredients).toHaveLength(0);
    });
  });
});
