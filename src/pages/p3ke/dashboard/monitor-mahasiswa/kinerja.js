// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import useGuard from 'hooks/useGuard';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertTitle, Box, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import MainCard from 'components/ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';
import SubCard from 'components/ui-component/cards/SubCard';
import AppTable from 'components/AppTable';
import { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import Link from 'Link';
import { getKinerjaMahasiswa } from 'store/slices/dosen';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const KinerjaMahasiswaPage = () => {
  useGuard(['dosen']);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchKinerjaMahasiswa = useQuery(['kinerjaMahasiswa'], () => getKinerjaMahasiswa({ kelurahanid: router.query?.kelurahanId }));

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'namaLengkap',
        accessorKey: 'namaLengkap',
        header: 'Nama'
      },
      {
        id: 'stambuk',
        accessorKey: 'user.username',
        header: 'Stambuk'
      },
      {
        id: 'jumlahKeluargaVerified',
        accessorKey: 'jumlahKeluargaVerified',
        header: 'Keluarga Diverifikasi'
      },
      {
        id: 'jumlahIndividuVerified',
        accessorKey: 'jumlahIndividuVerified',
        header: 'Individu Diverifikasi'
      }
      // {
      //   id: 'desaKelurahan',
      //   header: 'Desa / Kelurahan',
      //   cell: (value) => {
      //     const data = value.cell.row.original;
      //     return (
      //       <Typography
      //         component={Link}
      //         fontWeight={500}
      //         color="black"
      //         href={`/p3ke/dashboard/monitor-mahasiswa/mahasiswa?list${data.kelurahanId}`}
      //         sx={{ textDecoration: 'none' }}
      //       >
      //         {data.kelurahan.nama}
      //       </Typography>
      //     );
      //   }
      // }
    ],

    []
  );

  const pageProps = {
    title: 'Monitor Mahasiswa',
    navigation: [
      { title: 'Monitor Mahasiswa', url: '/p3ke/dashboard/monitor-mahasiswa' },
      { title: 'Kinerja Mahasiswa', url: router.asPath }
    ]
  };
  // Error
  if (fetchKinerjaMahasiswa.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchKinerjaMahasiswa.error.message}
        </Alert>
      </Page>
    );
  }

  return (
    <Page {...pageProps}>
      <MainCard>
        {fetchKinerjaMahasiswa.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!fetchKinerjaMahasiswa.isLoading && (
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
                  placeholder="Cari Mahasiswa"
                  value={search}
                  size="small"
                />
              </Grid>
            </Grid>

            <SubCard content={false}>
              {!fetchKinerjaMahasiswa.isLoading && (
                <AppTable
                  columns={columns}
                  globalFilter={debouncedValue}
                  initialData={fetchKinerjaMahasiswa.data || []}
                  disablePagination
                />
              )}
            </SubCard>
          </>
        )}
      </MainCard>
    </Page>
  );
};

KinerjaMahasiswaPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default KinerjaMahasiswaPage;
