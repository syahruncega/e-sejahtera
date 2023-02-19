// material-ui
import { Alert, AlertTitle, CardContent, CircularProgress, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';
import { deleteProgram, getProgram } from 'store/slices/program';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/system';
import FormProgram from 'components/form/FormProgram';
import DeleteDialog from 'components/dialog/DeleteDialog';
import useDebounce from 'hooks/useDebounce';
import { useState, useMemo } from 'react';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';

const ProgramPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchProgram = useQuery(['program'], getProgram);

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
        header: 'ID Program'
      },
      {
        id: 'namaProgram',
        accessorKey: 'namaProgram',
        header: 'Nama Program'
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
            <FormProgram isEdit program={data} />
            <DeleteDialog id={data.id} deleteFunc={deleteProgram} mutationKey="program" />
          </Box>
        )
      }
    ],

    []
  );

  const pageProps = {
    title: 'Program',
    navigation: [
      {
        title: 'Program',
        url: '/kemiskinan/dashboard/master/program'
      }
    ]
  };

  if (fetchProgram.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchProgram.error.message}
        </Alert>
      </Page>
    );
  }

  return (
    <Page {...pageProps}>
      <MainCard>
        {fetchProgram.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!fetchProgram.isLoading && (
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
                  placeholder="Cari Program"
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
                <FormProgram />
              </Grid>
            </Grid>

            {/* table */}
            {!fetchProgram.isLoading && (
              <SubCard content={false}>
                <AppTable stickyHeader columns={columns} initialData={fetchProgram.data ?? []} globalFilter={debouncedValue} />
              </SubCard>
            )}
          </>
        )}
      </MainCard>
    </Page>
  );
};

ProgramPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProgramPage;
