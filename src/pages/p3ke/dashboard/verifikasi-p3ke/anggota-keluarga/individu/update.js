// material-ui
import { Alert, AlertTitle, Grid } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';

// assets

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import MainCard from 'components/ui-component/cards/MainCard';

import { getIndividuById } from 'store/slices/individu';
import FormVerifikasiIndividu from 'components/form/FormVerifikasiIndividu';

const IndividuUpdatePage = () => {
  const router = useRouter();

  const fetchIndividuById = useQuery(['individuById'], () => getIndividuById(router.query.id));

  const pageProps = {
    title: 'Review',
    navigation: [
      {
        title: router.pathname.includes('verifikasi-p3ke') ? 'Verifikasi P3KE' : 'Hasil Verifikasi',
        url: router.pathname.includes('verifikasi-p3ke') ? '/p3ke/dashboard/verifikasi-p3ke' : '/p3ke/dashboard/hasil-verifikasi'
      },
      {
        title: 'Anggota Keluarga',
        url: `/p3ke/dashboard/${
          router.pathname.includes('verifikasi-p3ke') ? 'verifikasi-p3ke' : 'hasil-verifikasi'
        }/anggota-keluarga?idKeluarga=${router.query.idKeluarga}`
      },
      { title: 'Individu', url: router.asPath }
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
                <AlertTitle>Kabupaten/Kota: {fetchIndividuById.data?.kabupatenKota.nama}</AlertTitle>
                <AlertTitle>Kecamatan: {fetchIndividuById.data?.kecamatan.nama}</AlertTitle>
                <AlertTitle>Desa/Kelurahan: {fetchIndividuById.data?.kelurahan.nama}</AlertTitle>
              </Alert>
            </MainCard>
          </Grid>
          {/* <Grid item xs={12} lg={6}>
            <FormVerifikasiKeluarga initialData={fetchIndividuById.data ?? []} readOnly />
          </Grid> */}
          <Grid item xs={12} lg={12}>
            <FormVerifikasiIndividu initialData={fetchIndividuById.data ?? {}} />
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

IndividuUpdatePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default IndividuUpdatePage;
