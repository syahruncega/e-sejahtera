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
import { subKegiatan } from 'data';
import React, { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import Chip from 'components/ui-component/extended/Chip';
import FormFokusBelanja from 'components/form/Kemiskinan/FormFokusBelanja';
import renderSubRowRencanaFokusBelanja from './SubRowRencanaFokusBelanja';

const TabRencanaFokusBelanja = ({ setValue }) => {
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
              <Tooltip title="Lokasi">
                <IconButton color="primary" size="medium" aria-label="Lokasi" onClick={row.getToggleExpandedHandler()}>
                  <PostAddTwoTone fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Fokus Belanja">
              <IconButton color="primary" size="medium" aria-label="Fokus Belanja" onClick={() => setValue(4)}>
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
        header: 'Target'
      },
      {
        id: 'satuan',
        accessorKey: 'satuan',
        header: 'Satuan'
      },
      {
        id: 'pagu',
        accessorKey: 'pagu',
        header: 'Pagu'
      },
      {
        id: 'keterangan',
        accessorKey: 'keterangan',
        header: 'Keterangan'
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
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>
                    <Chip chipcolor="warning" label="< Kembali" size="small" sx={{ cursor: 'pointer' }} onClick={() => setValue(2)} />
                  </TableCell>
                  <TableCell>Kegiatan</TableCell>
                  <TableCell>Perencanaan, Penganggaran, dan Evaluasi Kinerja Perangkat Daerah</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>
                    <Chip chipcolor="warning" label="< Kembali" size="small" sx={{ cursor: 'pointer' }} onClick={() => setValue(3)} />
                  </TableCell>
                  <TableCell>Sub Kegiatan</TableCell>
                  <TableCell>Penyusunan Dokumen Perencanaan Perangkat Daerah</TableCell>
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
            placeholder="Cari fokus belanja"
            value={search}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <FormFokusBelanja />
        </Grid>
      </Grid>
      <SubCard content={false}>
        <AppTable
          stickyHeader
          columns={columns}
          initialData={subKegiatan}
          getRowCanExpand={() => true}
          renderSubComponent={renderSubRowRencanaFokusBelanja}
        />
      </SubCard>
    </>
  );
};

TabRencanaFokusBelanja.propTypes = {
  setValue: PropTypes.func
};

export default TabRencanaFokusBelanja;
