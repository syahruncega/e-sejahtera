// material-ui
import {
  Autocomplete,
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';

// project imports
import SubCard from 'components/ui-component/cards/SubCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDesaKelurahan, getKabupatenKota, getKecamatan } from 'store/slices/detail-lokasi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from 'hooks/useAuth';
import { createAdmin, updateAdmin } from 'store/slices/admin';
import { toast } from 'react-hot-toast';
import { updateUser } from 'store/slices/user';
import { LoadingButton } from '@mui/lab';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const validationSchema = yup.object({
  namaLengkap: yup.string().required('Nama lengkap wajib diisi'),
  email: yup.string().email().required('Email wajib diisi'),
  noHp: yup.string().required('No HP wajib diisi')
});

const FormProfilAdmin = () => {
  const router = useRouter();
  const { user, profil } = useAuth();
  const isEdit = router.pathname !== '/biodata';

  const queryCreateAdmin = useMutation({
    mutationFn: ({ namaLengkap, email, noHp }) =>
      Promise.all([updateUser(user.id, { email, noHp, role: user.role }), createAdmin({ userId: user.id, namaLengkap })]),

    onSuccess: (newAdmin) => {
      router.push('/p3ke/dashboard');
    }
  });

  const queryUpdateAdmin = useMutation({
    mutationFn: ({ namaLengkap, email, noHp }) =>
      Promise.all([updateUser(user.id, { email, noHp, role: user.role }), updateAdmin(profil.id, { namaLengkap })]),

    onSuccess: (newAdmin) => {}
  });

  const formik = useFormik({
    validationSchema,
    // enableReinitialize: true,
    initialValues: {
      namaLengkap: profil?.namaLengkap || '',
      email: user?.email || '',
      noHp: user?.noHp || ''
    },
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateAdmin.mutateAsync(values) : queryCreateAdmin.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Profil berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
          error: (err) => `${err.message}`
        },
        { id: 'toast' }
      );
    }
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item sm={6} md={4}>
        <SubCard title="Foto Profil" contentSX={{ textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar alt="User 1" src={Avatar1} sx={{ width: 100, height: 100, margin: '0 auto' }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                {router.pathname === '/biodata' ? 'Upload Foto Profil' : 'Ubah Foto Profil'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button variant="contained" size="small">
                  Upload Avatar
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item sm={6} md={8}>
        <SubCard title="Biodata">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Lengkap"
                name="namaLengkap"
                value={formik.values.namaLengkap}
                onChange={formik.handleChange}
                error={formik.touched.namaLengkap && Boolean(formik.errors.namaLengkap)}
                helperText={formik.touched.namaLengkap && formik.errors.namaLengkap}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nomor HP"
                name="noHp"
                value={formik.values.noHp}
                onChange={formik.handleChange}
                error={formik.touched.noHp && Boolean(formik.errors.noHp)}
                helperText={formik.touched.noHp && formik.errors.noHp}
              />
            </Grid>
            <Grid item>
              <LoadingButton onClick={formik.handleSubmit} variant="contained">
                Simpan
              </LoadingButton>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default FormProfilAdmin;
