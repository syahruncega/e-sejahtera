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
const ProfileGuard = ({ children }) => {
  const { isLoggedIn, profil } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/p3ke/login');
    }
    if (isLoggedIn && !profil) {
      router.push('/p3ke/biodata');
    }
    if (isLoggedIn && profil) {
      router.push('/p3ke/dashboard');
    }
    // eslint-disable-next-line
  }, [isLoggedIn, profil]);

  if (!isLoggedIn || profil) return <Loader />;

  return children;
};

ProfileGuard.propTypes = {
  children: PropTypes.node
};

export default ProfileGuard;
