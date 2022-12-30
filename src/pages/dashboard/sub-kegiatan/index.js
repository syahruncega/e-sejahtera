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
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { SyncOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import FormSubKegiatan from 'components/form/FormSubKegiatan';
import AddIcon from '@mui/icons-material/AddTwoTone';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { getKegiatan } from 'store/slices/kegiatan';
import { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import AppTable from 'components/AppTable';

const SubKegiatanPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchSubKegiatan = useQuery(['subKegiatan'], getSubKegiatan);
  const fetchKegiatan = useQuery(['kegiatan'], getKegiatan);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'namaKegiatan',
        accessorKey: 'kegiatan.namaKegiatan',
        header: 'Kegiatan'
      },
      {
        id: 'namaSubKegiatan',
        accessorKey: 'namaSubKegiatan',
        header: 'Sub Kegiatan'
      },
      {
        id: 'indikatorKinerjaSubKegiatan',
        accessorKey: 'indikatorKinerjaSubKegiatan',
        header: 'Indikator Kinerja'
      },
      {
        id: 'paguSubKegiatan',
        accessorKey: 'paguSubKegiatan',
        accessorFn: (row) => `Rp${String(row.paguSubKegiatan).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
        header: 'Pagu'
      },
      {
        id: 'detail',
        header: 'Detail',
        cell: ({
          cell: {
            row: { original: data }
          }
        }) => (
          <Tooltip title="Detail Sub Kegiatan">
            <IconButton LinkComponent={Link} href={`/dashboard/sub-kegiatan/detail?subKegiatanId=${data.id}`} size="medium">
              <AddIcon fontSize="small" aria-controls="menu-popular-card-1" aria-haspopup="true" sx={{ color: 'grey.500' }} />
            </IconButton>
          </Tooltip>
        )
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
            <Tooltip title="Update Pagu">
              <IconButton onClick={() => {}} size="medium">
                <SyncOutlined fontSize="small" aria-controls="menu-popular-card-1" aria-haspopup="true" sx={{ color: 'grey.500' }} />
              </IconButton>
            </Tooltip>
            <FormSubKegiatan isEdit subKegiatan={data} dataKegiatan={fetchKegiatan.data} />
            <DeleteDialog id={data.id} deleteFunc={deleteSubKegiatan} mutationKey="subKegiatan" />
          </Box>
        )
      }
    ],

    [fetchKegiatan.data]
  );

  const pageProps = {
    title: 'Sub Kegiatan',
    navigation: [{ title: <FormattedMessage id="subKegiatan" defaultMessage="Sub Kegiatan" />, url: '/dashboard/sub-kegiatan' }]
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
      <MainCard content={false}>
        {fetchSubKegiatan.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {!fetchSubKegiatan.isLoading && (
          <>
            <CardContent>
              <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
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
                  <FormSubKegiatan dataKegiatan={fetchKegiatan.data} />
                </Grid>
              </Grid>
            </CardContent>

            {/* table */}

            {!fetchSubKegiatan.isLoading && (
              <TableContainer>
                <AppTable columns={columns} initialData={fetchSubKegiatan.data ?? []} globalFilter={debouncedValue} />
              </TableContainer>
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
