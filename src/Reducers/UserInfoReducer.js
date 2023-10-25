export const initState = {
  name: sessionStorage.getItem('user')?.split('@')[0] || '',
  email: sessionStorage.getItem('user') || '',
};

export const ACTIONS = Object.freeze({
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
});

export const userInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      sessionStorage.setItem('user', action.payload.email);
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };
    case ACTIONS.LOGOUT:
      sessionStorage.removeItem('user');
      return {
        name: '',
        email: '',
      };
    default:
      return state;
  }
};
