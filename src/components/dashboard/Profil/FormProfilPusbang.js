// material-ui
import { Avatar, Button, Grid, Stack, TextField, Typography } from '@mui/material';

// project imports
import SubCard from 'components/ui-component/cards/SubCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from 'hooks/useAuth';
import { LoadingButton } from '@mui/lab';
import { updateUser } from 'store/slices/user';
import { toast } from 'react-hot-toast';
import { createPusbang, updatePusbang } from 'store/slices/pusbang';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const validationSchema = yup.object({
  namaLengkap: yup.string().required('Nama lengkap wajib diisi'),
  email: yup.string().email().required('Email wajib diisi'),
  universitas: yup.string().required('Universitas wajib diisi'),
  noHp: yup.string().required('No HP wajib diisi')
  //   tanggalLahir: yup.date().required('Tanggal lahir wajib diisi'),
  //   jenisKelamin: yup.string().required('Jenis kelamin wajib diisi'),
  // nip: yup.string().required('NIP wajib diisi')
});

const FormProfilPusbang = () => {
  const { user, profil, updateSession } = useAuth();
  const router = useRouter();
  const isEdit = router.pathname !== '/biodata';

  const queryCreatePusbang = useMutation({
    mutationFn: (values) => {
      const { email, noHp, ...rest } = values;
      const putUser = updateUser(user.id, { email, noHp, role: user.role });
      const postPusbang = createPusbang({
        userId: user.id,
        ...rest
      });
      return Promise.all([putUser, postPusbang]);
    },
    onSuccess: () => {
      router.push('/p3ke/dashboard');
    }
  });

  const queryUpdatePusbang = useMutation({
    mutationFn: (values) => {
      const { email, noHp, ...rest } = values;
      const putUser = updateUser(user.id, { email, noHp, role: user.role });
      const putPusbang = updatePusbang(profil.id, {
        userId: user.id,
        ...rest
      });
      return Promise.all([putUser, putPusbang]);
    },
    onSuccess: async () => {
      await updateSession();
    }
  });

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      namaLengkap: profil?.namaLengkap || '',
      email: user?.email || '',
      universitas: profil?.universitas || '',
      noHp: user?.noHp || ''
    },
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdatePusbang.mutateAsync(values) : queryCreatePusbang.mutateAsync(values),
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
            <Grid item xs={12}>
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
                label="Universitas"
                name="universitas"
                value={formik.values.universitas}
                onChange={formik.handleChange}
                error={formik.touched.universitas && Boolean(formik.errors.universitas)}
                helperText={formik.touched.universitas && formik.errors.universitas}
              />
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="NIP"
                name="nip"
                value={formik.values.nip}
                onChange={formik.handleChange}
                error={formik.touched.nip && Boolean(formik.errors.nip)}
                helperText={formik.touched.nip && formik.errors.nip}
              />
            </Grid> */}
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

            <Grid item xs={12}>
              <Stack direction="row" display="flex" justifyContent="flex-end">
                <LoadingButton
                  loading={queryCreatePusbang.isLoading || queryUpdatePusbang.isLoading}
                  onClick={formik.handleSubmit}
                  variant="contained"
                >
                  Simpan
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default FormProfilPusbang;
