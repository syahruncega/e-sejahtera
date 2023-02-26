import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// project imports
import Loader from 'components/ui-component/Loader';
import useAuth from 'hooks/useAuth';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if (router.query?.portal === 'p3ke') router.push('/p3ke/dashboard');
      else if (router.query?.portal === 'kemiskinan') router.push('/kemiskinan/dashboard');
      else router.push('/');
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (isLoggedIn) return <Loader />;

  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
