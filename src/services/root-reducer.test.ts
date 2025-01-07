import { rootReducer } from './root-reducer';
import store from './store';

describe('rootReducer', () => {
  it('правильно инициизироан и настроен', () => {
    const testState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(testState);
  });
});
