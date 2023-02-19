// material-ui
import {
  Alert,
  AlertTitle,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TableContainer,
  TextField,
  Tooltip
} from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';
import { deleteKegiatan, getKegiatan } from 'store/slices/kegiatan';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { SyncOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import FormKegiatan from 'components/form/FormKegiatan';
import { getProgram } from 'store/slices/program';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { useState, useMemo } from 'react';
import useDebounce from 'hooks/useDebounce';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';

const KegiatanPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchKegiatan = useQuery(['kegiatan'], getKegiatan);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'id',
        accessorKey: 'id',
        header: 'ID Kegiatan'
      },
      {
        id: 'namaKegiatan',
        accessorKey: 'namaKegiatan',
        header: 'Nama Kegiatan'
      },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({
          cell: {
            row: { original: data }
          }
        }) => (
          <Box sx={{ display: 'flex' }}>
            <FormKegiatan isEdit kegiatan={data} />
            <DeleteDialog id={data.id} deleteFunc={deleteKegiatan} mutationKey="kegiatan" />
          </Box>
        )
      }
    ],

    []
  );

  const pageProps = {
    title: 'Kegiatan',
    navigation: [
      {
        title: 'Kegiatan',
        url: '/kemiskinan/dashboard/master/kegiatan'
      }
    ]
  };

  // Error
  if (fetchKegiatan.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchKegiatan.error.message}
        </Alert>
      </Page>
    );
  }

  // Success
  return (
    <Page {...pageProps}>
      <MainCard>
        {fetchKegiatan.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!fetchKegiatan.isLoading && (
          <>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2} mb={3}>
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
                  placeholder="Cari Kegiatan"
                  value={search}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                <Tooltip title="Copy">
                  <IconButton size="large">
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Print">
                  <IconButton size="large">
                    <PrintIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Filter">
                  <IconButton size="large">
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>

                {/* Create Kegiatan Form */}
                <FormKegiatan />
              </Grid>
            </Grid>

            {/* table */}

            {!fetchKegiatan.isLoading && (
              <SubCard content={false}>
                <AppTable stickyHeader columns={columns} initialData={fetchKegiatan.data ?? []} globalFilter={debouncedValue} />
              </SubCard>
            )}
          </>
        )}
      </MainCard>
    </Page>
  );
};

KegiatanPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default KegiatanPage;
