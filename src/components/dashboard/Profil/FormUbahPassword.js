// material-ui
import { useTheme } from '@mui/material/styles';
import { Alert, AlertTitle, Button, Grid, TextField } from '@mui/material';

// project imports
import SubCard from 'components/ui-component/cards/SubCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from 'store/slices/user';
import useAuth from 'hooks/useAuth';
import { useMemo } from 'react';

// ==============================|| PROFILE 1 - CHANGE PASSWORD ||============================== //

const FormUbahPassword = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const validationSchema = yup.object({
    oldPassword: yup.string().oneOf(['admin'], 'Kata sandi lama tidak sesuai').required('Kata sandi lama wajib diisi'),
    password: yup.string().required('Kata sandi baru wajib diisi'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Kata sandi tidak sesuai')
      .required('Konfirmas kata sandi wajib diisi')
  });

  const queryUpdatePassword = useMutation({ mutationFn: ({ password }) => updateUser(user.id, { password }) });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: ''
    },
    // validate: ({ oldPassword }) => {
    //   const errors = {};
    //   if (!oldPassword) {
    //     errors.oldPassword = 'Kata sandi lama wajib diisi';
    //   } else if (oldPassword !== 'admin') {
    //     errors.oldPassword = 'Kata sandi lama tidak sesuai';
    //   }
    //   return errors;
    // },
    onSubmit: (values) => {
      toast.promise(
        queryUpdatePassword.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Kata sandi berhasil diubah`,
          error: (err) => `${err.message}`
        },
        { id: 'toast' }
      );
    }
  });

  return (
    <Grid container spacing={gridSpacing}>
      {/* <Grid item xs={12}>
        <Alert severity="warning" variant="outlined" sx={{ borderColor: 'warning.dark' }}>
          <AlertTitle>Alert!</AlertTitle>
          Your Password will expire in every 3 months. So change it periodically.
          <strong> Do not share your password</strong>
        </Alert>
      </Grid> */}
      <Grid item xs={12}>
        <SubCard title="Ubah Kata Sandi">
          <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
            <Grid item xs={12} md={6}>
              <TextField
                type="password"
                fullWidth
                label="Kata Sandi Lama"
                name="oldPassword"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
              />
            </Grid>
          </Grid>
          <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
            <Grid item xs={12} md={6}>
              <TextField
                type="password"
                fullWidth
                label="Kata Sandi Baru"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="password"
                label="Konfirmasi Kata Sandi Baru"
                name="confirmPassword"
                fullWidth
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Grid spacing={2} container justifyContent="flex-end" sx={{ mt: 3 }}>
            <Grid item>
              <AnimateButton>
                <Button variant="contained" onClick={formik.handleSubmit}>
                  Simpan
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item>
              <Button sx={{ color: theme.palette.error.main }}>Reset</Button>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default FormUbahPassword;
