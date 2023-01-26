// material-ui
import { Alert, AlertTitle, Autocomplete, CircularProgress, Grid, IconButton, InputLabel, TextField, Tooltip } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';

// assets

import { FormattedMessage } from 'react-intl';
import { LoadingButton } from '@mui/lab';
import { IconSearch } from '@tabler/icons';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getKeluargaByKabupatenKotaId } from 'store/slices/keluarga';
import { Box } from '@mui/system';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { PublishedWithChangesTwoTone } from '@mui/icons-material';
import Link from 'Link';
import { getDesaKelurahan, getKabupatenKota, getKecamatan } from 'store/slices/detail-lokasi';

const VerifikasiP3KEPage = () => {
  const [kabupaten, setKabupaten] = useState({ label: 'Kabupaten Donggala', nama: 'Kabupaten Donggala', id: '7205' });
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);
  const [keyKecamatan, setKeyKecamatan] = useState(false);
  const [keyKelurahan, setKeyKelurahan] = useState(false);

  const fetchKabupatenKota = useQuery(['kabupatenKota'], () => getKabupatenKota('72'));
  const fetchKeluarga = useQuery(['keluarga'], () => getKeluargaByKabupatenKotaId(kabupaten.id));

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'idKeluarga',
        accessorKey: 'idKeluarga',
        header: 'ID Keluarga'
      },
      {
        id: 'nik',
        accessorKey: 'nik',
        header: 'NIK'
      },
      {
        id: 'kepalaKeluarga',
        accessorKey: 'kepalaKeluarga',
        header: 'Kepala Keluarga'
      },
      {
        id: 'kecamatan',
        accessorKey: 'kecamatan.nama',
        header: 'Kecamatan'
      },
      {
        id: 'kelurahan',
        accessorKey: 'kelurahan.nama',
        header: 'Desa/Kelurahan'
      },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({
          cell: {
            row: { original: data }
          }
        }) => (
          <div className="flex">
            <Tooltip title="Verifikasi">
              <IconButton
                LinkComponent={Link}
                color="primary"
                size="medium"
                aria-label="Ubah"
                href={`/dashboard/verifikasi-p3ke/review?id=${data.id}&kabupaten=${kabupaten.id}`}
              >
                <PublishedWithChangesTwoTone fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],

    [kabupaten.id]
  );

  const pageProps = {
    title: 'Verifikasi P3KE',
    navigation: [{ title: <FormattedMessage id="verifikasi-p3ke" defaultMessage="Verifikasi P3KE" />, url: '/dashboard/verifikasi-p3ke' }]
  };

  // Error
  if (fetchKeluarga.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchKeluarga.error.message}
        </Alert>
      </Page>
    );
  }

  // Success
  return (
    <>
      <Page {...pageProps}>
        <MainCard>
          {fetchKeluarga.isLoading && (
            <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!fetchKeluarga.isLoading && (
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <SubCard title="Filter">
                  <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} lg={4}>
                      <InputLabel>Kabupaten/Kota</InputLabel>
                      <Autocomplete
                        name="kabupaten"
                        disableClearable
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.nama}
                        value={kabupaten}
                        onChange={async (e, value) => {
                          setKabupaten(value);
                          if (value !== null) {
                            const kecamatan = await getKecamatan(value.id);
                            setDataKecamatan(kecamatan);
                            setKeyKecamatan(!keyKecamatan);
                            setKeyKelurahan(!keyKelurahan);
                          } else {
                            setDataKecamatan([]);
                            setDataKelurahan([]);
                          }
                        }}
                        options={fetchKabupatenKota.data || []}
                        sx={{ width: 'auto' }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <InputLabel>Kecamatan</InputLabel>
                      <Autocomplete
                        disablePortal
                        key={`kecamatan${keyKecamatan}`}
                        name="kecamatanId"
                        // value={kecamatanId}
                        disabled={!(dataKecamatan.length > 0)}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.nama}
                        onChange={async (e, value) => {
                          if (value !== null) {
                            const desaKelurahan = await getDesaKelurahan(value.id);
                            setDataKelurahan(desaKelurahan);

                            setKeyKelurahan(!keyKelurahan);
                          } else {
                            setKeyKelurahan([]);
                          }
                        }}
                        options={dataKecamatan || []}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <InputLabel>Desa/Kelurahan</InputLabel>
                      <Autocomplete
                        disablePortal
                        key={`kelurahan${keyKelurahan}`}
                        name="kelurahanId"
                        // value={kelurahanId}
                        disabled={!(dataKelurahan.length > 0)}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.nama}
                        onChange={async (e, value) => {}}
                        options={dataKelurahan || []}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    {/* <Grid item xs={12} lg={4}>
                      <InputLabel>Nama</InputLabel>
                      <TextField type="password" fullWidth placeholder="Cara Nama" />
                    </Grid> */}
                    <Grid item xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <LoadingButton
                        variant="contained"
                        startIcon={<IconSearch size={18} />}
                        onClick={() => {
                          // queryClient.invalidateQueries(['keluarga']);
                          fetchKeluarga.refetch();
                        }}
                      >
                        Cari
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </SubCard>
              </Grid>
              <Grid item xs={12}>
                <SubCard content={false}>
                  {!fetchKeluarga.isLoading && <AppTable columns={columns} initialData={fetchKeluarga.data || []} />}
                </SubCard>
              </Grid>
            </Grid>
          )}
        </MainCard>
      </Page>
    </>
  );
};

VerifikasiP3KEPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default VerifikasiP3KEPage;
