// material-ui
import { Alert, AlertTitle, Grid } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';

// assets

import { FormattedMessage } from 'react-intl';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import MainCard from 'components/ui-component/cards/MainCard';
import { getMonevById } from 'store/slices/monev';
import FormVerifikasiMonev from 'components/form/FormVerifikasiMonev';

const ReviewMonevPage = () => {
  const router = useRouter();

  const fetchMonevById = useQuery(['MonevById'], () => getMonevById(router.query.kabupatenKotaId, router.query.id));

  const pageProps = {
    title: 'Review',
    navigation: [
      { title: <FormattedMessage id="verifikasi-p3ke" defaultMessage="Verifikasi P3KE" />, url: '/dashboard/verifikasi-p3ke' },
      { title: <FormattedMessage id="review" defaultMessage="Review" />, url: '/dashboard/verifikasi-p3ke/review' }
    ]
  };

  // Success
  return (
    <>
      <Page {...pageProps}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MainCard>
              <Alert severity="info" color="secondary" variant="outlined" sx={{ borderColor: 'secondary.main', marginBottom: 2 }}>
                <AlertTitle>Kabupaten/Kota: {fetchMonevById.data?.KabupatenKota.nama}</AlertTitle>
                <AlertTitle>Kecamatan: {fetchMonevById.data?.Kecamatan.nama}</AlertTitle>
                <AlertTitle>Desa/Kelurahan: {fetchMonevById.data?.Kelurahan.nama}</AlertTitle>
              </Alert>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormVerifikasiMonev initialData={fetchMonevById.data ?? []} readOnly />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormVerifikasiMonev initialData={fetchMonevById.data ?? []} />
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

ReviewMonevPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ReviewMonevPage;
