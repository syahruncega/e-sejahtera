// material-ui
import { Alert, AlertTitle, Grid } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';

// assets

import { FormattedMessage } from 'react-intl';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getKeluargaDonggalById, getKeluargaSigiById } from 'store/slices/keluarga';
import FormVerifikasiP3KE from 'components/form/FormVerifikasiP3KE';
import MainCard from 'components/ui-component/cards/MainCard';

const ReviewP3KEPage = () => {
  const router = useRouter();

  const fetchKeluagaById = useQuery(['keluargaById'], () =>
    router.query.keluarga === 'Donggala' ? getKeluargaDonggalById(router.query.id) : getKeluargaSigiById(router.query.id)
  );

  console.log(fetchKeluagaById.data);

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
                <AlertTitle>Kabupaten/Kota: {fetchKeluagaById.data?.KabupatenKota.nama}</AlertTitle>
                <AlertTitle>Kecamatan: {fetchKeluagaById.data?.Kecamatan.nama}</AlertTitle>
                <AlertTitle>Desa/Kelurahan: {fetchKeluagaById.data?.Kelurahan.nama}</AlertTitle>
              </Alert>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormVerifikasiP3KE initialData={fetchKeluagaById.data ?? []} readOnly />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormVerifikasiP3KE initialData={fetchKeluagaById.data ?? []} />
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

ReviewP3KEPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ReviewP3KEPage;