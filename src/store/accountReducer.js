// action - state management
import { LOGIN, LOGOUT, REGISTER } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  profil: null
};

// eslint-disable-next-line
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user, profil } = action.payload;
      return {
        ...state,
        user,
        profil
      };
    }
    case LOGIN: {
      const { user, profil } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
        profil
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        profil: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
