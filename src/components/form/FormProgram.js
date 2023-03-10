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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProgram, updateProgram } from 'store/slices/program';
import { toast } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { EditTwoTone } from '@mui/icons-material';

const validationSchema = yup.object({
  id: yup.string().required('ID Program wajib diisi'),
  namaProgram: yup.string().required('Nama Program wajib diisi')
});

const FormProgram = ({ isEdit, program }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryCreateProgram = useMutation({
    mutationFn: (newProgram) => createProgram(newProgram),

    onSuccess: (newProgram) => {
      queryClient.invalidateQueries(['program']);
      // queryClient.setQueriesData(['program'], (oldData) => [newProgram, ...(oldData ?? [])]);
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateProgram = useMutation({
    mutationFn: (newProgram) => updateProgram(program.id, newProgram),
    onSuccess: (newProgram) => {
      queryClient.invalidateQueries(['program']);
      // queryClient.setQueriesData(['program'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newProgram.id);
      //   return [newProgram, ...(filteredOldData ?? [])];
      // });

      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      id: isEdit ? program.id : '',
      namaProgram: isEdit ? program.namaProgram : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateProgram.mutateAsync(values) : queryCreateProgram.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Data program berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
        <Tooltip title="Tambah Program">
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
          <DialogTitle> {isEdit ? 'Ubah Program' : 'Tambah Program'}</DialogTitle>
          <DialogContent>
            <TextField
              name="id"
              label="ID Program"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.id}
              onChange={formik.handleChange}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
            <TextField
              name="namaProgram"
              label="Nama Program"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.namaProgram}
              onChange={formik.handleChange}
              error={formik.touched.namaProgram && Boolean(formik.errors.namaProgram)}
              helperText={formik.touched.namaProgram && formik.errors.namaProgram}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <LoadingButton loading={queryCreateProgram.isLoading || queryUpdateProgram.isLoading} type="submit">
              Simpan
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormProgram.propTypes = {
  isEdit: PropTypes.bool,
  program: PropTypes.any
};

export default FormProgram;
