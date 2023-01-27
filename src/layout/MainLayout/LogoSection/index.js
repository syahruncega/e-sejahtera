import Link from 'Link';
// material-ui
import { Box, Link as MuiLink, Typography } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'components/ui-component/Logo';
import Image from 'next/image';
import { maxWidth } from '@mui/system';
import Router from 'next/router';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <MuiLink
    component={Link}
    href={
      // eslint-disable-next-line no-nested-ternary
      Router.pathname.startsWith === '/kemiskinan'
        ? '/kemiskinan/dashboard'
        : Router.pathname.startsWith === '/p3ke'
        ? '/p3ke/dashboard'
        : '/stunting/dashboard'
    }
    sx={{ textDecoration: 'none' }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '160px' }}>
      <Logo />
      {/* <Box sx={{ ml: '8px' }}>
        <Typography sx={{ color: 'black', fontWeight: '900', fontSize: 13 }}>APLIKASI</Typography>
        <Typography sx={{ color: 'black', fontWeight: '900', fontSize: 13 }}>KEMISKINAN</Typography>
      </Box> */}
    </Box>
  </MuiLink>
);

export default LogoSection;
