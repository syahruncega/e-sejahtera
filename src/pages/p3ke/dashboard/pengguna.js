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
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';
import { FormattedMessage } from 'react-intl';
import SearchIcon from '@mui/icons-material/Search';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import FormUser from 'components/form/FormUser';
import { useQuery } from '@tanstack/react-query';
import { deleteUser, getUser } from 'store/slices/user';
import DeleteDialog from 'components/dialog/DeleteDialog';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';

// ==============================|| SAMPLE PAGE ||============================== //

const PenggunaPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchUser = useQuery(['user'], getUser);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'username',
        accessorKey: 'username',
        header: 'Username'
      },
      {
        id: 'email',
        accessorKey: 'email',
        header: 'Email'
      },
      {
        id: 'noHp',
        accessorKey: 'noHp',
        header: 'Nomor HP'
      },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row: { original: data } }) => (
          <Box sx={{ display: 'flex' }}>
            <FormUser isEdit user={data} />
            <DeleteDialog id={data.id} deleteFunc={deleteUser} mutationKey="user" />
          </Box>
        )
      }
    ],

    []
  );

  const pageProps = {
    title: 'Pengguna',
    navigation: [
      {
        title: 'Pengguna',
        url: '/dashboard/pengguna'
      }
    ]
  };

  if (fetchUser.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchUser.error.message}
        </Alert>
      </Page>
    );
  }

  return (
    <Page {...pageProps}>
      <MainCard>
        {fetchUser.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!fetchUser.isLoading && (
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
                  placeholder="Cari pengguna"
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

                <FormUser />
              </Grid>
            </Grid>

            {/* table */}
            {!fetchUser.isLoading && (
              <SubCard content={false}>
                <AppTable stickyHeader columns={columns} initialData={fetchUser.data ?? []} globalFilter={debouncedValue} />
              </SubCard>
            )}
          </>
        )}
      </MainCard>
    </Page>
  );
};

PenggunaPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default PenggunaPage;
