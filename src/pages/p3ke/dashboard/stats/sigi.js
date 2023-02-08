// material-ui
import { Grid } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';

// assets

import { FormattedMessage } from 'react-intl';

import { useEffect, useState } from 'react';
import WilayahChart from 'components/dashboard/Statistik/WilayahChart';
import SigiTabs from 'components/dashboard/Statistik/SigiTabs';

const SigiPage = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const pageProps = {
    title: 'Kabupaten Sigi',
    navigation: [
      { title: <FormattedMessage id="statistik" defaultMessage="Statistik" />, url: '/p3ke/dashboard' },
      { title: <FormattedMessage id="sigi" defaultMessage="Sigi" />, url: '/p3ke/dashboard/stats/sigi' }
    ]
  };

  // Success
  return (
    <>
      <Page {...pageProps}>
        <MainCard content={false}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <WilayahChart
                isLoading={isLoading}
                title="Data P3KE Kabupaten Sigi"
                jumlahKelurga="33522"
                jumlahIndividu="133868"
                categories={[
                  'Dolo',
                  'Dolo Barat',
                  'Dolo Selatan',
                  'Gumbasa',
                  'Kinovaro',
                  'Kulawi',
                  'Kulawi Selatan',
                  'Lindu',
                  'Marawola',
                  'Marawola Barat',
                  'Nokilalaki',
                  'Palolo',
                  'Pipikoro',
                  'Sigi Biromaru',
                  'Tanambulava'
                ]}
                initSeries={[
                  {
                    name: 'Keluarga',
                    data: [3661, 2031, 2599, 1737, 1968, 2495, 1170, 819, 1953, 1207, 726, 4610, 1729, 5491, 1326]
                  },
                  {
                    name: 'Individu',
                    data: [14692, 8548, 10268, 6935, 7308, 9957, 5065, 3498, 8282, 4308, 2979, 18351, 6553, 21892, 5232]
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <SigiTabs />
            </Grid>
          </Grid>
        </MainCard>
      </Page>
    </>
  );
};

SigiPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SigiPage;
