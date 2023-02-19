// global styles
import PropTypes from 'prop-types';

// styles
import 'scss/style.scss';
import 'styles/globals.css';

// third-party
import { Provider } from 'react-redux';

// project import
import NavigationScroll from 'layout/NavigationScroll';
import { store } from 'store';
import ThemeCustomization from 'themes';
import RTLLayout from 'components/ui-component/RTLLayout';
import Locales from 'components/ui-component/Locales';
import Snackbar from 'components/ui-component/extended/Snackbar';

import { ConfigProvider } from 'contexts/ConfigContext';
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const Noop = ({ children }) => <> {children} </>;

Noop.propTypes = {
  children: PropTypes.node
};

// ==============================|| APP ||============================== //

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <ThemeCustomization>
            <RTLLayout>
              <Locales>
                <NavigationScroll>
                  <AuthProvider>
                    <>
                      {getLayout(<Component {...pageProps} />)}
                      <Snackbar />
                    </>
                  </AuthProvider>
                </NavigationScroll>
              </Locales>
            </RTLLayout>
          </ThemeCustomization>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

export default App;
