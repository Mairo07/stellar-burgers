import {
  authSliceReducer,
  loginUserThunk,
  registerUserThunk,
  getUserThunk,
  updateUserThunk,
  logoutUserThunk,
  userLogout,
  initialState
} from './auth-slice';

describe('authSlice', () => {
  beforeAll(() => {
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };
  });

  jest.mock('../../utils/cookie', () => ({
    setCookie: jest.fn(),
    getCookie: jest.fn(),
    deleteCookie: jest.fn()
  }));

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('loginUserThunk', () => {
    it('pending: должно установить isAuthChecked=false, loginUserRequest=true, loginUserError=null', () => {
      const action = { type: loginUserThunk.pending.type };
      const nextState = authSliceReducer(initialState, action);

      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.loginUserRequest).toBe(true);
      expect(nextState.loginUserError).toBeNull();
    });

    it('rejected: должно установить loginUserRequest=false, loginUserError и isAuthChecked=true', () => {
      const errorMessage = 'Test login error';
      const action = {
        type: loginUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const prevState = {
        ...initialState,
        loginUserRequest: true
      };

      const nextState = authSliceReducer(prevState, action);

      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.loginUserError).toBe(
        `Ошибка авторизации: ${errorMessage}`
      );
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('fulfilled: должно установить userData, loginUserRequest=false, isAuthenticated и isAuthChecked в true', () => {
      const mockUser = { email: 'newTest@yandex.ru', name: 'newTest' };
      const action = {
        type: loginUserThunk.fulfilled.type,
        payload: mockUser
      };
      const prevState = {
        ...initialState,
        loginUserRequest: true
      };

      const nextState = authSliceReducer(prevState, action);

      expect(nextState.userData).toEqual(mockUser);
      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
    });
  });

  describe('registerUserThunk', () => {
    it('pending: должно установить loginUserRequest=true, registerUserError=null', () => {
      const action = { type: registerUserThunk.pending.type };
      const nextState = authSliceReducer(initialState, action);

      expect(nextState.loginUserRequest).toBe(true);
      expect(nextState.registerUserError).toBeNull();
    });

    it('rejected: должно установить loginUserRequest=false, registerUserError, isAuthChecked=true', () => {
      const errorMessage = 'Registration error';
      const action = {
        type: registerUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const prevState = {
        ...initialState,
        loginUserRequest: true
      };

      const nextState = authSliceReducer(prevState, action);

      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.registerUserError).toBe(
        `Ошибка регистрации: ${errorMessage}`
      );
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('fulfilled: должно установить userData, loginUserRequest=false, isAuthenticated и isAuthChecked=true', () => {
      const mockUser = {
        email: 'test@yandex.ru',
        name: 'test',
        password: 'qwerty'
      };
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: mockUser
      };
      const prevState = {
        ...initialState,
        loginUserRequest: true
      };

      const nextState = authSliceReducer(prevState, action);

      expect(nextState.userData).toEqual(mockUser);
      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
    });
  });

  describe('logoutUserThunk', () => {
    it('rejected: должно установить logoutUserError', () => {
      const errorMessage = 'Logout error';
      const action = {
        type: logoutUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const nextState = authSliceReducer(initialState, action);

      expect(nextState.logoutUserError).toBe(
        `Ошибка выхода из аккаунта: ${errorMessage}`
      );
    });
  });

  describe('getUserThunk', () => {
    it('pending: должно установить loginUserRequest=true, loginUserError=null', () => {
      const action = { type: getUserThunk.pending.type };
      const nextState = authSliceReducer(initialState, action);

      expect(nextState.loginUserRequest).toBe(true);
      expect(nextState.loginUserError).toBeNull();
    });

    it('rejected: должно установить loginUserRequest=false, isAuthChecked=true', () => {
      const errorMessage = 'Get user error';
      const action = {
        type: getUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const prevState = {
        ...initialState,
        loginUserRequest: true
      };

      const nextState = authSliceReducer(prevState, action);

      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('fulfilled: должно записать userData, loginUserRequest=false, isAuthenticated=true, isAuthChecked=true', () => {
      const mockApiResponse = {
        user: { email: 'test@yandex.ru', name: 'test' }
      };
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: mockApiResponse
      };
      const prevState = {
        ...initialState,
        loginUserRequest: true
      };

      const nextState = authSliceReducer(prevState, action);

      expect(nextState.userData).toEqual(mockApiResponse.user);
      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
    });
  });

  describe('updateUserThunk', () => {
    it('pending: должно установить isAuthChecked=false, loginUserRequest=true, loginUserError=null', () => {
      const action = { type: updateUserThunk.pending.type };
      const nextState = authSliceReducer(initialState, action);

      expect(nextState.isAuthChecked).toBe(false);
      expect(nextState.loginUserRequest).toBe(true);
      expect(nextState.loginUserError).toBeNull();
    });

    it('rejected: должно установить loginUserRequest=false, loginUserError, isAuthChecked=true', () => {
      const errorMessage = 'Update user error';
      const action = {
        type: updateUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const prevState = {
        ...initialState,
        loginUserRequest: true
      };

      const nextState = authSliceReducer(prevState, action);

      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.loginUserError).toBe(
        `Ошибка обновления данных: ${errorMessage}`
      );
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('fulfilled: должно обновить userData и установить loginUserRequest=false, isAuthenticated=true, isAuthChecked=true', () => {
      const mockUserData = { email: 'updated@yandex.ru', name: 'Updated' };
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: mockUserData
      };
      const prevState = {
        ...initialState,
        loginUserRequest: true
      };

      const nextState = authSliceReducer(prevState, action);

      expect(nextState.userData).toEqual(mockUserData);
      expect(nextState.loginUserRequest).toBe(false);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
    });
  });

  describe('userLogout reducer', () => {
    it('должен обнулять userData', () => {
      const prevState = {
        ...initialState,
        userData: { email: 'test@yandex.ru', name: 'test' }
      };
      const nextState = authSliceReducer(prevState, userLogout());

      expect(nextState.userData).toBeNull();
    });
  });
});
