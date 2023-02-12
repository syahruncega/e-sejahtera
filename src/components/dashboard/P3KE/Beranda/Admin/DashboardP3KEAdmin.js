import { Grid } from '@mui/material';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import P3KEBarChart from './P3KEBarChart';

const DashboardP3KEAdmin = () => {
  const [isLoading, setLoading] = useState(true);
  const { profil, user } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <P3KEBarChart />
      </Grid>
    </Grid>
  );
};

export default DashboardP3KEAdmin;
