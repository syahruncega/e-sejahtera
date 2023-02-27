import PropTypes from 'prop-types';
import { FastForwardTwoTone } from '@mui/icons-material';
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import React, { Fragment, useMemo } from 'react';
import FormIndikatorSubKegiatan from 'components/form/Kemiskinan/FormIndikatorSubKegiatan';
import FormLokasiFokusBelanja from 'components/form/FormLokasiFokusBelanja';

const renderSubRowRencanaFokusBelanja = ({ row }) => <SubRowRencanaFokusBelanja row={row} />;

const SubRowRencanaFokusBelanja = ({ row }) => {
  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'kabupatenKota',
        accessorKey: 'kabupaten',
        header: 'Kabupaten / Kota'
      },
      {
        id: 'kecamatan',
        accessorKey: 'kecamatan',
        header: 'Kecamatan'
      },
      {
        id: 'desaKelurahan',
        accessorKey: 'desaKelurahan',
        header: 'Desa / Kelurahan'
      },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => (
          <Box sx={{ display: 'flex' }}>
            <Tooltip title="Program">
              <IconButton color="primary" size="medium" aria-label="Program" onClick={() => {}}>
                <FastForwardTwoTone fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    ],

    []
  );
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6}>
          <></>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <FormLokasiFokusBelanja />
        </Grid>
      </Grid>
      <SubCard content={false}>
        <AppTable stickyHeader columns={columns} initialData={[]} disablePagination />
      </SubCard>
    </>
  );
};

SubRowRencanaFokusBelanja.propTypes = {
  row: PropTypes.any
};

export default renderSubRowRencanaFokusBelanja;
