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

const KeluargaPage = () => {
  const router = useRouter();

  const fetchKeluargaByIdKeluarga = useQuery(['keluargaByIdKeluarga'], () =>
    getKeluargaByIdKeluarga(router.query.kabupatenKotaId, router.query.idKeluarga)
  );

  const pageProps = {
    title: 'Keluarga',
    navigation: [
      { title: 'Verifikasi P3KE', url: '/dashboard/verifikasi-p3ke' },
      {
        title: 'Anggota Keluarga',
        url: `/p3ke/dashboard/verifikasi-p3ke/anggota-keluarga?kabupatenKotaId=${router.query.kabupatenKotaId}&idKeluarga=${router.query.idKeluarga}`
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
            <FormVerifikasiKeluarga initialData={fetchKeluargaByIdKeluarga.data ?? []} />
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

KeluargaPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default KeluargaPage;
