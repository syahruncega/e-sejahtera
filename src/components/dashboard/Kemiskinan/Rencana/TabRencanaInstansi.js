import PropTypes from 'prop-types';
import { FastForwardTwoTone } from '@mui/icons-material';
import { Box, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { instansi } from 'data';
import React, { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import FormInstansi from 'components/form/FormInstansi';

const TabRencanaInstansi = ({ setValue }) => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);
  const columns = useMemo(
    () => [
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => (
          <Box sx={{ display: 'flex' }}>
            <Tooltip title="Program">
              <IconButton color="primary" size="medium" aria-label="Program" onClick={() => setValue(1)}>
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
        id: 'kodeBidangUrusan',
        accessorKey: 'kodeBidangUrusan',
        header: 'Kode Bidang Urusan'
      },
      {
        id: 'kodeInstansi',
        accessorKey: 'kodeInstansi',
        header: 'Kode Instansi'
      },
      {
        id: 'namaInstansi',
        accessorKey: 'namaInstansi',
        header: 'Nama Instansi'
      }
    ],

    [setValue]
  );
  return (
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
            placeholder="Cari instansi"
            value={search}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <FormInstansi />
        </Grid>
      </Grid>
      <SubCard content={false}>
        <AppTable stickyHeader columns={columns} initialData={instansi} />
      </SubCard>
    </>
  );
};

TabRencanaInstansi.propTypes = {
  setValue: PropTypes.func
};

export default TabRencanaInstansi;
