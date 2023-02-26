// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Grid, InputAdornment, TextField } from '@mui/material';

// project imports
import SubCard from 'components/ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

import { useQuery } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { useMemo, useState } from 'react';
import { getKabupatenKota } from 'store/slices/detail-lokasi';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { deleteLokasiDosen, getLokasiDosenByDosenId } from 'store/slices/lokasi-dosen';
import FormLokasiDosen from './FormLokasiDosen';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from 'hooks/useDebounce';
import AppTable from 'components/AppTable';

// ==============================|| PROFILE 1 - CHANGE PASSWORD ||============================== //

const TabLokasiDosen = () => {
  const theme = useTheme();
  const { profil } = useAuth();
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchLokasiDosen = useQuery(['lokasiDosen'], () => getLokasiDosenByDosenId(profil?.id));
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
        cell: ({ row: { original: data } }) => (
          <Box sx={{ display: 'flex' }}>
            <FormLokasiDosen isEdit lokasiDosen={data} dataKabupatenKota={fetchKabupatenKota.data} />
            <DeleteDialog id={data.id} deleteFunc={deleteLokasiDosen} mutationKey="lokasiDosen" />
          </Box>
        )
      }
    ],

    [fetchKabupatenKota.data]
  );

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard title="Lokasi KKN">
          {fetchLokasiDosen.isLoading && (
            <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!fetchLokasiDosen.isLoading && (
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
                    placeholder="Cari Lokasi"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                  {/* product add & dialog */}
                  <FormLokasiDosen dataKabupatenKota={fetchKabupatenKota?.data} />
                </Grid>
              </Grid>

              {/* table */}

              {!fetchLokasiDosen.isLoading && (
                <SubCard content={false}>
                  <AppTable stickyHeader columns={columns} initialData={fetchLokasiDosen.data ?? []} globalFilter={debouncedValue} />
                </SubCard>
              )}
            </>
          )}
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default TabLokasiDosen;
