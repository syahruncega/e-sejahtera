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
          <Toaster
            toastOptions={{
              success: {
                duration: 4000
              },
              error: {
                duration: 6000
              }
            }}
          />
          {children}
        </MinimalLayout>
      );

    case LAYOUT.noauth:
      return (
        <GuestGuard>
          <Toaster
            toastOptions={{
              success: {
                duration: 4000
              },
              error: {
                duration: 6000
              }
            }}
          />
          <MinimalLayout>{children}</MinimalLayout>
        </GuestGuard>
      );

    default:
      return (
        <AuthGuard>
          <Toaster
            toastOptions={{
              success: {
                duration: 4000
              },
              error: {
                duration: 6000
              }
            }}
          />
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
