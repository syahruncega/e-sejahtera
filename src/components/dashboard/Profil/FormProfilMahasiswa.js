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
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getDesaKelurahan, getKabupatenKota, getKecamatan } from 'store/slices/detail-lokasi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from 'hooks/useAuth';
import { updateUser } from 'store/slices/user';
import { createMahasiswa, updateMahasiswa } from 'store/slices/mahasiswa';
import { toast } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import axiosService from 'utils/axios';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const validationSchema = yup.object({
  namaLengkap: yup.string().required('Nama lengkap wajib diisi'),
  email: yup.string().email().required('Email wajib diisi'),
  universitas: yup.string().required('Universitas wajib diisi'),
  tanggalLahir: yup.date().required('Tanggal lahir wajib diisi'),
  jenisKelamin: yup.string().required('Jenis kelamin wajib diisi'),
  noHp: yup.string().required('No HP wajib diisi'),
  username: yup.string().required('Stambuk wajib diisi'),
  kabupatenKotaId: yup.string().required('Kabupaten/Kota wajib diisi'),
  kecamatanId: yup.string().required('Kecamatan wajib diisi'),
  kelurahanId: yup.string().required('Desa/Kelurahan wajib diisi')
});

const FormProfilMahasiswa = () => {
  const { user, profil, updateSession } = useAuth();
  const router = useRouter();
  const isEdit = router.pathname !== '/p3ke/biodata';

  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);
  const [keyKecamatan, setKeyKecamatan] = useState(false);
  const [keyKelurahan, setKeyKelurahan] = useState(false);

  const [kabupatenKotaValue, setKabupatenKotaValue] = useState(null);
  const [kecamatanValue, setKecamatanValue] = useState(null);
  const [desaKelurahanValue, setDesaKelurahanValue] = useState(null);

  const fetchKabupatenKota = useQuery(['kabupatenKota'], async () => getKabupatenKota('72'));

  useEffect(() => {
    const getLokasi = async () => {
      const kabupaten = axiosService.get(`/kabupatenkota/${profil?.kabupatenKotaId}`);
      const kecamatan = axiosService.get(`/kecamatan/${profil?.kecamatanId}`);
      const kelurahan = axiosService.get(`/kelurahan/${profil?.kelurahanId}`);
      const res = await Promise.all([kabupaten, kecamatan, kelurahan]);
      setKabupatenKotaValue(res[0].data);
      setKecamatanValue(res[1].data);
      setDesaKelurahanValue(res[2].data);
    };
    if (isEdit) {
      getLokasi();
    }
  }, [isEdit, profil]);

  const queryCreateMahasiswa = useMutation({
    mutationFn: (values) => {
      const { email, noHp, ...rest } = values;
      const putUser = updateUser(user.id, { email, noHp, role: user.role });
      const postMahasiswa = createMahasiswa({
        userId: user.id,
        ...rest,
        tanggalLahir: dayjs(new Date(rest.tanggalLahir)).format('MM/DD/YYYY')
      });
      return Promise.all([putUser, postMahasiswa]);
    },

    onSuccess: async (newMahasiswa) => {
      await updateSession();
    }
  });

  const queryUpdateMahasiswa = useMutation({
    mutationFn: (values) => {
      const { email, noHp, username, ...rest } = values;
      const putUser = updateUser(user.id, { email, noHp, username, role: user.role });
      const putMahasiswa = updateMahasiswa(profil.id, {
        ...rest,
        userId: user.id,
        tanggalLahir: dayjs(new Date(rest.tanggalLahir)).format('MM/DD/YYYY')
      });
      return Promise.all([putUser, putMahasiswa]);
    },

    onSuccess: async (response) => {
      await updateSession();
    }
  });

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      namaLengkap: profil?.namaLengkap || '',
      email: user?.email || '',
      jenisKelamin: profil?.jenisKelamin || 'Laki-laki',
      tanggalLahir: profil?.tanggalLahir ? new Date(profil?.tanggalLahir) : new Date(dayjs().format('MM/DD/YYYY')),
      universitas: profil?.universitas || 'Universitas Tadulako',
      noHp: user?.noHp || '',
      username: user?.username || '',
      kabupatenKotaId: profil?.kabupatenKotaId || '',
      kecamatanId: profil?.kecamatanId || '',
      kelurahanId: profil?.kelurahanId || ''
    },
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateMahasiswa.mutateAsync(values) : queryCreateMahasiswa.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Profil berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
          error: (err) => `${err.message}`
        },
        { id: 'toast' }
      );
    }
  });

  // console.log(formik.errors);
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
                  inputFormat="DD-MM-YYYY"
                  renderInput={(params) => <TextField {...params} label="Tanggal Lahir" fullWidth name="tanggalLahir" />}
                />
              </LocalizationProvider>
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="NIM/Stambuk"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
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

            <Grid item xs={12}>
              <Stack direction="row" display="flex" justifyContent="flex-end">
                <LoadingButton
                  loading={queryCreateMahasiswa.isLoading || queryUpdateMahasiswa.isLoading}
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

export default FormProfilMahasiswa;
