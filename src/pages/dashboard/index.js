import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import InstansiCardDashboard from '../../components/dashboard/Default/InstansiCardDashboard';
import PopularCard from '../../components/dashboard/Default/PopularCard';
import ProgramCardDashboard from '../../components/dashboard/Default/ProgramCardDashboard';
import KegiatanCardDashboard from '../../components/dashboard/Default/KegiatanCardDashboard';
import SubKegiatanCardDashboard from '../../components/dashboard/Default/SubKegiatanCardDashboard';
import TotalGrowthBarChart from '../../components/dashboard/Default/TotalGrowthBarChart';
import { gridSpacing } from '../../store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Page title="Default Dashboard">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <InstansiCardDashboard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <ProgramCardDashboard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <KegiatanCardDashboard isLoading={isLoading} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <SubKegiatanCardDashboard isLoading={isLoading} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Page>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
