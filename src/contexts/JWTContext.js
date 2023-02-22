import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'components/ui-component/Loader';
import axiosService from 'utils/axios';

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  profil: null
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await Promise.all([axiosService.get('/auth/session'), axiosService.get('/auth/profile')]);

        const user = res[0].data;
        const profil = res[1].data;

        if (!user) {
          dispatch({
            type: LOGOUT
          });
        }

        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user,
            profil
          }
        });
      } catch (err) {
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (username, password) => {
    const auth = await axiosService.post('/auth/login', { username, password });

    const user = auth.data;
    // const profil = res[1].data;

    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const register = async (username, password, firstName, lastName) => {};

  const logout = async () => {
    // setSession(null);
    await axiosService.post('/auth/logout');
    dispatch({ type: LOGOUT });
  };

  const resetPassword = (username) => console.log(username);

  const updateSession = async () => {
    const res = await Promise.all([axiosService.get('/auth/session'), axiosService.get('/auth/profile')]);
    const user = res[0].data;
    const profil = res[1].data;
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user,
        profil
      }
    });
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateSession }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
