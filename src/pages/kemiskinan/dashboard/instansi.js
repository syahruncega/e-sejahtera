import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Tab, Tabs, useTheme } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';
import { useState } from 'react';
import { gridSpacing } from 'store/constant';
import TabMasterInstansi from 'components/dashboard/Kemiskinan/Master/TabMasterInstansi';
import TabMasterProgram from 'components/dashboard/Kemiskinan/Master/TabMasterProgram';
import TabMasterKegiatan from 'components/dashboard/Kemiskinan/Master/TabMasterKegiatan';
import TabMasterSubKegiatan from 'components/dashboard/Kemiskinan/Master/TabMasterSubKegiatan';

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
    label: 'Instansi'
  },
  {
    label: 'Program'
  },
  {
    label: 'Kegiatan'
  },
  {
    label: 'Sub Kegiatan'
  }
];

const InstansiPage = () => {
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [params, setParams] = useState({});

  const pageProps = {
    title: 'Instansi',
    navigation: [
      {
        title: 'Instansi',
        url: '/kemiskinan/dashboard/instansi'
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
              // onChange={handleChange}
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
                <Tab key={index} label={tab.label} {...a11yProps(index)} />
              ))}
            </Tabs>
            <TabPanel value={value} index={0}>
              <TabMasterInstansi setValue={setValue} setParams={setParams} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TabMasterProgram setValue={setValue} params={params} setParams={setParams} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <TabMasterKegiatan setValue={setValue} params={params} setParams={setParams} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <TabMasterSubKegiatan setValue={setValue} />
            </TabPanel>
          </Grid>
        </Grid>
      </MainCard>
    </Page>
  );
};

InstansiPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default InstansiPage;
