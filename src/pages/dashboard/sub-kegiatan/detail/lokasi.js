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
import { getKabupatenKota, getDetailLokasi, deleteDetailLokasi } from 'store/slices/detail-lokasi';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { getDetailSubKegiatanById } from 'store/slices/detail-sub-kegiatan';
import DeleteDialog from 'components/dialog/DeleteDialog';
import FormDetailLokasi from 'components/form/FormDetailLokasi';
import { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import AppTable from 'components/AppTable';

const headCells = [
  {
    id: 'kabupatenKota',
    numeric: false,
    label: 'Kabupaten / Kota',
    align: 'left'
  },
  {
    id: 'kecamatan',
    numeric: false,
    label: 'Kecamatan',
    align: 'left'
  },
  {
    id: 'desaKelurahan',
    numeric: false,
    label: 'Desa / Kelurahan',
    align: 'left'
  }
];

const LokasiDetailSubKegiatanPage = () => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const router = useRouter();

  const fetchDetailLokasi = useQuery(['detailLokasi'], () => getDetailLokasi({ params: router.query }));
  const fetchDetailSubKegiatan = useQuery(['detailSubKegiatanById'], () => getDetailSubKegiatanById(router.query.detailSubKegiatanId));
  const fetchKabupatenKota = useQuery(['kabupatenKota'], async () => getKabupatenKota('72'));

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'kabupatenKota',
        accessorKey: 'kabupatenKota.nama',
        header: 'Kabupaten / Kota'
      },
      {
        id: 'kecamatan',
        accessorKey: 'kecamatan.nama',
        header: 'Kecamatan'
      },
      {
        id: 'kelurahan',
        accessorKey: 'kelurahan.nama',
        header: 'Desa / Kelurahan'
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
            <FormDetailLokasi isEdit detailLokasi={data} dataKabupatenKota={fetchKabupatenKota.data} />
            <DeleteDialog id={data.id} deleteFunc={deleteDetailLokasi} mutationKey="detailLokasi" />
          </Box>
        )
      }
    ],

    [fetchKabupatenKota.data]
  );

  const pageProps = {
    title: 'Detail Lokasi',
    navigation: [
      {
        title: <FormattedMessage id="subKegiatan" defaultMessage="Sub Kegiatan" />,
        url: '/dashboard/sub-kegiatan'
      },
      {
        title: <FormattedMessage id="detailsubKegiatan" defaultMessage="Detail Sub Kegiatan" />,
        url: `/dashboard/sub-kegiatan/detail?sub_kegiatanId=${fetchDetailSubKegiatan.isLoading ? '' : fetchDetailSubKegiatan.data.id}`
      },
      {
        title: <FormattedMessage id="lokasiDetailSubKegiatan" defaultMessage="Detail Lokasi" />,
        url: router.asPath
      }
    ]
  };

  // Error
  if (fetchDetailLokasi.isError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchDetailLokasi.error.message}
        </Alert>
      </Page>
    );
  }

  return (
    <Page {...pageProps}>
      <MainCard content={false}>
        {fetchDetailLokasi.isLoading && (
          <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!fetchDetailLokasi.isLoading && (
          <>
            <Alert severity="info" color="secondary" variant="outlined" sx={{ borderColor: 'secondary.main', marginX: 3, marginTop: 2 }}>
              <AlertTitle>Fokus Belanja:</AlertTitle>
              {fetchDetailSubKegiatan.data?.fokusBelanja}
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
                    placeholder="Cari Lokasi"
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
                  <FormDetailLokasi dataKabupatenKota={fetchKabupatenKota?.data} />
                </Grid>
              </Grid>
            </CardContent>

            {/* table */}

            {!fetchDetailLokasi.isLoading && (
              <TableContainer>
                <AppTable columns={columns} initialData={fetchDetailLokasi.data ?? []} globalFilter={debouncedValue} />
              </TableContainer>
            )}
          </>
        )}
      </MainCard>
    </Page>
  );
};

LokasiDetailSubKegiatanPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default LokasiDetailSubKegiatanPage;
