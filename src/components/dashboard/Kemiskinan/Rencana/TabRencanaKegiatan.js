import PropTypes from 'prop-types';
import { FastForwardTwoTone, PostAddTwoTone } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { kegiatan, program } from 'data';
import React, { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import FormProgram from 'components/form/Kemiskinan/FormProgram';

const renderSubComponent = ({ row }) => <Button>Hmm</Button>;

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
          initialData={kegiatan}
          getRowCanExpand={() => true}
          renderSubComponent={renderSubComponent}
        />
      </SubCard>
    </>
  );
};

TabRencanaKegiatan.propTypes = {
  setValue: PropTypes.func
};

export default TabRencanaKegiatan;
