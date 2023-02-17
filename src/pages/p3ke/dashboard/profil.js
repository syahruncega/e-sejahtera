import PropTypes from 'prop-types';
import { useState } from 'react';

import Link from 'Link';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Tab, Tabs } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import FormProfilMahasiswa from 'components/dashboard/Profil/FormProfilMahasiswa';
import UbahKataSandi from 'components/dashboard/Profil/UbahKataSandi';
import { FormattedMessage } from 'react-intl';
import useAuth from 'hooks/useAuth';
import FormProfilAdmin from 'components/dashboard/Profil/FormProfilAdmin';
import FormProfilDosen from 'components/dashboard/Profil/FormProfilDosen';
import FormProfilPusbang from 'components/dashboard/Profil/FormProfilPusbang';
import FormProfilAnalis from 'components/dashboard/Profil/FormProfilAnalis';

// tabs panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// tabs option
const tabsOption = [
  {
    label: 'Profil',
    icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
  },

  {
    label: 'Ubah Kata Sandi',
    icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />
  }
];

// ==============================|| PROFILE 1 ||============================== //

const ProfilPage = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const pageProps = {
    title: 'Profil',
    navigation: [
      {
        title: 'Profil',
        url: '/dashboard/profil'
      }
    ]
  };

  return (
    <Page {...pageProps}>
      <MainCard>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
              sx={{
                mb: 3,
                '& a': {
                  minHeight: 'auto',
                  minWidth: 10,
                  py: 1.5,
                  px: 1,
                  mr: 2.25,
                  color: theme.palette.grey[600],
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                '& a.Mui-selected': {
                  color: theme.palette.primary.main
                },
                '& .MuiTabs-indicator': {
                  bottom: 2
                },
                '& a > svg': {
                  marginBottom: '0px !important',
                  mr: 1.25
                }
              }}
            >
              {tabsOption.map((tab, index) => (
                <Tab key={index} component={Link} href="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
              ))}
            </Tabs>
            <TabPanel value={value} index={0}>
              {user.role === 'admin' && <FormProfilAdmin />}
              {user.role === 'mahasiswa' && <FormProfilMahasiswa />}
              {user.role === 'dosen' && <FormProfilDosen />}
              {user.role === 'pusbang' && <FormProfilPusbang />}
              {user.role === 'analis' && <FormProfilAnalis />}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UbahKataSandi />
            </TabPanel>
          </Grid>
        </Grid>
      </MainCard>
    </Page>
  );
};

ProfilPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProfilPage;
