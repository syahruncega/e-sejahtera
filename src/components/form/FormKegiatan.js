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
import { EditTwoTone } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createKegiatan, updateKegiatan } from 'store/slices/kegiatan';
import { toast } from 'react-hot-toast';

const validationSchema = yup.object({
  id: yup.string().required('ID Kegiatan wajib diisi'),
  namaKegiatan: yup.string().required('Nama Kegiatan wajib diisi')
});

const FormKegiatan = ({ isEdit, kegiatan }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryCreateKegiatan = useMutation({
    mutationFn: (newKegiatan) => createKegiatan(newKegiatan),

    onSuccess: (newKegiatan) => {
      queryClient.invalidateQueries(['kegiatan']);
      // queryClient.setQueriesData(['kegiatan'], (oldData) => [newKegiatan, ...(oldData ?? [])]);
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateKegiatan = useMutation({
    mutationFn: (newKegiatan) => updateKegiatan(kegiatan.id, newKegiatan),
    onSuccess: (newKegiatan) => {
      queryClient.invalidateQueries(['kegiatan']);
      // queryClient.setQueriesData(['kegiatan'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newKegiatan.id);
      //   return [newKegiatan, ...(filteredOldData ?? [])];
      // });

      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      id: isEdit ? kegiatan.id : '',
      namaKegiatan: isEdit ? kegiatan.namaKegiatan : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateKegiatan.mutateAsync(values) : queryCreateKegiatan.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Data kegiatan berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
        <Tooltip title="Tambah Kegiatan">
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
          <DialogTitle> {isEdit ? 'Ubah Kegiatan' : 'Tambah Kegiatan'}</DialogTitle>
          <DialogContent>
            <TextField
              name="id"
              label="ID Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.id}
              onChange={formik.handleChange}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
            <TextField
              name="namaKegiatan"
              label="Nama Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.namaKegiatan}
              onChange={formik.handleChange}
              error={formik.touched.namaKegiatan && Boolean(formik.errors.namaKegiatan)}
              helperText={formik.touched.namaKegiatan && formik.errors.namaKegiatan}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormKegiatan.propTypes = {
  isEdit: PropTypes.bool,
  kegiatan: PropTypes.any
};

export default FormKegiatan;
