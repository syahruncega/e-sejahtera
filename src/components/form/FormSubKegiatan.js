import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, Fab, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { EditTwoTone } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubKegiatan, updateSubKegiatan } from 'store/slices/sub-kegiatan';
import { toast } from 'react-hot-toast';

const validationSchema = yup.object({
  id: yup.string().required('ID Sub Kegiatan wajib diisi'),
  namaSubKegiatan: yup.string().required('Nama Sub Kegiatan wajib diisi')
});

const FormSubKegiatan = ({ isEdit, subKegiatan, dataKegiatan }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryCreateSubKegiatan = useMutation({
    mutationFn: (newSubKegiatan) => createSubKegiatan(newSubKegiatan),

    onSuccess: (newSubKegiatan) => {
      queryClient.invalidateQueries(['subKegiatan']);
      // queryClient.setQueriesData(['subKegiatan'], (oldData) => [newSubKegiatan, ...(oldData ?? [])]);
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateSubKegiatan = useMutation({
    mutationFn: (newSubKegiatan) => updateSubKegiatan(subKegiatan.id, newSubKegiatan),
    onSuccess: (newSubKegiatan) => {
      queryClient.invalidateQueries(['subKegiatan']);
      // queryClient.setQueriesData(['subKegiatan'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newSubKegiatan.id);
      //   return [newSubKegiatan, ...(filteredOldData ?? [])];
      // });

      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      id: isEdit ? subKegiatan.id : '',
      namaSubKegiatan: isEdit ? subKegiatan.namaSubKegiatan : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateSubKegiatan.mutateAsync(values) : queryCreateSubKegiatan.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Data sub kegiatan berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
        <Tooltip title="Tambah Sub Kegiatan">
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
          <DialogTitle> {isEdit ? 'Ubah Sub Kegiatan' : 'Tambah Sub Kegiatan'}</DialogTitle>
          <DialogContent>
            <TextField
              name="id"
              label="ID Sub Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.id}
              onChange={formik.handleChange}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
            <TextField
              name="namaSubKegiatan"
              label="Nama Sub Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.namaSubKegiatan}
              onChange={formik.handleChange}
              error={formik.touched.namaSubKegiatan && Boolean(formik.errors.namaSubKegiatan)}
              helperText={formik.touched.namaSubKegiatan && formik.errors.namaSubKegiatan}
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

FormSubKegiatan.propTypes = {
  isEdit: PropTypes.bool,
  subKegiatan: PropTypes.any,
  dataKegiatan: PropTypes.array
};

export default FormSubKegiatan;
