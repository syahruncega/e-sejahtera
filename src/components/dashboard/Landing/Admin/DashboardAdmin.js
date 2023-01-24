import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import InstansiCardDashboard from './InstansiCardStats';
import P3KEBarChart from './P3KEBarChart';
import ProgramCardStats from './ProgramCardStats';
import KegiatanCardStats from './KegiataanCardStats';
import SubKegiatanCardStats from './SubKegiatanCardStats';

const DashboardAdmin = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <InstansiCardDashboard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ProgramCardStats isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <KegiatanCardStats isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <SubKegiatanCardStats isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <P3KEBarChart />
      </Grid>
    </Grid>
  );
};

export default DashboardAdmin;
