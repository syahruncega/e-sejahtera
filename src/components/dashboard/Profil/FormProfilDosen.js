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
  Stack,
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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDesaKelurahan, getKabupatenKota, getKecamatan } from 'store/slices/detail-lokasi';
import { useFormik } from 'formik';
import * as yup from 'yup';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const validationSchema = yup.object({
  namaLengkap: yup.string().required('Nama lengkap wajib diisi'),
  email: yup.string().email().required('Email wajib diisi'),
  universitas: yup.string().required('Universitas wajib diisi'),
  //   tanggalLahir: yup.date().required('Tanggal lahir wajib diisi'),
  //   jenisKelamin: yup.string().required('Jenis kelamin wajib diisi'),
  noHP: yup.string().required('No HP wajib diisi'),
  nip: yup.string().required('NIP wajib diisi')
});

const FormProfilDosen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const isEdit = router.pathname !== '/biodata';

  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);
  const [keyKecamatan, setKeyKecamatan] = useState(false);
  const [keyKelurahan, setKeyKelurahan] = useState(false);

  const [kabupatenKotaValue, setKabupatenKotaValue] = useState(null);
  const [kecamatanValue, setKecamatanValue] = useState(null);
  const [desaKelurahanValue, setDesaKelurahanValue] = useState(null);
  const [universitasValue, setUniversitasValue] = useState(null);

  const fetchKabupatenKota = useQuery(['kabupatenKota'], async () => getKabupatenKota('72'));

  const formik = useFormik({
    validationSchema,
    // enableReinitialize: true,
    initialValues: {
      namaLengkap: 'Fulan',
      email: 'example@mail.com',
      //   jenisKelamin: 'Laki-laki',
      //   tanggalLahir: new Date(),
      universitas: 'Universitas Tadulako',
      noHP: '0822-3333-4444',
      nip: 'F55123000'
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
            {/* <Grid item md={6} xs={12}>
              <FormControl sx={{ display: 'flex' }}>
                <FormLabel sx={{ display: 'flex', fontSize: '11px' }} id="jenisKelamin">
                  Jenis Kelamin
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="jenisKelamin"
                  name="jenisKelamin"
                  value={formik.values.jenisKelamin}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel value="Laki-laki" control={<Radio size="small" />} label="Laki-laki" />
                  <FormControlLabel value="Perempuan" control={<Radio size="small" />} label="Perempuan" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formik.values.tanggalLahir}
                  onChange={(e) => {
                    formik.setFieldValue('tanggalLahir', new Date(e));
                  }}
                  renderInput={(params) => <TextField {...params} label="Tanggal Lahir" fullWidth name="tanggalLahir" />}
                />
              </LocalizationProvider>
            </Grid> */}
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
              {/* <Autocomplete
                  disablePortal
                  disableClearable
                  name="universitasId"
                  value={kabupatenKotaValue}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.value}
                  onChange={(e, value) => {
                    if (value !== null) {
                      formik.setFieldValue('universitasId', value.value);
                    }
                    setUniversitasValue(value);
                  }}
                  options={[{ label: 'Universitas Tadulako', value: 'Universitas Tadulako' }]}
                  renderInput={(params) => (
                    <TextField
                      label="Universitas"
                      value={formik.values.universitasId}
                      helperText={formik.touched.universitasId && formik.errors.universitasId}
                      error={formik.touched.universitasId && Boolean(formik.errors.universitasId)}
                      {...params}
                    />
                  )}
                /> */}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="NIP"
                name="nip"
                value={formik.values.nip}
                onChange={formik.handleChange}
                error={formik.touched.nip && Boolean(formik.errors.nip)}
                helperText={formik.touched.nip && formik.errors.nip}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nomor HP"
                name="noHP"
                value={formik.values.noHP}
                onChange={formik.handleChange}
                error={formik.touched.noHP && Boolean(formik.errors.noHP)}
                helperText={formik.touched.noHP && formik.errors.noHP}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" display="flex" justifyContent="flex-end">
                <AnimateButton>
                  <Button variant="contained">{router.pathname === '/biodata' ? 'Simpan Biodata' : 'Ubah Biodata'}</Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default FormProfilDosen;
