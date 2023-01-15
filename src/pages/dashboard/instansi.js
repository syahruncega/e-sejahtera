import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import {
  Alert,
  AlertTitle,
  Box,
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

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { deleteInstansi, getInstansi } from 'store/slices/instansi';
import FormInstansi from 'components/form/FormInstansi';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { useMemo, useState } from 'react';
import AppTable from 'components/AppTable';
import useDebounce from 'hooks/useDebounce';
import { getBidangUrusan } from 'store/slices/bidang-urusan';
import SubCard from 'components/ui-component/cards/SubCard';

const InstansiPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchInstansi = useQuery(['instansi'], getInstansi);
  const fetchBidangUrusan = useQuery(['bidangUrusan'], getBidangUrusan);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'namaInstansi',
        accessorKey: 'namaInstansi',
        header: 'Nama Instansi'
      },
      {
        id: 'bidangUrusan',
        accessorKey: 'bidangUrusan.namaBidangUrusan',
        header: 'Bidang Urusan'
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
            <FormInstansi isEdit instansi={data} dataBidangUrusan={fetchBidangUrusan.data} />
            <DeleteDialog id={data.id} deleteFunc={deleteInstansi} mutationKey="instansi" />
          </div>
        )
      }
    ],

    [fetchBidangUrusan.data]
  );

  const pageProps = {
    title: 'Instansi',
    navigation: [{ title: <FormattedMessage id="instansi" defaultMessage="Instansi" />, url: '/dashboard/instansi' }]
  };

  // Error
  if (fetchInstansi.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchInstansi.error.message}
        </Alert>
      </Page>
    );
  }

  // Success
  return (
    <>
      <Page {...pageProps}>
        <MainCard>
          {fetchInstansi.isLoading && (
            <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!fetchInstansi.isLoading && (
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
                    placeholder="Cari Instansi"
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
                  <FormInstansi dataBidangUrusan={fetchBidangUrusan.data} />
                </Grid>
              </Grid>

              {!fetchInstansi.isLoading && (
                <SubCard content={false}>
                  <AppTable stickyHeader columns={columns} initialData={fetchInstansi.data ?? []} globalFilter={debouncedValue} />
                </SubCard>
              )}
            </>
          )}
        </MainCard>
      </Page>
    </>
  );
};

InstansiPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default InstansiPage;
