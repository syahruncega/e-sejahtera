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
import { deleteProgram, getProgram } from 'store/slices/program';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { SyncOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import FormProgram from 'components/form/FormProgram';
import { getInstansi } from 'store/slices/instansi';
import DeleteDialog from 'components/dialog/DeleteDialog';
import useDebounce from 'hooks/useDebounce';
import { useState, useMemo } from 'react';
import AppTable from 'components/AppTable';

const ProgramPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchProgram = useQuery(['program'], getProgram);
  const fetchInstansi = useQuery(['instansi'], getInstansi);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'namaInstansi',
        accessorKey: 'instansi.namaInstansi',
        header: 'Nama Instansi'
      },
      {
        id: 'sasaran',
        accessorKey: 'sasaran',
        header: 'Sasaran'
      },
      {
        id: 'indikatorSasaran',
        accessorKey: 'indikatorSasaran',
        header: 'Indikator Sasaran'
      },
      {
        id: 'kebijakan',
        accessorKey: 'kebijakan',
        header: 'Kebijakan'
      },
      {
        id: 'namaProgram',
        accessorKey: 'namaProgram',
        header: 'Nama Program'
      },
      {
        id: 'indikatorKinerjaProgram',
        accessorKey: 'indikatorKinerjaProgram',
        header: 'Indikator Kinerja'
      },
      {
        id: 'paguProgram',
        accessorKey: 'paguProgram',
        accessorFn: (row) => `Rp${String(row.paguProgram).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
        header: 'Pagu'
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
            <FormProgram isEdit program={data} dataInstansi={fetchInstansi.data} />
            <DeleteDialog id={data.id} deleteFunc={deleteProgram} mutationKey="program" />
          </Box>
        )
      }
    ],

    [fetchInstansi.data]
  );

  const pageProps = {
    title: 'Program',
    navigation: [
      {
        title: <FormattedMessage id="program" defaultMessage="Program" />,
        url: '/dashboard/program'
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
      <MainCard content={false}>
        {fetchProgram.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!fetchProgram.isLoading && (
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
                  <FormProgram dataInstansi={fetchInstansi.data} />
                </Grid>
              </Grid>
            </CardContent>
            {/* table */}
            {!fetchProgram.isLoading && (
              <AppTable stickyHeader columns={columns} initialData={fetchProgram.data ?? []} globalFilter={debouncedValue} />
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
