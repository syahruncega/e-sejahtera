import Link from 'Link';
// material-ui
import { Box, Link as MuiLink, Typography } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'components/ui-component/Logo';
import Image from 'next/image';
import { maxWidth } from '@mui/system';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <MuiLink component={Link} href={DASHBOARD_PATH} sx={{ textDecoration: 'none' }}>
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
