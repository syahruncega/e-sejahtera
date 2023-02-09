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
import { getKeluargaByIdKeluarga } from 'store/slices/keluarga';
import { getKeluargaVerifikasiByIdKeluarga } from 'store/slices/keluarga-verifikasi';

const KeluargaUpdatePage = () => {
  const router = useRouter();

  const fetchKeluargaByIdKeluarga = useQuery(['keluargaByIdKeluarga'], () => getKeluargaByIdKeluarga(router.query.idKeluarga));
  const fetchKeluargaVerifikasiByIdKeluarga = useQuery(['keluargaVerifikasiByIdKeluarga'], () =>
    getKeluargaVerifikasiByIdKeluarga(router.query.idKeluarga)
  );

  const pageProps = {
    title: 'Keluarga',
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
      { title: 'Keluarga', url: router.asPath }
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
                <AlertTitle>Kabupaten/Kota: {fetchKeluargaByIdKeluarga.data?.kabupatenKota.nama}</AlertTitle>
                <AlertTitle>Kecamatan: {fetchKeluargaByIdKeluarga.data?.kecamatan.nama}</AlertTitle>
                <AlertTitle>Desa/Kelurahan: {fetchKeluargaByIdKeluarga.data?.kelurahan.nama}</AlertTitle>
              </Alert>
            </MainCard>
          </Grid>
          {/* <Grid item xs={12} lg={6}>
            <FormVerifikasiKeluarga initialData={fetchKeluargaByIdKeluarga.data ?? []} readOnly />
          </Grid> */}
          <Grid item xs={12} lg={12}>
            <FormVerifikasiKeluarga
              isEdit
              initialData={fetchKeluargaByIdKeluarga.data ?? {}}
              keluarga={fetchKeluargaVerifikasiByIdKeluarga.data ?? {}}
            />
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

KeluargaUpdatePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default KeluargaUpdatePage;
