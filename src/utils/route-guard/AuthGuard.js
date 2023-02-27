import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// project imports
import Loader from 'components/ui-component/Loader';
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
  const { isLoggedIn, profil } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      if (router.query?.portal === 'p3ke') router.push({ pathname: '/login', query: { portal: 'p3ke' } });
      else if (router.query?.portal === 'kemiskinan') router.push({ pathname: '/login', query: { portal: 'kemiskinan' } });
      else router.push('/');
    }
    if (isLoggedIn && !profil) {
      if (router.pathname === '/p3ke/dashboard') router.push({ pathname: '/p3ke/biodata', query: { portal: 'p3ke' } });
      else if (router.pathname === '/kemiskinan/dashboard')
        router.push({ pathname: '/kemiskinan/biodata', query: { portal: 'kemiskinan' } });
    }
    // eslint-disable-next-line
  }, [isLoggedIn, profil]);

  if (!isLoggedIn || !profil) return <Loader />;

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
