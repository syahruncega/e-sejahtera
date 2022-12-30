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
import { deleteDetailSubKegiatan, getDetailSubKegiatan } from 'store/slices/detail-sub-kegiatan';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'Link';
import AddIcon from '@mui/icons-material/AddTwoTone';
import FormDetailSubKegiatan from 'components/form/FormDetailSubKegiatan';
import { getSubKegiatanById } from 'store/slices/sub-kegiatan';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import AppTable from 'components/AppTable';

const DetailSubKegiatanPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const router = useRouter();

  const fetchSubKegiatanById = useQuery(['subKegiatanById'], () => getSubKegiatanById(router.query.subKegiatanId));
  const fetchDetailSubKegiatan = useQuery(['detailSubKegiatan'], getDetailSubKegiatan);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'fokusBelanja',
        accessorKey: 'fokusBelanja',
        header: 'Fokus Belanja'
      },
      {
        id: 'indikator',
        accessorKey: 'indikator',
        header: 'Indikator'
      },
      {
        id: 'target',
        accessorKey: 'target',
        accessorFn: (row) => `${String(row.target).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
        header: 'Target'
      },
      {
        id: 'satuan',
        accessorKey: 'satuan',
        header: 'Satuan'
      },
      {
        id: 'paguFokusBelanja',
        accessorKey: 'paguFokusBelanja',
        accessorFn: (row) => `Rp${String(row.paguFokusBelanja).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
        header: 'Pagu'
      },
      {
        id: 'lokasi',
        header: 'Lokasi',
        cell: ({
          cell: {
            row: { original: data }
          }
        }) => (
          <Tooltip title="Tambah Lokasi">
            <IconButton
              aria-label="delete"
              size="small"
              LinkComponent={Link}
              href={`/dashboard/sub-kegiatan/detail/lokasi?detailSubKegiatanId=${data.id}`}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )
      },
      {
        id: 'keterangan',
        accessorKey: 'keterangan',
        header: 'Keterangan'
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
            <FormDetailSubKegiatan isEdit detailSubKegiatan={data} />
            <DeleteDialog id={data.id} deleteFunc={deleteDetailSubKegiatan} mutationKey="detailSubKegiatan" />
          </Box>
        )
      }
    ],

    []
  );

  const pageProps = {
    title: 'Detail Sub Kegiatan',
    navigation: [
      {
        title: <FormattedMessage id="subKegiatan" defaultMessage="Sub Kegiatan" />,
        url: '/dashboard/sub-detailSubKegiatan'
      },
      {
        title: <FormattedMessage id="detailSubKegiatan" defaultMessage="Detail Sub Kegiatan" />,
        url: router.asPath
      }
    ]
  };

  // Error
  if (fetchDetailSubKegiatan.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchDetailSubKegiatan.error.message}
        </Alert>
      </Page>
    );
  }

  return (
    <Page {...pageProps}>
      <MainCard content={false}>
        {fetchDetailSubKegiatan.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {!fetchDetailSubKegiatan.isLoading && (
          <>
            <Alert severity="info" color="secondary" variant="outlined" sx={{ borderColor: 'secondary.main', marginX: 3, marginTop: 2 }}>
              <AlertTitle>Sub Kegiatan:</AlertTitle>
              {fetchSubKegiatanById.data?.namaSubKegiatan || ''}
            </Alert>
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
                    placeholder="Cari Detail Sub Kegiatan"
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
                  <FormDetailSubKegiatan />
                </Grid>
              </Grid>
            </CardContent>

            {/* table */}
            {!fetchDetailSubKegiatan.isLoading && (
              <TableContainer>
                <AppTable columns={columns} initialData={fetchDetailSubKegiatan.data ?? []} globalFilter={debouncedValue} />
              </TableContainer>
            )}
          </>
        )}
      </MainCard>
    </Page>
  );
};

DetailSubKegiatanPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DetailSubKegiatanPage;
