import PropTypes from 'prop-types';
import { FastForwardTwoTone, PostAddTwoTone } from '@mui/icons-material';
import { Box, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { instansi, kegiatan, program, subKegiatan } from 'data';
import React, { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import FormInstansi from 'components/form/FormInstansi';
import FormProgram from 'components/form/Kemiskinan/FormProgram';

const renderSubComponent = ({ row }) => <>Hmm</>;

const TabRencanaSubKegiatan = ({ setValue }) => {
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
              <Tooltip title="Indikator Sub Kegiatan">
                <IconButton color="primary" size="medium" aria-label="Indikator Sub Kegiatan" onClick={row.getToggleExpandedHandler()}>
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
        id: 'kodeSubKegiatan',
        accessorKey: 'kodeSubKegiatan',
        header: 'Kode Sub Kegiatan'
      },
      //   {
      //     id: 'kodeInstansi',
      //     accessorKey: 'kodeInstansi',
      //     header: 'Kode Instansi'
      //   },
      {
        id: 'namaSubKegiatan',
        accessorKey: 'namaSubKegiatan',
        header: 'Nama Sub Kegiatan'
      },
      {
        id: 'paguSubKegiatan',
        accessorKey: 'paguSubKegiatan',
        header: 'Pagu Sub Kegiatan'
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
          initialData={subKegiatan}
          getRowCanExpand={() => true}
          renderSubComponent={renderSubComponent}
        />
      </SubCard>
    </>
  );
};

TabRencanaSubKegiatan.propTypes = {
  setValue: PropTypes.func
};

export default TabRencanaSubKegiatan;
