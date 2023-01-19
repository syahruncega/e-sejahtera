import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, Fab, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { EditTwoTone } from '@mui/icons-material';
import { createInstansi, updateInstansi } from 'store/slices/instansi';

const validationSchema = yup.object({
  username: yup.string().required('Username wajib diisi'),
  password: yup.string().required('Password wajib diisi'),
  role: yup.mixed().oneOf(['ADMIN', 'ANALIS', 'DOSEN', 'MAHASISWA', 'PUSBANG']),
  email: yup.string().email().required('Email wajib diisi'),
  noHP: yup.string().required('Nomor HP wajib diisi')
});

const FormPengguna = ({ isEdit, pengguna }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryCreateInstansi = useMutation({
    mutationFn: (newInstansi) => createInstansi(newInstansi),

    onSuccess: (newInstansi) => {
      // queryClient.setQueriesData(['instansi'], (oldData) => [newInstansi, ...(oldData ?? [])]);
      queryClient.invalidateQueries('instansi');
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateInstansi = useMutation({
    mutationFn: (newInstansi) => updateInstansi(pengguna.id, newInstansi),
    onSuccess: (newInstansi) => {
      queryClient.invalidateQueries('instansi');
      // queryClient.setQueriesData(['instansi'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newInstansi.id);
      //   return [newInstansi, ...(filteredOldData ?? [])];
      // });
      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      username: isEdit ? pengguna.username : '',
      password: '',
      role: isEdit ? pengguna.role : 'MAHASISWA',
      email: isEdit ? pengguna.email : '',
      noHP: isEdit ? pengguna.noHP : ''
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
          <IconButton color="primary" size="medium" aria-label="Ubah" onClick={handleClickOpen}>
            <EditTwoTone fontSize="small" />
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
          <DialogTitle> {isEdit ? 'Ubah Pengguna' : 'Tambah Pengguna'}</DialogTitle>
          <DialogContent>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={formik.values.password}
              sx={{ marginTop: 2 }}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <FormControl>
              <FormLabel sx={{ fontWeight: 500, color: 'black', marginTop: 2 }} id="role">
                Role
              </FormLabel>
              <RadioGroup row aria-labelledby="Role" value={formik.values.role} onChange={formik.handleChange}>
                <FormControlLabel name="role" value="ADMIN" control={<Radio />} label="Admin" />
                <FormControlLabel name="role" value="ANALIS" control={<Radio />} label="Analis" />
                <FormControlLabel name="role" value="DOSEN" control={<Radio />} label="Dosen" />
                <FormControlLabel name="role" value="MAHASISWA" control={<Radio />} label="Mahasiswa" />
                <FormControlLabel name="role" value="PUSBANG" control={<Radio />} label="Pusbang" />
              </RadioGroup>
            </FormControl>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              sx={{ marginTop: 2 }}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              name="noHP"
              label="Nomor HP"
              variant="outlined"
              fullWidth
              value={formik.values.noHP}
              sx={{ marginTop: 2 }}
              onChange={formik.handleChange}
              error={formik.touched.noHP && Boolean(formik.errors.noHP)}
              helperText={formik.touched.noHP && formik.errors.noHP}
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

FormPengguna.propTypes = {
  isEdit: PropTypes.bool,
  pengguna: PropTypes.any
};

export default FormPengguna;
