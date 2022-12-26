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
import { EditOutlined } from '@mui/icons-material';
import { createInstansi, updateInstansi } from 'store/slices/instansi';

const validationSchema = yup.object({
  nama_instansi: yup.string().required('Instansi wajib diisi')
});

const FormInstansi = ({ isEdit, instansi }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryCreateInstansi = useMutation({
    mutationFn: (newInstansi) => createInstansi(newInstansi),

    onSuccess: (newInstansi) => {
      queryClient.setQueriesData(['instansi'], (oldData) => [newInstansi, ...(oldData ?? [])]);
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateInstansi = useMutation({
    mutationFn: (newInstansi) => updateInstansi(instansi.id, newInstansi),
    onSuccess: (newInstansi) => {
      queryClient.setQueriesData(['instansi'], (oldData) => {
        const filteredOldData = oldData.filter((values) => values.id !== newInstansi.id);
        return [newInstansi, ...(filteredOldData ?? [])];
      });
      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      nama_instansi: isEdit ? instansi.nama_instansi : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateInstansi.mutateAsync(values) : queryCreateInstansi.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Data instansi berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
          <IconButton size="medium" aria-label="Ubah" onClick={handleClickOpen}>
            <EditOutlined fontSize="small" sx={{ color: 'grey.500' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Tambah Instansi">
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
          <DialogTitle> {isEdit ? 'Ubah Instansi' : 'Tambah Instansi'}</DialogTitle>
          <DialogContent>
            <TextField
              name="nama_instansi"
              label="Nama Instansi"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.nama_instansi}
              onChange={formik.handleChange}
              error={formik.touched.nama_instansi && Boolean(formik.errors.nama_instansi)}
              helperText={formik.touched.nama_instansi && formik.errors.nama_instansi}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={queryCreateInstansi.isLoading || queryUpdateInstansi.isLoading} onClick={handleClose}>
              Batal
            </Button>
            <LoadingButton loading={queryCreateInstansi.isLoading || queryUpdateInstansi.isLoading} type="submit">
              Simpan
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormInstansi.propTypes = {
  isEdit: PropTypes.bool,
  instansi: PropTypes.any
};

export default FormInstansi;
