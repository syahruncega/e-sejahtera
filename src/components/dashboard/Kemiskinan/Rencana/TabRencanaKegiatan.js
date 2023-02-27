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
import renderSubRowRencanaKegiatan from './SubRowRencanaKegiatan';
import Chip from 'components/ui-component/extended/Chip';
import FormKegiatan from 'components/form/Kemiskinan/FormKegiatan';

const TabRencanaKegiatan = ({ setValue }) => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);
  const columns = useMemo(
    () => [
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => (
          <Box sx={{ display: 'flex' }}>
            {row.getCanExpand() && (
              <Tooltip title="Indikator Kegiatan">
                <IconButton color="primary" size="medium" aria-label="Indikator Kegiatan" onClick={row.getToggleExpandedHandler()}>
                  <PostAddTwoTone fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Sub Kegiatan">
              <IconButton color="primary" size="medium" aria-label="Sub Kegiatan" onClick={() => setValue(3)}>
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
        accessorKey: 'kodeKegiatan',
        header: 'Kode Kegiatan'
      },
      //   {
      //     id: 'kodeInstansi',
      //     accessorKey: 'kodeInstansi',
      //     header: 'Kode Instansi'
      //   },
      {
        id: 'namaKegiatan',
        accessorKey: 'namaKegiatan',
        header: 'Nama Kegiatan'
      },
      {
        id: 'paguKegiatan',
        accessorKey: 'paguKegiatan',
        header: 'Pagu Kegiatan'
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
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>
                    <Chip chipcolor="warning" label="< Kembali" size="small" sx={{ cursor: 'pointer' }} onClick={() => setValue(1)} />
                  </TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH PROVINSI</TableCell>
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
          <FormKegiatan />
        </Grid>
      </Grid>
      <SubCard content={false}>
        <AppTable
          stickyHeader
          columns={columns}
          initialData={kegiatan}
          getRowCanExpand={() => true}
          renderSubComponent={renderSubRowRencanaKegiatan}
        />
      </SubCard>
    </>
  );
};

TabRencanaKegiatan.propTypes = {
  setValue: PropTypes.func
};

export default TabRencanaKegiatan;
