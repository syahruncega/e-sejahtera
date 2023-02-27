import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Fab, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { EditTwoTone } from '@mui/icons-material';
import { createBidangUrusan, updateBidangUrusan } from 'store/slices/bidang-urusan';

const validationSchema = yup.object({
  bidangUrusanId: yup.string().required('Kode Bidang Urusan wajib diisi'),
  namaBidangUrusan: yup.string().required('Bidang Urusan wajib diisi')
});

const FormBidangUrusan = ({ isEdit, bidangUrusan }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryCreateBidangUrusan = useMutation({
    mutationFn: (newBidangUrusan) => createBidangUrusan(newBidangUrusan),

    onSuccess: (newBidangUrusan) => {
      // queryClient.setQueriesData(['bidangUrusan'], (oldData) => [newBidangUrusan, ...(oldData ?? [])]);
      queryClient.invalidateQueries('bidangUrusan');
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateBidangUrusan = useMutation({
    mutationFn: (newBidangUrusan) => updateBidangUrusan(bidangUrusan.id, newBidangUrusan),
    onSuccess: (newBidangUrusan) => {
      queryClient.invalidateQueries('bidangUrusan');
      // queryClient.setQueriesData(['bidangUrusan'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newBidangUrusan.id);
      //   return [newBidangUrusan, ...(filteredOldData ?? [])];
      // });
      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      bidangUrusanId: isEdit ? bidangUrusan.bidangUrusanId : '',
      namaBidangUrusan: isEdit ? bidangUrusan.namaBidangUrusan : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateBidangUrusan.mutateAsync(values) : queryCreateBidangUrusan.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Data bidang urusan berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
          error: (err) => `${err.message}`
        },
        { id: 'toast' }
      );
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  return (
    <>
      {isEdit ? (
        <Tooltip title="Ubah">
          <IconButton color="primary" size="medium" aria-label="Ubah" onClick={handleClickOpen}>
            <EditTwoTone fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Tambah BidangUrusan">
          <Fab
            color="primary"
            size="small"
            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
            onClick={handleClickOpen}
          >
            <AddIcon fontSize="small" />
          </Fab>
        </Tooltip>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle> {isEdit ? 'Ubah Bidang Urusan' : 'Tambah Bidang Urusan'}</DialogTitle>
          <DialogContent>
            <TextField
              name="bidangUrusanId"
              label="Kode Bidang Urusan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.bidangUrusanId}
              onChange={formik.handleChange}
              error={formik.touched.bidangUrusanId && Boolean(formik.errors.bidangUrusanId)}
              helperText={formik.touched.bidangUrusanId && formik.errors.bidangUrusanId}
            />
            <TextField
              name="namaBidangUrusan"
              label="Nama Bidang Urusan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.namaBidangUrusan}
              onChange={formik.handleChange}
              error={formik.touched.namaBidangUrusan && Boolean(formik.errors.namaBidangUrusan)}
              helperText={formik.touched.namaBidangUrusan && formik.errors.namaBidangUrusan}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={queryCreateBidangUrusan.isLoading || queryUpdateBidangUrusan.isLoading} onClick={handleClose}>
              Batal
            </Button>
            <LoadingButton loading={queryCreateBidangUrusan.isLoading || queryUpdateBidangUrusan.isLoading} type="submit">
              Simpan
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormBidangUrusan.propTypes = {
  isEdit: PropTypes.bool,
  bidangUrusan: PropTypes.any
};

export default FormBidangUrusan;
