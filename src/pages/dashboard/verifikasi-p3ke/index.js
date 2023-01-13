// material-ui
import { Grid, InputLabel, TextField } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';

// assets

import { FormattedMessage } from 'react-intl';
import { LoadingButton } from '@mui/lab';
import { IconSearch } from '@tabler/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';

const VerifikasiP3KEPage = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const pageProps = {
    title: 'Verifikasi P3KE',
    navigation: [{ title: <FormattedMessage id="verifikasi-p3ke" defaultMessage="Verifikasi P3KE" />, url: '/dashboard/verifikasi-p3ke' }]
  };

  // Success
  return (
    <>
      <Page {...pageProps}>
        <MainCard>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} lg={4}>
              <InputLabel>ID Keluarga</InputLabel>
              <TextField fullWidth placeholder="Cari ID Keluarga" />
              {/* <FormHelperText>Please enter your full name</FormHelperText> */}
            </Grid>
            <Grid item xs={12} lg={4}>
              <InputLabel>NIK</InputLabel>
              <TextField fullWidth placeholder="Cari NIK" />
            </Grid>
            <Grid item xs={12} lg={4}>
              <InputLabel>Nama</InputLabel>
              <TextField type="password" fullWidth placeholder="Cara Nama" />
            </Grid>
            <Grid item xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton
                variant="contained"
                rad
                startIcon={<IconSearch size={18} />}
                onClick={() => router.push('/dashboard/verifikasi-p3ke/review')}
              >
                Cari
              </LoadingButton>
            </Grid>
          </Grid>
        </MainCard>
      </Page>
    </>
  );
};

VerifikasiP3KEPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default VerifikasiP3KEPage;
