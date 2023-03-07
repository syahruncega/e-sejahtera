import PropTypes from 'prop-types';
import { FastForwardTwoTone, PostAddTwoTone } from '@mui/icons-material';
import { Box, CircularProgress, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import { instansi } from 'data';
import React, { useMemo, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import renderSubRowRencanaInstansi from './SubRowRencanaInstansi';
import FormInstansi from 'components/form/Kemiskinan/FormInstansi';
import { useQuery } from '@tanstack/react-query';
import { deleteInstansi, getInstansi } from 'store/slices/kemiskinan/instansi';
import MainCard from 'components/ui-component/cards/MainCard';
import DeleteDialog from 'components/dialog/DeleteDialog';

const TabRencanaInstansi = ({ setValue, setParams }) => {
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 400);

  const fetchInstansi = useQuery(['instansi'], getInstansi);

  const columns = useMemo(
    () => [
      {
        id: 'aksi1',
        header: '',
        cell: ({ row }) => (
          <Box sx={{ display: 'flex' }}>
            {/* {row.getCanExpand() && (
              <Tooltip title="Bidang Urusan">
                <IconButton color="secondary" size="medium" aria-label="Bidang Urusan" onClick={row.getToggleExpandedHandler()}>
                  <PostAddTwoTone fontSize="small" />
                </IconButton>
              </Tooltip>
            )} */}
            <Tooltip title="Program">
              <IconButton
                color="secondary"
                size="medium"
                aria-label="Program"
                onClick={() => {
                  setParams({ instansiId: row.original.id });
                  setValue(1);
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
        id: 'kodeInstansi',
        accessorKey: 'kodeInstansi',
        header: 'Kode Instansi'
      },
      {
        id: 'namaInstansi',
        accessorKey: 'namaInstansi',
        header: 'Nama Instansi'
      }
      // {
      //   id: 'aksi2',
      //   header: 'Aksi',
      //   cell: ({ row: { original: data } }) => (
      //     <Box sx={{ display: 'flex' }}>
      //       <FormInstansi isEdit instansi={data} />
      //       <DeleteDialog id={data.id} deleteFunc={deleteInstansi} mutationKey="instansi" />
      //     </Box>
      //   )
      // }
    ],

    [setValue, setParams]
  );
  return (
    <>
      {fetchInstansi.isLoading && (
        <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!fetchInstansi.isLoading && (
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
            {/* <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
              <FormInstansi />
            </Grid> */}
          </Grid>

          {!fetchInstansi.isLoading && (
            <SubCard content={false}>
              <AppTable
                stickyHeader
                columns={columns}
                initialData={fetchInstansi.data ?? []}
                globalFilter={debouncedValue}
                // getRowCanExpand={() => true}
                // renderSubComponent={renderSubRowRencanaInstansi}
              />
            </SubCard>
          )}
        </>
      )}
    </>
  );
};

TabRencanaInstansi.propTypes = {
  setValue: PropTypes.func,
  setParams: PropTypes.func
};

export default TabRencanaInstansi;
