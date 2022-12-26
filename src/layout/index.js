import PropTypes from 'prop-types';

// project import
import LAYOUT from 'constant';
import MainLayout from './MainLayout';
import MinimalLayout from './MinimalLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
import GuestGuard from 'utils/route-guard/GuestGuard';
import { Toaster } from 'react-hot-toast';

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

function Layout({ variant = LAYOUT.main, children }) {
  switch (variant) {
    case LAYOUT.minimal:
      return (
        <MinimalLayout>
          <Toaster />
          {children}
        </MinimalLayout>
      );

    case LAYOUT.noauth:
      return (
        <GuestGuard>
          <Toaster />
          <MinimalLayout>{children}</MinimalLayout>
        </GuestGuard>
      );

    default:
      return (
        <AuthGuard>
          <Toaster />
          <MainLayout>{children}</MainLayout>
        </AuthGuard>
      );
  }
}

Layout.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.any
};

export default Layout;
