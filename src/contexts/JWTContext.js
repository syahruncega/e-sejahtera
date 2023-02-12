import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'components/ui-component/Loader';
import axiosService from 'utils/axios';
import { getMahasiswaById } from 'store/slices/mahasiswa';

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
        const session = await axiosService.get('/validate');
        if (!session.data) {
          dispatch({
            type: LOGOUT
          });
        }

        const user = session.data.user;
        let profil;
        if (user.role === 'mahasiswa') {
          profil = await getMahasiswaById(1);
        } else if (user.role === 'admin') {
          profil = await getMahasiswaById(1);
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
    await axiosService.post('/user/login', { username, password });
    const session = await axiosService.get('/validate');

    let profil;
    if (session.data.user.role === 'mahasiswa') {
      profil = await getMahasiswaById(1);
    } else if (session.data.user.role === 'admin') {
      profil = await getMahasiswaById(1);
    }

    const user = session.data.user;

    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user,
        profil
      }
    });
  };

  const register = async (username, password, firstName, lastName) => {};

  const logout = () => {
    // setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = (username) => console.log(username);

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
