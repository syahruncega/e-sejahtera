import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {
  Backdrop,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';

import MainCard from 'components/ui-component/cards/MainCard';
import SubCard from 'components/ui-component/cards/SubCard';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/system';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import ConfirmDialog from 'components/dialog/ConfirmDialog';
import ConfirmVerifikasiDialog from 'components/dialog/ConfirmVerifikasiDialog';

const UpdateChip = () => (
  <Chip
    variant="outlined"
    label="DIUBAH"
    size="small"
    sx={{ ml: 1, height: 16, fontSize: 12, borderWidth: 2, color: 'warning.dark', borderColor: 'warning.dark' }}
  />
);

const validationSchema = yup.object({
  desilKesejahteraan: yup.string().required('Desil kesejahteraan wajib diisi'),
  nama: yup.string().required('Kepala keluarga wajib diisi'),
  nik: yup.string().required('NIK wajib diisi'),
  alamat: yup.string().required('Alamat wajib diisi'),
  padanDukcapil: yup.string().required('Padan Dukcapil wajib diisi'),
  jenisKelamin: yup.string().required('Jenis Kelamin wajib diisi'),
  tanggalLahir: yup.date().required('Tanggal Lahir wajib diisi'),
  hubungan: yup.string().required('Hubungan dengan kepala keluarga wajib diisi'),
  statusKawin: yup.string().required('Status Kawin wajib diisi'),
  pekerjaan: yup.string().required('Pekerjaan wajib diisi'),
  pendidikan: yup.string().required('Pendidikan wajib diisi'),
  penerimaBPNT: yup.string().required('Peneriman bantuan pangan non tunai (BPNT) wajib diisi'),
  penerimaBPUM: yup.string().required('Penerima Bantuan Produktif Usaha Mikro (BPUM) wajib diisi'),
  penerimaBST: yup.string().required('Penerima Bantuan Sosial Tunai (BST) wajib diisi'),
  penerimaPKH: yup.string().required('Penerima Program Keluarga Harapan (PKH) wajib diisi'),
  penerimaSembako: yup.string().required('Penerima Bantuan Sembako wajib diisi'),
  statusResponden: yup.mixed().oneOf(['dapatDiverifikasi', 'tidakDapatDitemui', 'meninggalDunia']),
  penerimaBantuanLainnya: yup.string().required('Penerima bantuan lainnya wajib diisi')
});

const FormVerifikasiIndividu = ({ isEdit, initialData }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      desilKesejahteraan: initialData?.desilKesejahteraan ?? '1',
      nama: initialData?.nama ?? '',
      nik: initialData?.nik ?? '',
      alamat: initialData?.alamat ?? '',
      padanDukcapil: initialData?.padanDukcapil ?? 'Ya',
      jenisKelamin: initialData?.jenisKelamin ?? 'Laki-laki',
      tanggalLahir: initialData?.tanggalLahir ? new Date(initialData.tanggalLahir) : new Date(),
      pekerjaan: initialData?.pekerjaan ?? 'Tidak/Belum Bekerja',
      pendidikan: initialData?.pendidikan ?? 'Tidak/Belum Sekolah',
      hubungan: initialData?.hubungan ?? 'Anak',
      statusKawin: initialData?.statusKawin ?? 'Belum Kawin',
      penerimaBPNT: initialData?.penerimaBPNT ?? 'Tidak',
      penerimaBPUM: initialData?.penerimaBPUM ?? 'Tidak',
      penerimaBST: initialData?.penerimaBST ?? 'Tidak',
      penerimaPKH: initialData?.penerimaPKH ?? 'Tidak',
      penerimaSembako: initialData?.penerimaSembako ?? 'Tidak',
      statusResponden: 'dapatDiverifikasi',
      penerimaBantuanLainnya: ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.success('Data berhasil diverifikasi');
    }
  });

  const labelStyle = {
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    color: 'black',
    marginBottom: 0.5
  };

  return (
    <>
      <MainCard>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item lg={12} xs={12}>
              <SubCard title="Status Responden">
                <FormControl>
                  <RadioGroup row aria-labelledby="statusResponden" value={formik.values.statusResponden} onChange={formik.handleChange}>
                    <FormControlLabel name="statusResponden" value="dapatDiverifikasi" control={<Radio />} label="Dapat Diverifikasi" />
                    <FormControlLabel name="statusResponden" value="tidakDapatDitemui" control={<Radio />} label="Tidak Dapat Temui" />
                    <FormControlLabel name="statusResponden" value="meninggalDunia" control={<Radio />} label="Meninggal Dunia" />
                  </RadioGroup>
                </FormControl>
                {formik.values.statusResponden !== 'dapatDiverifikasi' && <Button variant="contained">Verifikasi</Button>}
              </SubCard>
            </Grid>
            <Grid item lg={12} xs={12} sx={{ backdropFilter: 'blur(6px)' }}>
              {formik.values.statusResponden === 'dapatDiverifikasi' && (
                <SubCard title="Keluarga/Kepala Keluarga">
                  <FormControl disabled>
                    <FormLabel sx={labelStyle} id="desil">
                      Status Kesejahteraan/Desil
                    </FormLabel>
                    <RadioGroup row aria-labelledby="desil" value={formik.values.desilKesejahteraan} onChange={formik.handleChange}>
                      <FormControlLabel name="desilKesejahteraan" value="1" control={<Radio />} label="1" />
                      <FormControlLabel name="desilKesejahteraan" value="2" control={<Radio />} label="2" />
                      <FormControlLabel name="desilKesejahteraan" value="3" control={<Radio />} label="3" />
                      <FormControlLabel name="desilKesejahteraan" value="4" control={<Radio />} label="4" />
                      <FormControlLabel name="desilKesejahteraan" value="4+" control={<Radio />} label="4+" />
                      <FormControlLabel name="desilKesejahteraan" value="5" control={<Radio />} label="5" />
                      <FormControlLabel name="desilKesejahteraan" value="6" control={<Radio />} label="6" />
                      <FormControlLabel name="desilKesejahteraan" value="7" control={<Radio />} label="7" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl fullWidth>
                    <FormLabel sx={labelStyle} id="nama">
                      Nama
                      {initialData.nama !== formik.values.nama && <UpdateChip />}
                    </FormLabel>
                    {initialData.nama !== formik.values.nama && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.nama}</FormHelperText>
                    )}

                    <TextField placeholder="Masukkan nama lengkap" name="nama" value={formik.values.nama} onChange={formik.handleChange} />
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl fullWidth>
                    <FormLabel sx={labelStyle} id="nik">
                      NIK
                      {initialData.nik !== formik.values.nik && <UpdateChip />}
                    </FormLabel>
                    {initialData.nik !== formik.values.nik && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.nik}</FormHelperText>
                    )}
                    <TextField name="nik" value={formik.values.nik} onChange={formik.handleChange} />
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl fullWidth>
                    <FormLabel sx={labelStyle} id="alamat">
                      Alamat
                      {initialData.alamat !== formik.values.alamat && <UpdateChip />}
                    </FormLabel>
                    {initialData.alamat !== formik.values.alamat && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.alamat}</FormHelperText>
                    )}
                    <TextField multiline rows={3} name="alamat" value={formik.values.alamat} onChange={formik.handleChange} />
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="padanDukcapil">
                      Padan Dukcapil
                      {initialData.padanDukcapil !== formik.values.padanDukcapil && <UpdateChip />}
                    </FormLabel>
                    {initialData.padanDukcapil !== formik.values.padanDukcapil && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.padanDukcapil}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="padanDukcapil" value={formik.values.padanDukcapil} onChange={formik.handleChange}>
                      <FormControlLabel name="padanDukcapil" value="Ya" control={<Radio />} label="Ya" />
                      <FormControlLabel name="padanDukcapil" value="Tidak" control={<Radio />} label="Tidak" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="jenisKelamin">
                      Jenis Kelamin
                      {initialData.jenisKelamin !== formik.values.jenisKelamin && <UpdateChip />}
                    </FormLabel>
                    {initialData.jenisKelamin !== formik.values.jenisKelamin && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.jenisKelamin}</FormHelperText>
                    )}
                    <RadioGroup
                      row
                      aria-labelledby="jenisKelamin"
                      name="jenisKelamin"
                      value={formik.values.jenisKelamin}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel value="Laki-laki" control={<Radio />} label="Laki-laki" />
                      <FormControlLabel value="Perempuan" control={<Radio />} label="Perempuan" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="tanggalLahir">
                      Tanggal Lahir
                      {dayjs(initialData.tanggalLahir).format('DD/MM/YYYY') !== dayjs(formik.values.tanggalLahir).format('DD/MM/YYYY') && (
                        <UpdateChip />
                      )}
                    </FormLabel>
                    {dayjs(initialData.tanggalLahir).format('DD/MM/YYYY') !== dayjs(formik.values.tanggalLahir).format('DD/MM/YYYY') && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.tanggalLahir}</FormHelperText>
                    )}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={formik.values.tanggalLahir}
                        onChange={(e) => {
                          formik.setFieldValue('tanggalLahir', new Date(e));
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth name="tanggalLahir" />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="hubungan">
                      Hubungan Dengan Kepala Keluarga
                      {initialData.hubungan !== formik.values.hubungan && <UpdateChip />}
                    </FormLabel>
                    {initialData.hubungan !== formik.values.hubungan && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.hubungan}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="hubungan" value={formik.values.hubungan} onChange={formik.handleChange}>
                      <FormControlLabel name="hubungan" value="Kepala Keluarga" control={<Radio />} label="Kepala Keluarga" />
                      <FormControlLabel name="hubungan" value="Istri" control={<Radio />} label="Istri" />
                      <FormControlLabel name="hubungan" value="Anak" control={<Radio />} label="Anak" />
                      <FormControlLabel name="hubungan" value="Lainnya" control={<Radio />} label="Lainnya" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="statusKawin">
                      Status Kawin
                      {initialData.statusKawin !== formik.values.statusKawin && <UpdateChip />}
                    </FormLabel>
                    {initialData.statusKawin !== formik.values.statusKawin && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.statusKawin}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="statusKawin" value={formik.values.statusKawin} onChange={formik.handleChange}>
                      <FormControlLabel name="statusKawin" value="Belum Kawin" control={<Radio />} label="Belum Kawin" />
                      <FormControlLabel name="statusKawin" value="Kawin" control={<Radio />} label="Kawin" />
                      <FormControlLabel name="statusKawin" value="Cerai Hidup" control={<Radio />} label="Cerai Hidup" />
                      <FormControlLabel name="statusKawin" value="Cerai Mati" control={<Radio />} label="Cerai Mati" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="pekerjaan">
                      Pekerjaan
                      {initialData.pekerjaan !== formik.values.pekerjaan && <UpdateChip />}
                    </FormLabel>
                    {initialData.pekerjaan !== formik.values.pekerjaan && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.pekerjaan}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="pekerjaan" value={formik.values.pekerjaan} onChange={formik.handleChange}>
                      <FormControlLabel name="pekerjaan" value="Tidak/Belum Bekerja" control={<Radio />} label="Tidak/Belum Bekerja" />
                      <FormControlLabel name="pekerjaan" value="Petani" control={<Radio />} label="Petani" />
                      <FormControlLabel name="pekerjaan" value="Nelayan" control={<Radio />} label="Nelayan" />
                      <FormControlLabel name="pekerjaan" value="Pedagang" control={<Radio />} label="Pedagang" />
                      <FormControlLabel name="pekerjaan" value="Pegawai Swasta" control={<Radio />} label="Pegawai Swasta" />
                      <FormControlLabel name="pekerjaan" value="Wiraswasta" control={<Radio />} label="Wiraswasta" />
                      <FormControlLabel name="pekerjaan" value="Pensiunan" control={<Radio />} label="Pensiunan" />
                      <FormControlLabel name="pekerjaan" value="Pekerja Lepas" control={<Radio />} label="Pekerja Lepas" />
                      <FormControlLabel name="pekerjaan" value="Lainnya" control={<Radio />} label="Lainnya" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="pendidikan">
                      Pendidikan
                      {initialData.pendidikan !== formik.values.pendidikan && <UpdateChip />}
                    </FormLabel>
                    {initialData.pendidikan !== formik.values.pendidikan && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.pendidikan}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="pendidikan" value={formik.values.pendidikan} onChange={formik.handleChange}>
                      <FormControlLabel name="pendidikan" value="Tidak/belum sekolah" control={<Radio />} label="Tidak/belum sekolah" />
                      <FormControlLabel
                        name="pendidikan"
                        value="Tidak tamat SD/sederajat"
                        control={<Radio />}
                        label="Tidak tamat SD/sederajat"
                      />
                      <FormControlLabel name="pendidikan" value="Siswa SD/sederajat" control={<Radio />} label="Siswa SD/sederajat" />
                      <FormControlLabel name="pendidikan" value="Tamat SD/sederajat" control={<Radio />} label="Tamat SD/sederajat" />
                      <FormControlLabel name="pendidikan" value="Siswa SMP/sederajat" control={<Radio />} label="Siswa SMP/sederajat" />
                      <FormControlLabel name="pendidikan" value="Tamat SMP/sederajat" control={<Radio />} label="Tamat SMP/sederajat" />
                      <FormControlLabel name="pendidikan" value="Siswa SMA/sederajat" control={<Radio />} label="Siswa SMA/sederajat" />
                      <FormControlLabel name="pendidikan" value="Tamat SMA/sederajat" control={<Radio />} label="Tamat SMA/sederajat" />
                      <FormControlLabel
                        name="pendidikan"
                        value="Mahasiswa Perguruan Tinggi"
                        control={<Radio />}
                        label="Mahasiswa Perguruan Tinggi"
                      />
                      <FormControlLabel
                        name="pendidikan"
                        value="Tamat Perguruan Tinggi"
                        control={<Radio />}
                        label="Tamat Perguruan Tinggi"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="penerimaBPUM">
                      Penerima Bantuan Produktif Usaha Mikro (BPUM)
                      {initialData.penerimaBPUM !== formik.values.penerimaBPUM && <UpdateChip />}
                    </FormLabel>
                    {initialData.penerimaBPUM !== formik.values.penerimaBPUM && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.penerimaBPUM}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="penerimaBPUM" value={formik.values.penerimaBPUM} onChange={formik.handleChange}>
                      <FormControlLabel name="penerimaBPUM" value="Ya" control={<Radio />} label="Ya" />
                      <FormControlLabel name="penerimaBPUM" value="Tidak" control={<Radio />} label="Tidak" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="penerimaBST">
                      Penerima Bantuan Sosial Tunai (BST)
                      {initialData.penerimaBST !== formik.values.penerimaBST && <UpdateChip />}
                    </FormLabel>
                    {initialData.penerimaBST !== formik.values.penerimaBST && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.penerimaBST}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="penerimaBST" value={formik.values.penerimaBST} onChange={formik.handleChange}>
                      <FormControlLabel name="penerimaBST" value="Ya" control={<Radio />} label="Ya" />
                      <FormControlLabel name="penerimaBST" value="Tidak" control={<Radio />} label="Tidak" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="penerimaPKH">
                      Penerima Program Keluarga Harapan (PKH)
                      {initialData.penerimaPKH !== formik.values.penerimaPKH && <UpdateChip />}
                    </FormLabel>
                    {initialData.penerimaPKH !== formik.values.penerimaPKH && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.penerimaPKH}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="penerimaPKH" value={formik.values.penerimaPKH} onChange={formik.handleChange}>
                      <FormControlLabel name="penerimaPKH" value="Ya" control={<Radio />} label="Ya" />
                      <FormControlLabel name="penerimaPKH" value="Tidak" control={<Radio />} label="Tidak" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="penerimaSembako">
                      Penerima Sembako
                      {initialData.penerimaSembako !== formik.values.penerimaSembako && <UpdateChip />}
                    </FormLabel>
                    {initialData.penerimaSembako !== formik.values.penerimaSembako && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.penerimaSembako}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="penerimaSembako" value={formik.values.penerimaSembako} onChange={formik.handleChange}>
                      <FormControlLabel name="penerimaSembako" value="Ya" control={<Radio />} label="Ya" />
                      <FormControlLabel name="penerimaSembako" value="Tidak" control={<Radio />} label="Tidak" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl fullWidth>
                    <FormLabel sx={labelStyle} id="penerimaBantuanLainnya">
                      Penerima Bantuan Lainnya
                    </FormLabel>
                    <TextField
                      multiline
                      rows={3}
                      name="penerimaBantuanLainnya"
                      value={formik.values.penerimaBantuanLainnya}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" type="submit" fullWidth>
                      Verifikasi
                    </Button>
                  </Box> */}
                  <ConfirmVerifikasiDialog title="Verifikasi Data" />
                </SubCard>
              )}
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </>
  );
};

FormVerifikasiIndividu.propTypes = {
  isEdit: PropTypes.bool,
  initialData: PropTypes.any
};

export default FormVerifikasiIndividu;