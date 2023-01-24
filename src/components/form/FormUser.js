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
import { createUser, updateUser } from 'store/slices/user';

const validationSchema = yup.object({
  username: yup.string().required('Username wajib diisi'),
  password: yup.string().required('Password wajib diisi'),
  role: yup.mixed().oneOf(['admin', 'analis', 'dosen', 'mahasiswa', 'pusbang']),
  email: yup.string().email('Masukkan email valid').required('Email wajib diisi'),
  noHp: yup.string().required('Nomor HP wajib diisi')
});

const FormUser = ({ isEdit, user }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryCreateUser = useMutation({
    mutationFn: (newUser) => createUser(newUser),

    onSuccess: (newUser) => {
      // queryClient.setQueriesData(['instansi'], (oldData) => [newUser, ...(oldData ?? [])]);
      queryClient.invalidateQueries('user');
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateUser = useMutation({
    mutationFn: async (newUser) => updateUser(user.id, newUser),
    onSuccess: (newUser) => {
      queryClient.invalidateQueries('user');
      // queryClient.setQueriesData(['instansi'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newUser.id);
      //   return [newUser, ...(filteredOldData ?? [])];
      // });
      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      username: isEdit ? user.username : '',
      password: '',
      role: isEdit ? user.role : 'mahasiswa',
      email: isEdit ? user.email : '',
      noHp: isEdit ? user.noHp : ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      toast.promise(
        isEdit ? queryUpdateUser.mutateAsync(values) : queryCreateUser.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Pengguna berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
        <Tooltip title="Tambah Pengguna">
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

            <FormControl sx={{ marginTop: 2, marginX: 1 }}>
              <FormLabel sx={{ fontWeight: 400 }} id="role">
                Role
              </FormLabel>
              <RadioGroup row aria-labelledby="Role" value={formik.values.role} onChange={formik.handleChange}>
                <FormControlLabel name="role" value="admin" control={<Radio size="small" />} label="Admin" />
                <FormControlLabel name="role" value="analis" control={<Radio size="small" />} label="Analis" />
                <FormControlLabel name="role" value="dosen" control={<Radio size="small" />} label="Dosen" />
                <FormControlLabel name="role" value="mahasiswa" control={<Radio size="small" />} label="Mahasiswa" />
                <FormControlLabel name="role" value="pusbang" control={<Radio size="small" />} label="Pusbang" />
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
              name="noHp"
              label="Nomor HP"
              variant="outlined"
              fullWidth
              value={formik.values.noHp}
              sx={{ marginTop: 2 }}
              onChange={formik.handleChange}
              error={formik.touched.noHp && Boolean(formik.errors.noHp)}
              helperText={formik.touched.noHp && formik.errors.noHp}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={queryCreateUser.isLoading || queryUpdateUser.isLoading} onClick={handleClose}>
              Batal
            </Button>
            <LoadingButton loading={queryCreateUser.isLoading || queryUpdateUser.isLoading} type="submit">
              Simpan
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormUser.propTypes = {
  isEdit: PropTypes.bool,
  user: PropTypes.any
};

export default FormUser;
