import PropTypes from 'prop-types';
// material-ui
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';

// assets

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, fontWeight } from '@mui/system';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { PersonSearch, PersonSearchTwoTone, PublishedWithChangesTwoTone } from '@mui/icons-material';
import Link from 'Link';
import { getDesaKelurahan, getKabupatenKota, getKecamatan } from 'store/slices/detail-lokasi';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import { getKeluarga } from 'store/slices/keluarga';
import useGuard from 'hooks/useGuard';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import AppTablePagination from 'components/table/AppTablePagination';
import { LoadingButton } from '@mui/lab';
import { IconSearch } from '@tabler/icons';

const VerifikasiP3KEPage = () => {
  useGuard(['admin', 'mahasiswa']);
  const { user, profil } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(Number(router.query?.pageSize) || 25);
  const [page, setPage] = useState(Number(router.query?.page) || 1);
  const debouncedValue = useDebounce(search, 400);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);
  const [keyKecamatan, setKeyKecamatan] = useState(false);
  const [keyKelurahan, setKeyKelurahan] = useState(false);
  const [desaKelurahanValue, setDesaKelurahanValue] = useState(null);

  // const fetchKabupatenKota = useQuery(['kabupatenKota'], () => getKabupatenKota('72'));
  const fetchKeluarga = useQuery(
    ['keluarga', pageSize, page],
    () =>
      getKeluarga({
        kelurahanId: desaKelurahanValue?.id || profil?.kelurahanId,
        desilKesejahteraan: '1',
        pagerow: pageSize,
        halaman: page
      }),
    { keepPreviousData: true }
  );

  const fetchKabupatenKota = useQuery(['kabupatenKota'], () => getKabupatenKota('72'));

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1 + pageSize * (page - 1)}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'idKeluarga',
        accessorKey: 'idKeluarga',
        header: 'ID Keluarga'
      },
      {
        id: 'nik',
        accessorKey: 'nik',
        header: 'NIK'
      },
      {
        id: 'kepalaKeluarga',
        accessorKey: 'kepalaKeluarga',
        header: 'Kepala Keluarga'
      },
      {
        id: 'kelurahan',
        accessorKey: 'kelurahan.nama',
        header: 'Desa/Kelurahan'
      },
      {
        id: 'status',
        header: 'Status',
        cell: ({
          cell: {
            row: { original: data }
          }
        }) => (
          <div className="flex">
            {data.statusVerifikasi ? (
              <Chip
                variant="filled"
                label="Telah Diverifikasi"
                size="small"
                sx={{ color: 'white', fontWeight: '500', backgroundColor: 'success.dark' }}
              />
            ) : (
              <Chip
                variant="filled"
                label="Belum Diverifikasi"
                size="small"
                sx={{ color: 'white', fontWeight: '500', backgroundColor: 'warning.dark' }}
              />
            )}
          </div>
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
          <div className="flex">
            <Tooltip title="Lihat Anggota Keluarga">
              <IconButton
                LinkComponent={Link}
                color="primary"
                size="medium"
                aria-label="Ubah"
                href={`/p3ke/dashboard/verifikasi-p3ke/anggota-keluarga?idKeluarga=${data.idKeluarga}`}
              >
                <PersonSearchTwoTone fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],

    [pageSize, page]
  );

  const pageProps = {
    title: 'Verifikasi P3KE',
    navigation: [{ title: 'Verifikasi P3KE', url: '/p3ke/dashboard/verifikasi-p3ke' }]
  };

  // Error
  if (fetchKeluarga.isError || fetchKeluarga.isRefetchError) {
    return (
      <Page {...pageProps}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {fetchKeluarga.error.message}
        </Alert>
      </Page>
    );
  }

  // Success
  return (
    <>
      <Page {...pageProps}>
        <MainCard>
          {fetchKeluarga.isLoading && (
            <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!fetchKeluarga.isLoading && (
            <Grid container spacing={gridSpacing}>
              {user.role === 'admin' && (
                <Grid item xs={12}>
                  <SubCard title="Filter">
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                      <Grid item xs={12} lg={4}>
                        <InputLabel>Kabupaten/Kota</InputLabel>
                        <Autocomplete
                          name="kabupaten"
                          disableClearable
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          getOptionLabel={(option) => option.nama}
                          // value={kabupaten}
                          onChange={async (e, value) => {
                            if (value !== null) {
                              const kecamatan = await getKecamatan(value.id);
                              setDataKecamatan(kecamatan);
                              setKeyKecamatan(!keyKecamatan);
                              setKeyKelurahan(!keyKelurahan);
                            } else {
                              setDataKecamatan([]);
                              setDataKelurahan([]);
                            }
                          }}
                          options={fetchKabupatenKota.data || []}
                          sx={{ width: 'auto' }}
                          renderInput={(params) => <TextField placeholder="Pilih Kabupaten/Kota" fullWidth {...params} />}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <InputLabel>Kecamatan</InputLabel>
                        <Autocomplete
                          disablePortal
                          key={`kecamatan${keyKecamatan}`}
                          name="kecamatanId"
                          // value={kecamatanId}
                          disabled={!(dataKecamatan.length > 0)}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          getOptionLabel={(option) => option.nama}
                          onChange={async (e, value) => {
                            if (value !== null) {
                              const desaKelurahan = await getDesaKelurahan(value.id);
                              setDataKelurahan(desaKelurahan);

                              setKeyKelurahan(!keyKelurahan);
                            } else {
                              setKeyKelurahan([]);
                            }
                          }}
                          options={dataKecamatan || []}
                          renderInput={(params) => <TextField placeholder="Pilih Kecamatan" {...params} />}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <InputLabel>Desa/Kelurahan</InputLabel>
                        <Autocomplete
                          disablePortal
                          key={`kelurahan${keyKelurahan}`}
                          name="kelurahanId"
                          disabled={!(dataKelurahan.length > 0)}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          getOptionLabel={(option) => option.nama}
                          onChange={async (e, value) => {
                            setDesaKelurahanValue(value);
                          }}
                          options={dataKelurahan || []}
                          renderInput={(params) => <TextField placeholder="Pilih Desa/Kelurahan" {...params} />}
                        />
                      </Grid>
                      <Grid item xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton
                          variant="contained"
                          startIcon={<IconSearch size={18} />}
                          onClick={() => {
                            fetchKeluarga.refetch();
                          }}
                        >
                          Cari
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </SubCard>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari keluarga"
                  value={search}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <SubCard content={false}>
                  {!fetchKeluarga.isLoading && (
                    <>
                      <AppTable
                        columns={columns}
                        globalFilter={debouncedValue}
                        stickyHeader
                        initialData={fetchKeluarga.data.data || []}
                        disablePagination
                      />
                      <AppTablePagination
                        jumlahHalaman={fetchKeluarga.data.jumlahHalaman}
                        totalData={fetchKeluarga.data.totalData}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        page={page}
                        setPage={setPage}
                      />
                    </>
                  )}
                </SubCard>
              </Grid>
            </Grid>
          )}
        </MainCard>
      </Page>
    </>
  );
};

VerifikasiP3KEPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default VerifikasiP3KEPage;
