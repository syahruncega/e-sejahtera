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
import DonggalaTabs from 'components/dashboard/Statistik/DonggalaTabs';
import DesilCard from 'components/dashboard/Statistik/DesilCard';
import SubCard from 'components/ui-component/cards/SubCard';
import BantuanCard from 'components/dashboard/Statistik/BantuanCard';

const DonggalaPage = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const pageProps = {
    title: 'Kabupaten Donggala',
    navigation: [
      { title: <FormattedMessage id="statistik" defaultMessage="Statistik" />, url: '/dashboard' },
      { title: <FormattedMessage id="donggala" defaultMessage="Donggala" />, url: '/dashboard/stats/donggala' }
    ]
  };

  // Success
  return (
    <>
      <Page {...pageProps}>
        <MainCard>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <WilayahChart
                isLoading={isLoading}
                title="Data P3KE"
                jumlahKelurga="46034"
                jumlahIndividu="193999"
                categories={[
                  'Balaesang',
                  'Balaesang Tanjung',
                  'Banawa',
                  'Banawa Selatan',
                  'Banawa Tengah',
                  'Dampelas',
                  'Labuan',
                  'Pinembani',
                  'Rio Pakava',
                  'Sindue',
                  'Sindue Tobata',
                  'Sindue Tombusabora',
                  'Sirenja',
                  'Sojol',
                  'Sojol Utara',
                  'Tanantovea'
                ]}
                initSeries={[
                  {
                    name: 'Keluarga',
                    data: [3900, 2475, 3937, 4420, 2147, 4521, 2467, 1035, 3064, 3334, 1779, 2414, 3625, 3389, 1188, 2330]
                  },
                  {
                    name: 'Individu',
                    data: [16762, 10179, 17652, 18144, 8886, 19147, 10438, 4180, 12413, 14125, 7825, 10191, 15641, 13770, 4984, 9653]
                  }
                ]}
              />
            </Grid>
            <Grid item sm={12}>
              <DesilCard />
            </Grid>
            <Grid item sm={12}>
              <BantuanCard />
            </Grid>
            <Grid item sm={12}>
              <DonggalaTabs />
            </Grid>
          </Grid>
        </MainCard>
      </Page>
    </>
  );
};

DonggalaPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DonggalaPage;
