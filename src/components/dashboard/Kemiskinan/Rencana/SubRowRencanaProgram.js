import PropTypes from 'prop-types';
import { FastForwardTwoTone } from '@mui/icons-material';
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import AppTable from 'components/AppTable';
import SubCard from 'components/ui-component/cards/SubCard';
import React, { Fragment, useMemo, useState } from 'react';
import FormIndikatorProgram from 'components/form/Kemiskinan/FormIndikatorProgram';

const renderSubRowRencanaProgram = ({ row }) => <SubRowRencanaProgram row={row} />;

const SubRowRencanaProgram = ({ row }) => {
  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'indikator',
        accessorKey: 'indikator',
        header: 'Indikator'
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
          <FormIndikatorProgram />
        </Grid>
      </Grid>
      <SubCard content={false}>
        <AppTable stickyHeader columns={columns} initialData={[]} disablePagination />
      </SubCard>
    </>
  );
};

SubRowRencanaProgram.propTypes = {
  row: PropTypes.any
};

export default renderSubRowRencanaProgram;
