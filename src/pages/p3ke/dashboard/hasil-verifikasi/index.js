// material-ui
import {
  Alert,
  AlertTitle,
  Autocomplete,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Tooltip
} from '@mui/material';

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
import { Box } from '@mui/system';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { PersonSearch, PersonSearchTwoTone, PublishedWithChangesTwoTone } from '@mui/icons-material';
import Link from 'Link';
import { getDesaKelurahan, getKabupatenKota, getKecamatan } from 'store/slices/detail-lokasi';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import { getKeluarga } from 'store/slices/keluarga';

const VerifikasiP3KEPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);
  const fetchKeluarga = useQuery(['keluargaVerifikasi'], () => getKeluarga({ kelurahanId: '7205080013', statusVerifikasi: 1 }));

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
            <Tooltip title="Lihat Anggota Keluarga">
              <IconButton
                LinkComponent={Link}
                color="primary"
                size="medium"
                aria-label="Ubah"
                href={`/p3ke/dashboard/hasil-verifikasi/anggota-keluarga?idKeluarga=${data.idKeluarga}`}
              >
                <PersonSearchTwoTone fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],

    []
  );

  const pageProps = {
    title: 'Hasil Verifikasi',
    navigation: [{ title: 'Hasil Verifikasi', url: '/p3ke/dashboard/hasil-verifikasi' }]
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
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari keluarga"
                  value={search}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <SubCard content={false}>
                  {!fetchKeluarga.isLoading && (
                    <AppTable columns={columns} globalFilter={debouncedValue} stickyHeader initialData={fetchKeluarga.data || []} />
                  )}
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
