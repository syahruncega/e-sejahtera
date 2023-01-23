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
import useAuth from 'hooks/useAuth';
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
  universitasId: yup.string().required('Universitas wajib diisi'),
  tanggalLahir: yup.date().required('Tanggal lahir wajib diisi'),
  jenisKelamin: yup.string().required('Jenis kelamin wajib diisi'),
  noHP: yup.string().required('No HP wajib diisi'),
  stambuk: yup.string().required('Stambuk wajib diisi'),
  kabupatenKotaId: yup.string().required('Kabupaten/Kota wajib diisi'),
  kecamatanId: yup.string().required('Kecamatan wajib diisi'),
  desaKelurahanId: yup.string().required('Desa/Kelurahan wajib diisi')
});

const FormProfilMahasiswa = () => {
  const { user } = useAuth();
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
      namaLengkap: user.name || '',
      email: 'example@mail.com',
      jenisKelamin: 'Laki-laki',
      tanggalLahir: new Date(),
      universitasId: '',
      noHP: '0822-3333-4444',
      stambuk: 'F55123000',
      kabupatenKotaId: '',
      kecamatanId: '',
      desaKelurahan: ''
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
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
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
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="NIM/Stambuk"
                name="stambuk"
                value={formik.values.stambuk}
                onChange={formik.handleChange}
                error={formik.touched.stambuk && Boolean(formik.errors.stambuk)}
                helperText={formik.touched.stambuk && formik.errors.stambuk}
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

            {/* <Grid item xs={12}>
              <Stack direction="row">
                <AnimateButton>
                  <Button variant="contained">{router.pathname === '/biodata' ? 'Simpan Biodata' : 'Ubah Biodata'}</Button>
                </AnimateButton>
              </Stack>
            </Grid> */}
          </Grid>
        </SubCard>
      </Grid>
      <Grid item sm={6} md={4}>
        <></>
      </Grid>
      <Grid item sm={6} md={8}>
        <SubCard title="Lokasi KKN">
          <Grid container spacing={gridSpacing}>
            <Grid item md={6} xs={12}>
              <Autocomplete
                disablePortal
                name="kabupatenKotaId"
                value={kabupatenKotaValue}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nama}
                onChange={async (e, value) => {
                  if (value !== null) {
                    formik.setFieldValue('kabupatenKotaId', value.id);
                    const kecamatan = await getKecamatan(value.id);
                    setDataKecamatan(kecamatan);
                    formik.setFieldValue('kecamatanId', '');
                    formik.setFieldValue('kelurahanId', '');
                    setKeyKecamatan(!keyKecamatan);
                    setKeyKelurahan(!keyKelurahan);
                  } else {
                    formik.setFieldValue('kabupatenKotaId', '');
                    setDataKecamatan([]);
                    setDataKelurahan([]);
                  }
                  setKabupatenKotaValue(value);
                  setKecamatanValue(null);
                  setDesaKelurahanValue(null);
                }}
                options={fetchKabupatenKota.data || []}
                renderInput={(params) => (
                  <TextField
                    label="Kabupaten/Kota"
                    value={formik.values.kabupatenKotaId}
                    helperText={formik.touched.kabupatenKotaId && formik.errors.kabupatenKotaId}
                    error={formik.touched.kabupatenKotaId && Boolean(formik.errors.kabupatenKotaId)}
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                disablePortal
                key={`kecamatan${keyKecamatan}`}
                name="kecamatanId"
                value={kecamatanValue}
                disabled={!(dataKecamatan.length > 0) && kecamatanValue === null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nama}
                onChange={async (e, value) => {
                  if (value !== null) {
                    formik.setFieldValue('kecamatanId', value.id);
                    const desaKelurahan = await getDesaKelurahan(value.id);
                    setDataKelurahan(desaKelurahan);
                    formik.setFieldValue('kelurahanId', '');
                    setKeyKelurahan(!keyKelurahan);
                  } else {
                    formik.setFieldValue('kecamatanId', '');
                    setKeyKelurahan([]);
                  }
                  setKecamatanValue(value);
                  setDesaKelurahanValue(null);
                }}
                options={dataKecamatan || []}
                renderInput={(params) => (
                  <TextField
                    label="Kecamatan"
                    value={formik.values.kecamatanId}
                    helperText={formik.touched.kecamatanId && formik.errors.kecamatanId}
                    error={formik.touched.kecamatanId && Boolean(formik.errors.kecamatanId)}
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                disablePortal
                key={`kelurahan${keyKelurahan}`}
                name="kelurahanId"
                value={desaKelurahanValue}
                disabled={!(dataKelurahan.length > 0) && desaKelurahanValue === null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nama}
                onChange={async (e, value) => {
                  if (value !== null) {
                    formik.setFieldValue('kelurahanId', value.id);
                  } else {
                    formik.setFieldValue('kelurahanId', '');
                  }
                  setDesaKelurahanValue(value);
                }}
                options={dataKelurahan || []}
                renderInput={(params) => (
                  <TextField
                    label="Desa/Kelurahan"
                    value={formik.values.kelurahanId}
                    helperText={formik.touched.kelurahanId && formik.errors.kelurahanId}
                    error={formik.touched.kelurahanId && Boolean(formik.errors.kelurahanId)}
                    {...params}
                  />
                )}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <Stack direction="row">
                <AnimateButton>
                  <Button variant="contained">{router.pathname === '/biodata' ? 'Simpan Biodata' : 'Ubah Biodata'}</Button>
                </AnimateButton>
              </Stack>
            </Grid> */}
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default FormProfilMahasiswa;
