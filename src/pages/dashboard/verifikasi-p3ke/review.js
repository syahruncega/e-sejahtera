// material-ui
import { Alert, AlertTitle, Grid } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';

// assets

import { FormattedMessage } from 'react-intl';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import FormVerifikasiKeluarga from 'components/form/FormVerifikasiKeluarga';
import MainCard from 'components/ui-component/cards/MainCard';
import { getKeluargaById } from 'store/slices/keluarga';

const ReviewP3KEPage = () => {
  const router = useRouter();

  const fetchKeluagaById = useQuery(['keluargaById'], () => getKeluargaById(router.query.kabupaten, router.query.id));

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
                <AlertTitle>Kabupaten/Kota: {fetchKeluagaById.data?.kabupatenKota.nama}</AlertTitle>
                <AlertTitle>Kecamatan: {fetchKeluagaById.data?.kecamatan.nama}</AlertTitle>
                <AlertTitle>Desa/Kelurahan: {fetchKeluagaById.data?.kelurahan.nama}</AlertTitle>
              </Alert>
            </MainCard>
          </Grid>
          {/* <Grid item xs={12} lg={6}>
            <FormVerifikasiKeluarga initialData={fetchKeluagaById.data ?? []} readOnly />
          </Grid> */}
          <Grid item xs={12} lg={12}>
            <FormVerifikasiKeluarga initialData={fetchKeluagaById.data ?? []} />
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
