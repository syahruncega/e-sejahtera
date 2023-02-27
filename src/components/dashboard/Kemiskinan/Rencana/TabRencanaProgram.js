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
import { instansi, program } from 'data';
import React, { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import FormProgram from 'components/form/Kemiskinan/FormProgram';
import renderSubRowRencanaProgram from './SubRowRencanaProgram';
import Chip from 'components/ui-component/extended/Chip';
import { useQuery } from '@tanstack/react-query';
import { getProgram } from 'store/slices/program';

const TabRencanaProgram = ({ setValue, params, setParams }) => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchProgram = useQuery(['program'], getProgram);

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
              <IconButton color="secondary" size="medium" aria-label="Kegiatan" onClick={() => setValue(2)}>
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
        accessorKey: 'kodeProgram',
        header: 'Kode Program'
      },
      //   {
      //     id: 'kodeInstansi',
      //     accessorKey: 'kodeInstansi',
      //     header: 'Kode Instansi'
      //   },
      {
        id: 'namaProgram',
        accessorKey: 'namaProgram',
        header: 'Nama Program'
      },
      {
        id: 'paguProgram',
        accessorKey: 'paguProgram',
        header: 'Pagu Program'
      }
    ],

    [setValue]
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
                    <Chip chipcolor="warning" label="< Kembali" size="small" sx={{ cursor: 'pointer' }} onClick={() => setValue(0)} />
                  </TableCell>
                  <TableCell>Instansi</TableCell>
                  <TableCell>Dinas Pendidikan dan Kebudayaan Daerah Provinsi Sulawesi Tengah</TableCell>
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
          <FormProgram />
        </Grid>
      </Grid>
      <SubCard content={false}>
        <AppTable
          stickyHeader
          columns={columns}
          initialData={program}
          getRowCanExpand={() => true}
          renderSubComponent={renderSubRowRencanaProgram}
        />
      </SubCard>
    </>
  );
};

TabRencanaProgram.propTypes = {
  setValue: PropTypes.func,
  params: PropTypes.object,
  setParams: PropTypes.func
};

export default TabRencanaProgram;
