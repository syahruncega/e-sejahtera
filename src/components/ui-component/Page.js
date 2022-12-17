import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// next
import Head from 'next/head';

// material-ui
import { Box } from '@mui/material';
import Breadcrumbs from './extended/Breadcrumbs';
import { IconChevronRight } from '@tabler/icons';

// ==============================|| Page - SET TITLE & META TAGS ||============================== //

const Page = forwardRef(({ children, title = '', navigation, meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Berry - React Material Admin Dashboard Template`}</title>
      {meta}
    </Head>
    <Box ref={ref} {...other}>
      {navigation && navigation.length > 0 && (
        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title={title} rightAlign />
      )}

      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node,
  meta: PropTypes.node,
  title: PropTypes.string,
  navigation: PropTypes.array
};

export default Page;
