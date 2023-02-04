import Link from 'Link';

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
import { deleteSubKegiatan, getSubKegiatan } from 'store/slices/sub-kegiatan';

// assets

import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/system';
import FormSubKegiatan from 'components/form/FormSubKegiatan';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';

const SubKegiatanPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchSubKegiatan = useQuery(['subKegiatan'], getSubKegiatan);

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
        header: 'ID Sub Kegiatan'
      },
      {
        id: 'namaSubKegiatan',
        accessorKey: 'namaSubKegiatan',
        header: 'Sub Kegiatan'
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
            <FormSubKegiatan isEdit subKegiatan={data} />
            <DeleteDialog id={data.id} deleteFunc={deleteSubKegiatan} mutationKey="subKegiatan" />
          </Box>
        )
      }
    ],

    []
  );

  const pageProps = {
    title: 'Sub Kegiatan',
    navigation: [{ title: 'Sub Kegiatan', url: '/kemiskinan/dashboard/master/sub-kegiatan' }]
  };

  // Error
  if (fetchSubKegiatan.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchSubKegiatan.error.message}
        </Alert>
      </Page>
    );
  }

  // Success
  return (
    <Page {...pageProps}>
      <MainCard>
        {fetchSubKegiatan.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {!fetchSubKegiatan.isLoading && (
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
                  placeholder="Cari Sub Kegiatan"
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

                {/* product add & dialog */}
                <FormSubKegiatan />
              </Grid>
            </Grid>

            {/* table */}

            {!fetchSubKegiatan.isLoading && (
              <SubCard content={false}>
                <AppTable stickyHeader columns={columns} initialData={fetchSubKegiatan.data ?? []} globalFilter={debouncedValue} />
              </SubCard>
            )}
          </>
        )}
      </MainCard>
    </Page>
  );
};

SubKegiatanPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SubKegiatanPage;
