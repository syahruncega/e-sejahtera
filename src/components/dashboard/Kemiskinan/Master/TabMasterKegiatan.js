import PropTypes from 'prop-types';
import { FastForwardTwoTone, PostAddTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { kegiatan, program } from 'data';
import React, { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import Chip from 'components/ui-component/extended/Chip';
import FormKegiatan from 'components/form/Kemiskinan/FormKegiatan';
import { useQueries } from '@tanstack/react-query';
import { getInstansiById } from 'store/slices/instansi';
import { getProgramById } from 'store/slices/program';
import { deleteKegiatan, getKegiatan } from 'store/slices/kegiatan';
import DeleteDialog from 'components/dialog/DeleteDialog';
import { getProgramOnKegiatan, deleteProgramOnKegiatan } from 'store/slices/program-on-kegiatan';

const TabMasterKegiatan = ({ setValue, params, setParams }) => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchData = useQueries({
    queries: [
      { queryKey: ['instansi'], queryFn: () => getInstansiById(params.instansiId) },
      { queryKey: ['program'], queryFn: () => getProgramById(params.programId) },
      { queryKey: ['kegiatan'], queryFn: ({ signal }) => getProgramOnKegiatan({ signal, params: { programId: params.programId } }) }
    ]
  });

  const columns = useMemo(
    () => [
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => (
          <Box sx={{ display: 'flex' }}>
            <Tooltip title="Sub Kegiatan">
              <IconButton
                color="secondary"
                size="medium"
                aria-label="Sub Kegiatan"
                onClick={() => {
                  setParams({ kegiatanId: row.original.kegiatan.id, ...params });
                  setValue(3);
                }}
              >
                <FastForwardTwoTone fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )
      },
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'kodeKegiatan',
        accessorKey: 'kegiatan.kodeKegiatan',
        header: 'Kode Kegiatan'
      },
      {
        id: 'namaKegiatan',
        accessorKey: 'kegiatan.namaKegiatan',
        header: 'Nama Kegiatan'
      },
      {
        id: 'aksi2',
        header: 'Aksi',
        cell: ({ row: { original: data } }) => (
          <Box sx={{ display: 'flex' }}>
            <FormKegiatan isEdit kegiatan={data.kegiatan} programId={params.programId} />
            <DeleteDialog
              id={data.id}
              deleteFunc={() => Promise.all([deleteProgramOnKegiatan(data.id), deleteKegiatan(data.kegiatan.id)])}
              mutationKey="kegiatan"
            />
          </Box>
        )
      }
    ],

    [params, setParams, setValue]
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
            placeholder="Cari kegiatan"
            value={search}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <FormKegiatan programId={params.programId} />
        </Grid>
      </Grid>
      <SubCard content={false}>
        <AppTable stickyHeader columns={columns} initialData={fetchData[2].data || []} globalFilter={debouncedValue} />
      </SubCard>
    </>
  );
};

TabMasterKegiatan.propTypes = {
  setValue: PropTypes.func,
  params: PropTypes.object,
  setParams: PropTypes.func
};

export default TabMasterKegiatan;
