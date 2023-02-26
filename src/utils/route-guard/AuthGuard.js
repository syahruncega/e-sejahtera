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
      if (router.query?.portal === 'p3ke') router.push('/p3ke/login');
      else if (router.query?.portal === 'kemiskinan') router.push('/kemiskinan/login');
      else router.push('/');
    }
    if (!profil) {
      if (router.query?.portal === 'p3ke') router.push('/p3ke/biodata');
      else if (router.query?.portal === 'kemiskinan') router.push('/kemiskinan/biodata');
      else router.push('/');
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
