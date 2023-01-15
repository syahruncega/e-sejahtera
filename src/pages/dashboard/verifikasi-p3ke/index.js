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
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getKeluargaDonggala, getKeluargaSigi } from 'store/slices/keluarga';
import { Box } from '@mui/system';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { PublishedWithChangesTwoTone } from '@mui/icons-material';
import Link from 'Link';

const VerifikasiP3KEPage = () => {
  const [kabupaten, setKabupaten] = useState({ label: 'Donggala', value: 'Donggala' });

  const fetchKeluarga = useQuery(['keluarga'], kabupaten.value === 'Donggala' ? getKeluargaDonggala : getKeluargaSigi);

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
        accessorKey: 'Kecamatan.nama',
        header: 'Kecamatan'
      },
      {
        id: 'kelurahan',
        accessorKey: 'Kelurahan.nama',
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
                href={`/dashboard/verifikasi-p3ke/review?id=${data.id}&keluarga=${kabupaten.value}`}
              >
                <PublishedWithChangesTwoTone fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],

    []
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
                      <InputLabel>Kabupaten</InputLabel>
                      <Autocomplete
                        name="kabupaten"
                        disableClearable
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        value={kabupaten}
                        onChange={(e, value) => {
                          setKabupaten(value);
                        }}
                        options={[
                          { label: 'Donggala', value: 'Donggala' },
                          { label: 'Sigi', value: 'Sigi' }
                        ]}
                        sx={{ width: 'auto' }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <InputLabel>ID Keluarga</InputLabel>
                      <TextField fullWidth placeholder="Cari ID Keluarga" />
                      {/* <FormHelperText>Please enter your full name</FormHelperText> */}
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <InputLabel>NIK</InputLabel>
                      <TextField fullWidth placeholder="Cari NIK" />
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
                  {!fetchKeluarga.isLoading && <AppTable columns={columns} initialData={fetchKeluarga.data ?? []} />}
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
