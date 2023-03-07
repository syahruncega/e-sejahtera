// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { deleteBidangUrusan, getBidangUrusan } from 'store/slices/kemiskinan/bidang-urusan';
import FormBidangUrusan from 'components/form/Kemiskinan/FormBidangUrusan';
import { Alert, AlertTitle, Box, CircularProgress, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import DeleteDialog from 'components/dialog/DeleteDialog';
import MainCard from 'components/ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import SubCard from 'components/ui-component/cards/SubCard';
import AppTable from 'components/AppTable';

// ==============================|| DEFAULT DASHBOARD ||============================== //

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
        id: 'kodeBidangUrusan',
        accessorKey: 'kodeBidangUrusan',
        header: 'Kode Bidang Urusan'
      },
      {
        id: 'namaBidangUrusan',
        accessorKey: 'namaBidangUrusan',
        header: 'Nama Bidang Urusan'
      },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row: { original: data } }) => (
          <Box sx={{ display: 'flex' }}>
            <FormBidangUrusan isEdit bidangUrusan={data} />
            <DeleteDialog id={data.id} deleteFunc={deleteBidangUrusan} mutationKey="bidangUrusan" />
          </Box>
        )
      }
    ],

    []
  );

  const pageProps = {
    title: 'Bidang Urusan',
    navigation: [
      {
        title: 'Bidang Urusan',
        url: '/kemiskinan/dashboard/bidang-urusan'
      }
    ]
  };

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

  return (
    <Page {...pageProps}>
      <MainCard>
        {fetchBidangUrusan.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!fetchBidangUrusan.isLoading && (
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
                  placeholder="Cari bidang urusan"
                  value={search}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                <Tooltip title="Filter">
                  <IconButton size="large">
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>

                <FormBidangUrusan />
              </Grid>
            </Grid>

            {/* table */}
            {!fetchBidangUrusan.isLoading && (
              <SubCard content={false}>
                <AppTable stickyHeader columns={columns} initialData={fetchBidangUrusan.data ?? []} globalFilter={debouncedValue} />
              </SubCard>
            )}
          </>
        )}
      </MainCard>
    </Page>
  );
};

BidangUrusanPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default BidangUrusanPage;
