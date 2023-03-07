import PropTypes from 'prop-types';
import { FastForwardTwoTone } from '@mui/icons-material';
import { Alert, AlertTitle, Box, CircularProgress, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import AppTable from 'components/AppTable';
import FormBidangUrusan from 'components/form/Kemiskinan/FormBidangUrusan';
import SubCard from 'components/ui-component/cards/SubCard';
import React, { Fragment, useMemo, useState } from 'react';
import FormBidangUrusanInstansi from 'components/form/Kemiskinan/FormBidangUrusanInstansi';
import { useQuery } from '@tanstack/react-query';
import { getBidangUrusan } from 'store/slices/kemiskinan/bidang-urusan';
import { deleteBidangUrusanOnInstansi, getBidangUrusanOnInstansi } from 'store/slices/kemiskinan/bidang-urusan-on-instansi';
import DeleteDialog from 'components/dialog/DeleteDialog';

const renderSubRowMasterInstansi = ({ row }) => <SubRowMasterInstansi row={row} />;

const SubRowMasterInstansi = ({ row }) => {
  const fetchBidangUrusan = useQuery(['bidangUrusan'], getBidangUrusan);
  const fetchBidangUrusanInstansi = useQuery(['bidangUrusanInstansi'], ({ signal }) =>
    getBidangUrusanOnInstansi({ signal, params: { instansiId: row.original.id } })
  );

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => `${index + 1}`,
        id: 'no',
        header: 'No'
      },
      {
        id: 'kodeBidangUrusan',
        accessorKey: 'bidangUrusan.kodeBidangUrusan',
        header: 'Kode Bidang Urusan'
      },
      {
        id: 'namaBidangUrusan',
        accessorKey: 'bidangUrusan.namaBidangUrusan',
        header: 'Nama Bidang Urusan'
      },
      {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row: { original: data } }) => (
          <Box sx={{ display: 'flex' }}>
            <DeleteDialog id={data.id} deleteFunc={deleteBidangUrusanOnInstansi} mutationKey="bidangUrusanInstansi" />
          </Box>
        )
      }
    ],

    []
  );

  if (fetchBidangUrusanInstansi.isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {fetchBidangUrusanInstansi.error.message}
      </Alert>
    );
  }

  if (fetchBidangUrusanInstansi.isLoading) {
    return (
      <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center ', marginY: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="flex-end" spacing={2} sx={{ marginBottom: 3 }}>
        <FormBidangUrusanInstansi instansiId={row.original.id} dataBidangUrusan={fetchBidangUrusan.data} />
      </Box>
      <SubCard content={false}>
        <AppTable stickyHeader columns={columns} initialData={fetchBidangUrusanInstansi.data ?? []} disablePagination />
      </SubCard>
    </>
  );
};

SubRowMasterInstansi.propTypes = {
  row: PropTypes.any
};

export default renderSubRowMasterInstansi;
