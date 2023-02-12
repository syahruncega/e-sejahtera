// material-ui
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Tooltip,
  useTheme
} from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';

// assets

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { getKeluargaByKabupatenKotaId } from 'store/slices/keluarga';
import { Box } from '@mui/system';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { AddCircleOutlineTwoTone, CheckCircleOutlineTwoTone } from '@mui/icons-material';
import Link from 'Link';
import { useRouter } from 'next/router';
import { getIndividuByIdKeluarga } from 'store/slices/individu';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import { getKeluargaByIdKeluarga } from 'store/slices/keluarga';
import useGuard from 'hooks/useGuard';

const AnggotaKeluargaPage = () => {
  useGuard(['admin', 'mahasiswa']);
  const theme = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchKeluargaByIdKeluarga = useQuery(['KeluargaByIdKeluarga'], () => getKeluargaByIdKeluarga(router.query.idKeluarga));
  const fetchAnggotaKeluarga = useQuery(['AnggotaKeluarga'], () => getIndividuByIdKeluarga(router.query.idKeluarga));

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'nik',
        accessorKey: 'nik',
        header: 'NIK'
      },
      {
        id: 'nama',
        accessorKey: 'nama',
        header: 'Nama'
      },
      {
        id: 'hubungan',
        accessorKey: 'hubungan',
        header: 'Status Hubungan'
      },
      {
        id: 'tanggalLahir',
        accessorFn: (row, index) => dayjs(row.tanggalLahir).format('DD MMM YYYY'),
        header: 'Tanggal Lahir'
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
            {data.statusVerifikasi ? (
              <Tooltip title="Telah Diverifikasi">
                <IconButton
                  LinkComponent={Link}
                  color="success"
                  size="medium"
                  aria-label="Ubah"
                  href={`/p3ke/dashboard/verifikasi-p3ke/anggota-keluarga/individu/update?idKeluarga=${data.idKeluarga}&id=${data.id}`}
                >
                  <CheckCircleOutlineTwoTone fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Verifikasi Individu">
                <IconButton
                  LinkComponent={Link}
                  color="primary"
                  size="medium"
                  aria-label="Ubah"
                  href={`/p3ke/dashboard/verifikasi-p3ke/anggota-keluarga/individu/create?idKeluarga=${data.idKeluarga}&id=${data.id}`}
                >
                  <AddCircleOutlineTwoTone fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        )
      }
    ],

    []
  );

  const pageProps = {
    title: 'Anggota Keluarga',
    navigation: [
      { title: 'Verifikasi P3KE', url: '/p3ke/dashboard/verifikasi-p3ke' },
      { title: 'Anggota Keluarga', url: router.asPath }
    ]
  };

  // Error
  if (fetchAnggotaKeluarga.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchAnggotaKeluarga.error.message}
        </Alert>
      </Page>
    );
  }

  // Success
  return (
    <>
      <Page {...pageProps}>
        <MainCard>
          {fetchAnggotaKeluarga.isLoading && (
            <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!fetchAnggotaKeluarga.isLoading && (
            <>
              <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari anggota keluarga"
                    value={search}
                    size="small"
                  />
                </Grid>
                {fetchKeluargaByIdKeluarga.data?.statusVerifikasi === 0 ? (
                  <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Button
                      LinkComponent={Link}
                      href={`/p3ke/dashboard/verifikasi-p3ke/anggota-keluarga/keluarga/create?&idKeluarga=${router.query.idKeluarga}`}
                      variant="contained"
                      startIcon={<AddCircleOutlineTwoTone />}
                    >
                      Verifikasi Keluarga
                    </Button>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Button
                      LinkComponent={Link}
                      href={`/p3ke/dashboard/verifikasi-p3ke/anggota-keluarga/keluarga/update?&idKeluarga=${router.query.idKeluarga}`}
                      variant="contained"
                      startIcon={<CheckCircleOutlineTwoTone />}
                      sx={{
                        background: theme.palette.success.dark,
                        '&:hover': { background: theme.palette.success.main }
                      }}
                    >
                      Ubah Verifikasi Keluarga
                    </Button>
                  </Grid>
                )}
              </Grid>

              <SubCard content={false}>
                {!fetchAnggotaKeluarga.isLoading && (
                  <AppTable
                    columns={columns}
                    globalFilter={debouncedValue}
                    initialData={fetchAnggotaKeluarga.data || []}
                    columnVisibility={{ aksi: fetchKeluargaByIdKeluarga.data?.statusVerifikasi || false }}
                  />
                )}
              </SubCard>
            </>
          )}
        </MainCard>
      </Page>
    </>
  );
};

AnggotaKeluargaPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AnggotaKeluargaPage;
