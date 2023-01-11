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
import FormInstansi from 'components/form/FormInstansi';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { useMemo, useState } from 'react';
import AppTable from 'components/AppTable';
import useDebounce from 'hooks/useDebounce';
import { deleteBidangUrusan, getBidangUrusan } from 'store/slices/bidang-urusan';

const BidangUrusanPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchBidangUrusan = useQuery(['bidangUrusan'], getBidangUrusan);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'bidangUrusan',
        accessorKey: 'bidangUrusan',
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
            <FormInstansi isEdit instansi={data} />
            <DeleteDialog id={data.id} deleteFunc={deleteBidangUrusan} mutationKey="bidangUrusan" />
          </div>
        )
      }
    ],

    []
  );

  const pageProps = {
    title: 'Bidang Urusan',
    navigation: [{ title: <FormattedMessage id="bidangUrusan" defaultMessage="Bidang Urusan" />, url: '/dashboard/bidang-urusan' }]
  };

  // Error
  if (fetchBidangUrusan.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchBidangUrusan.error.message}
        </Alert>
      </Page>
    );
  }

  // Success
  return (
    <>
      <Page {...pageProps}>
        <MainCard content={false}>
          {fetchBidangUrusan.isLoading && (
            <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!fetchBidangUrusan.isLoading && (
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
                    <FormInstansi />
                  </Grid>
                </Grid>
              </CardContent>

              {!fetchBidangUrusan.isLoading && (
                <TableContainer>
                  <AppTable columns={columns} initialData={fetchBidangUrusan.data ?? []} globalFilter={debouncedValue} />
                </TableContainer>
              )}
            </>
          )}
        </MainCard>
      </Page>
    </>
  );
};

BidangUrusanPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default BidangUrusanPage;
