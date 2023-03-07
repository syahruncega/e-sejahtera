import PropTypes from 'prop-types';
import { Box, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import React, { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import Chip from 'components/ui-component/extended/Chip';
import FormSubKegiatan from 'components/form/Kemiskinan/FormSubKegiatan';
import { useQueries } from '@tanstack/react-query';
import { getInstansiById } from 'store/slices/kemiskinan/instansi';
import { getProgramById } from 'store/slices/kemiskinan/program';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { deleteKegiatanOnSubKegiatan, getKegiatanOnSubKegiatan } from 'store/slices/kemiskinan/kegiatan-on-sub-kegiatan';
import { deleteSubKegiatan } from 'store/slices/kemiskinan/sub-kegiatan';
import { getKegiatanById } from 'store/slices/kemiskinan/kegiatan';

const TabMasterSubKegiatan = ({ setValue, params, setParams }) => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchData = useQueries({
    queries: [
      { queryKey: ['instansi'], queryFn: () => getInstansiById(params.instansiId) },
      { queryKey: ['program'], queryFn: () => getProgramById(params.programId) },
      { queryKey: ['kegiatan'], queryFn: () => getKegiatanById(params.kegiatanId) },
      {
        queryKey: ['subKegiatan'],
        queryFn: ({ signal }) => getKegiatanOnSubKegiatan({ signal, params: { kegiatanId: params.kegiatanId } })
      }
    ]
  });

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'kodeSubKegiatan',
        accessorKey: 'subKegiatan.kodeSubKegiatan',
        header: 'Kode Sub Kegiatan'
      },
      {
        id: 'namaSubKegiatan',
        accessorKey: 'subKegiatan.namaSubKegiatan',
        header: 'Nama Sub Kegiatan'
      },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row: { original: data } }) => (
          <Box sx={{ display: 'flex' }}>
            <FormSubKegiatan isEdit subKegiatan={data.subKegiatan} kegiatanId={params.kegiatanId} />
            <DeleteDialog
              id={data.id}
              deleteFunc={() => Promise.all([deleteKegiatanOnSubKegiatan(data.id), deleteSubKegiatan(data.subKegiatan.id)])}
              mutationKey="subKegiatan"
            />
          </Box>
        )
      }
    ],

    [params]
  );
  return (
    <>
      <Grid container sx={{ marginBottom: 3 }}>
        <Grid item sm={12}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>
                    <Chip
                      chipcolor="warning"
                      label="< Kembali"
                      size="small"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        setParams({});
                        setValue(0);
                      }}
                    />
                  </TableCell>
                  <TableCell>Instansi</TableCell>
                  <TableCell>{fetchData[0].data?.namaInstansi}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>
                    <Chip
                      chipcolor="warning"
                      label="< Kembali"
                      size="small"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        setParams({ instansiId: params.instansiId });
                        setValue(1);
                      }}
                    />
                  </TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>{fetchData[1].data?.namaProgram}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>
                    <Chip
                      chipcolor="warning"
                      label="< Kembali"
                      size="small"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        setParams({ instansiId: params.instansiId, programId: params.programId });
                        setValue(2);
                      }}
                    />
                  </TableCell>
                  <TableCell>Kegiatan</TableCell>
                  <TableCell>{fetchData[2].data?.namaKegiatan}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
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
            placeholder="Cari sub kegiatan"
            value={search}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <FormSubKegiatan kegiatanId={params.kegiatanId} />
        </Grid>
      </Grid>
      <SubCard content={false}>
        <AppTable stickyHeader columns={columns} initialData={fetchData[3].data || []} globalFilter={debouncedValue} />
      </SubCard>
    </>
  );
};

TabMasterSubKegiatan.propTypes = {
  setValue: PropTypes.func,
  params: PropTypes.object,
  setParams: PropTypes.func
};

export default TabMasterSubKegiatan;
