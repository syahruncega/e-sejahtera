import PropTypes from 'prop-types';
import { FastForwardTwoTone, PostAddTwoTone } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip
} from '@mui/material';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import React, { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import renderSubRowRencanaProgram from './SubRowRencanaProgram';
import Chip from 'components/ui-component/extended/Chip';
import { useQueries } from '@tanstack/react-query';
import { getInstansiById } from 'store/slices/kemiskinan/instansi';
import { getInstansiOnProgram } from 'store/slices/kemiskinan/instansi-on-program';
import { deleteRencanaProgram, getRencanaProgram } from 'store/slices/kemiskinan/rencana-program';
import FormRencanaProgram from 'components/form/Kemiskinan/FormRencanaProgram';
import DeleteDialog from 'components/dialog/DeleteDialog';

const TabRencanaProgram = ({ setValue, params, setParams }) => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchData = useQueries({
    queries: [
      { queryKey: ['instansi'], queryFn: () => getInstansiById(params.instansiId) },
      { queryKey: ['program'], queryFn: ({ signal }) => getInstansiOnProgram({ signal, params: { instansiId: params.instansiId } }) },
      { queryKey: ['rencanaProgram'], queryFn: ({ signal }) => getRencanaProgram({ signal, params: { instansiId: params.instansiId } }) }
    ]
  });

  const columns = useMemo(
    () => [
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => (
          <Box sx={{ display: 'flex' }}>
            {row.getCanExpand() && (
              <Tooltip title="Indikator Program">
                <IconButton color="secondary" size="medium" aria-label="Indikator Program" onClick={row.getToggleExpandedHandler()}>
                  <PostAddTwoTone fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Kegiatan">
              <IconButton
                color="secondary"
                size="medium"
                aria-label="Kegiatan"
                onClick={() => {
                  setParams({ programId: row.original.program.id, ...params });
                  setValue(2);
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
        id: 'kodeProgram',
        accessorKey: 'program.kodeProgram',
        header: 'Kode Program'
      },
      {
        id: 'namaProgram',
        accessorKey: 'program.namaProgram',
        header: 'Nama Program'
      },
      {
        id: 'paguProgram',
        accessorKey: 'paguProgram',
        header: 'Pagu Program'
      },
      {
        id: 'aksi2',
        header: 'Aksi',
        cell: ({ row: { original: data } }) => (
          <Box sx={{ display: 'flex' }}>
            <FormRencanaProgram isEdit rencanaProgram={data} instansiId={params.instansiId} dataProgram={fetchData[1].data || []} />
            <DeleteDialog id={data.id} deleteFunc={deleteRencanaProgram} mutationKey="rencanaProgram" />
          </Box>
        )
      }
    ],

    [setValue, params, setParams, fetchData]
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
                  <TableCell>{fetchData[0].data.namaInstansi || '-'}</TableCell>
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
            placeholder="Cari program"
            value={search}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <FormRencanaProgram instansiId={params.instansiId} dataProgram={fetchData[1]?.data || []} />
        </Grid>
      </Grid>
      {/* <SubCard content={false}>
        <AppTable
          stickyHeader
          columns={columns}
          initialData={fetchData[2].data || []}
          getRowCanExpand={() => true}
          renderSubComponent={renderSubRowRencanaProgram}
        />
      </SubCard> */}
    </>
  );
};

TabRencanaProgram.propTypes = {
  setValue: PropTypes.func,
  params: PropTypes.object,
  setParams: PropTypes.func
};

export default TabRencanaProgram;
