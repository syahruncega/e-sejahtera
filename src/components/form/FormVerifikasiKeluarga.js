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
import ConfirmVerifikasiDialog from 'components/dialog/ConfirmVerifikasiDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { updateIndividu } from 'store/slices/individu';
import { createKeluargaVerifikasi, updateKeluargaVerfikasi } from 'store/slices/keluarga-verifikasi';
import { updateKeluarga } from 'store/slices/keluarga';

const UpdateChip = () => (
  <Chip
    variant="outlined"
    label="DIUBAH"
    size="small"
    sx={{ ml: 1, height: 16, fontSize: 12, borderWidth: 2, color: 'warning.dark', borderColor: 'warning.dark' }}
  />
);

const validationSchema = yup.object({
  id: yup.number().required('ID Wajib diisi').typeError('ID harus berupa angka'),
  idKeluarga: yup.string().required('ID Keluarga Wajib diisi'),
  provinsiId: yup.string().required('Provinsi ID wajib diisi'),
  kabupatenKotaId: yup.string().required('Kabupaten Kota ID wajib diisi'),
  kecamatanId: yup.string().required('Kecamatan ID wajib diisi'),
  kelurahanId: yup.string().required('Kelurahan ID wajib diisi'),
  desilKesejahteraan: yup.string().required('Desil kesejahteraan wajib diisi'),
  kepalaKeluarga: yup.string().required('Kepala keluarga wajib diisi'),
  nik: yup.string().required('NIK wajib diisi'),
  alamat: yup.string().required('Alamat wajib diisi'),
  padanDukcapil: yup.string().required('Padan Dukcapil wajib diisi'),
  jenisKelamin: yup.string().required('Jenis Kelamin wajib diisi'),
  tanggalLahir: yup.date().required('Tanggal Lahir wajib diisi'),
  pekerjaan: yup.string().required('Pekerjaan wajib diisi'),
  pendidikan: yup.string().required('Pendidikan wajib diisi'),
  simpanan: yup.string().required('Tabungan/simpanan wajib diisi'),
  jenisAtap: yup.string().required('Jenis atap rumah terluas wajib diisi'),
  kepemilikanRumah: yup.string().required('Kepemilikan rumah/bangunan tempat tinggal wajib diisi'),
  jenisDinding: yup.string().required('Jenis dinding rumah terluas wajib diisi'),
  jenisLantai: yup.string().required('Jenis lantai rumah terluas wajib diisi'),
  sumberPenerangan: yup.string().required('Sumber penerangan utama wajib diisi'),
  sumberAirMinum: yup.string().required('Sumber air minum utama wajib diisi'),
  fasilitasBuangAirBesar: yup.string().required('Fasilitas tempat buang air besar besar wajib diisi'),
  bahanBakarMemasak: yup.string().required('Sumber bahan bakar untuk memasak wajib diisi'),
  penerimaBPNT: yup.string().required('Peneriman bantuan pangan non tunai (BPNT) wajib diisi'),
  penerimaBPUM: yup.string().required('Penerima Bantuan Produktif Usaha Mikro (BPUM) wajib diisi'),
  penerimaBST: yup.string().required('Penerima Bantuan Sosial Tunai (BST) wajib diisi'),
  penerimaPKH: yup.string().required('Penerima Program Keluarga Harapan (PKH) wajib diisi'),
  penerimaSembako: yup.string().required('Penerima Bantuan Sembako wajib diisi'),
  statusResponden: yup.mixed().oneOf(['Dapat Diverifikasi', 'Tidak Dapat Ditemui', 'Meninggal Dunia']),
  penerimaLainnya: yup.string().nullable().optional(),
  userId: yup.number().required('User ID wajib diisi').typeError('User ID harus berupa angka'),
  mahasiswaId: yup.number().required('Mahasiswa ID wajib diisi').typeError('Mahasiswa ID harus berupa angka')
});

const FormVerifikasiKeluarga = ({ isEdit, initialData }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const queryCreateKeluargaVerifikasi = useMutation({
    mutationFn: (newKeluargaVerifikasi) => {
      updateKeluarga(initialData.id, { ...initialData, statusVerifikasi: 1 });
      createKeluargaVerifikasi(newKeluargaVerifikasi);
    },
    onSuccess: async (newKeluargaVerifikasi) => {
      queryClient.invalidateQueries(['individuById']);
      await router.push({ pathname: '/p3ke/dashboard/verifikasi-p3ke/anggota-keluarga', query: { idKeluarga: router.query.idKeluarga } });
    }
  });

  const queryUpdateKeluargaVerifikasi = useMutation({
    mutationFn: (newKeluargaVerifikasi) => updateKeluargaVerfikasi(initialData.id, newKeluargaVerifikasi),
    onSuccess: (newKeluargaVerifikasi) => {
      queryClient.invalidateQueries(['inidividuById']);
    }
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: initialData.id,
      idKeluarga: initialData.idKeluarga,
      provinsiId: initialData.provinsiId,
      kabupatenKotaId: initialData.kabupatenKotaId,
      kecamatanId: initialData.kecamatanId,
      kelurahanId: initialData.kelurahanId,
      desilKesejahteraan: initialData.desilKesejahteraan ?? '',
      kepalaKeluarga: initialData?.kepalaKeluarga ?? '',
      nik: initialData?.nik ?? '',
      alamat: initialData?.alamat ?? '',
      padanDukcapil: initialData?.padanDukcapil ?? 'Ya',
      jenisKelamin: initialData?.jenisKelamin ?? 'Laki-laki',
      tanggalLahir: initialData?.tanggalLahir ? new Date(initialData.tanggalLahir) : new Date(),
      pekerjaan: initialData?.pekerjaan ?? 'Tidak/Belum Bekerja',
      pendidikan: initialData?.pendidikan ?? 'Tidak/Belum Sekolah',
      simpanan: initialData?.simpanan ?? 'Tidak',
      kepemilikanRumah: initialData?.kepemilikanRumah ?? 'Lainnya',
      jenisAtap: initialData?.jenisAtap ?? 'Lainnya',
      jenisDinding: initialData?.jenisDinding ?? 'Lainnya',
      jenisLantai: initialData?.jenisLantai ?? 'Lainnya',
      sumberPenerangan: initialData?.sumberPenerangan ?? 'Non-Listrik',
      sumberAirMinum: initialData?.sumberAirMinum ?? 'Lainnya',
      fasilitasBuangAirBesar: initialData?.fasilitasBuangAirBesar ?? 'Lainnya',
      bahanBakarMemasak: initialData?.bahanBakarMemasak ?? 'Lainnya',
      penerimaBPNT: initialData?.penerimaBPNT ?? 'Tidak',
      penerimaBPUM: initialData?.penerimaBPUM ?? 'Tidak',
      penerimaBST: initialData?.penerimaBST ?? 'Tidak',
      penerimaPKH: initialData?.penerimaPKH ?? 'Tidak',
      penerimaSembako: initialData?.penerimaSembako ?? 'Tidak',
      statusResponden: 'Dapat Diverifikasi',
      penerimaLainnya: '',
      userId: 7,
      mahasiswaId: 2
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        ...values,
        penerimaLainnya: values.penerimaLainnya || '-',
        tanggalLahir: dayjs(new Date(values.tanggalLahir)).format('MM/DD/YYYY')
      };
      toast.promise(
        initialData.statusResponden === 1
          ? queryUpdateKeluargaVerifikasi.mutateAsync(data)
          : queryCreateKeluargaVerifikasi.mutateAsync(data),
        {
          loading: 'Sedang menyimpan...',
          success: `Data Individu berhasil ${isEdit ? 'diubah' : 'diverifikasi'} `,
          error: (err) => `${err.message}`
        },
        { id: 'toast' }
      );
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
        <form>
          <Grid container spacing={3}>
            <Grid item lg={12} xs={12}>
              <SubCard title="Status Responden">
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="statusResponden"
                        value={formik.values.statusResponden}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel
                          name="statusResponden"
                          value="Dapat Diverifikasi"
                          control={<Radio />}
                          label="Dapat Diverifikasi"
                        />
                        <FormControlLabel
                          name="statusResponden"
                          value="Tidak Dapat Ditemui"
                          control={<Radio />}
                          label="Tidak Dapat Temui"
                        />
                        <FormControlLabel name="statusResponden" value="Meninggal Dunia" control={<Radio />} label="Meninggal Dunia" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {formik.values.statusResponden !== 'Dapat Diverifikasi' && (
                    <Grid item>
                      <ConfirmVerifikasiDialog
                        handleFunc={formik.handleSubmit}
                        title="Verifikasi Keluarga"
                        isLoading={queryCreateKeluargaVerifikasi.isLoading || queryUpdateKeluargaVerifikasi.isLoading}
                      />
                    </Grid>
                  )}
                </Grid>
              </SubCard>
            </Grid>
            <Grid item lg={12} xs={12} sx={{ backdropFilter: 'blur(6px)' }}>
              {formik.values.statusResponden === 'Dapat Diverifikasi' && (
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
                      {initialData.kepalaKeluarga !== formik.values.kepalaKeluarga && <UpdateChip />}
                    </FormLabel>
                    {initialData.kepalaKeluarga !== formik.values.kepalaKeluarga && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.kepalaKeluarga}</FormHelperText>
                    )}

                    <TextField
                      placeholder="Masukkan nama kepala keluarga"
                      name="kepalaKeluarga"
                      value={formik.values.kepalaKeluarga}
                      onChange={formik.handleChange}
                    />
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
                    <RadioGroup
                      row
                      aria-labelledby="padanDukcapil"
                      name="padanDukcapil"
                      value={formik.values.padanDukcapil}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel value="Ya" control={<Radio />} label="Ya" />
                      <FormControlLabel value="Tidak" control={<Radio />} label="Tidak" />
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
                  {/* <FormControl>
                  <FormLabel sx={labelStyle} id="statusKawin">
                    Status Kawin
                  </FormLabel>
                  <RadioGroup row aria-labelledby="statusKawin" value={formik.values.tanggalLahir} onChange={formik.handleChange}>
                    <FormControlLabel value="Belum Kawin" control={<Radio />} label="Belum Kawin" />
                    <FormControlLabel value="Kawin" control={<Radio />} label="Kawin" />
                    <FormControlLabel value="Cerai Hidup" control={<Radio />} label="Cerai Hidup" />
                    <FormControlLabel value="Cerai Mati" control={<Radio />} label="Cerai Mati" />
                  </RadioGroup>
                </FormControl> */}
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
                    <FormLabel sx={labelStyle} id="simpanan">
                      Tabungan/Simpanan
                      {initialData.simpanan !== formik.values.simpanan && <UpdateChip />}
                    </FormLabel>
                    {initialData.simpanan !== formik.values.simpanan && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.simpanan}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="simpanan" value={formik.values.simpanan} onChange={formik.handleChange}>
                      <FormControlLabel name="simpanan" value="Ya" control={<Radio />} label="Ya" />
                      <FormControlLabel name="simpanan" value="Tidak" control={<Radio />} label="Tidak" />
                    </RadioGroup>
                  </FormControl>
                  <FormHelperText>Uang kontan, perhiasan, hewan ternak, hasil kebun, dll.</FormHelperText>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="kepemilikanRumah">
                      Kepemilikan rumah/bangunan tempat tinggal
                      {initialData.kepemilikanRumah !== formik.values.kepemilikanRumah && <UpdateChip />}
                    </FormLabel>
                    {initialData.kepemilikanRumah !== formik.values.kepemilikanRumah && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.kepemilikanRumah}</FormHelperText>
                    )}
                    <RadioGroup
                      row
                      aria-labelledby="kepemilikanRumah"
                      value={formik.values.kepemilikanRumah}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel nama="kepemilikanRumah" value="Milik Sendiri" control={<Radio />} label="Milik Sendiri" />
                      <FormControlLabel nama="kepemilikanRumah" value="Kontrak/Sewa" control={<Radio />} label="Kontrak/Sewa" />
                      <FormControlLabel nama="kepemilikanRumah" value="Bebas Sewa" control={<Radio />} label="Bebas Sewa" />
                      <FormControlLabel nama="kepemilikanRumah" value="Menumpang" control={<Radio />} label="Menumpang" />
                      <FormControlLabel nama="kepemilikanRumah" value="Dinas" control={<Radio />} label="Dinas" />
                      <FormControlLabel nama="kepemilikanRumah" value="Lainnya" control={<Radio />} label="Lainnya" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="jenisAtap">
                      Jenis atap rumah terluas
                      {initialData.jenisAtap !== formik.values.jenisAtap && <UpdateChip />}
                    </FormLabel>
                    {initialData.jenisAtap !== formik.values.jenisAtap && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.jenisAtap}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="jenisAtap" value={formik.values.jenisAtap} onChange={formik.handleChange}>
                      <FormControlLabel nama="jenisAtap" value="Beton" control={<Radio />} label="Beton" />
                      <FormControlLabel nama="jenisAtap" value="Asbes/Seng" control={<Radio />} label="Asbes/Seng" />
                      <FormControlLabel nama="jenisAtap" value="Bambu" control={<Radio />} label="Bambu" />
                      <FormControlLabel
                        nama="jenisAtap"
                        value="Jerami/Ijuk/Rumbia/Daun-daunan"
                        control={<Radio />}
                        label="Jerami/Ijuk/Rumbia/Daun-daunan"
                      />
                      <FormControlLabel nama="jenisAtap" value="Genteng" control={<Radio />} label="Genteng" />
                      <FormControlLabel nama="jenisAtap" value="Kayu/Sirap" control={<Radio />} label="Kayu/Sirap" />
                      <FormControlLabel nama="jenisAtap" value="Lainnya" control={<Radio />} label="Lainnya" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="jenisDinding">
                      Jenis dinding rumah terluas
                      {initialData.jenisDinding !== formik.values.jenisDinding && <UpdateChip />}
                    </FormLabel>
                    {initialData.jenisDinding !== formik.values.jenisDinding && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.jenisDinding}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="jenisDinding" value={formik.values.jenisDinding} onChange={formik.handleChange}>
                      <FormControlLabel nama="jenisDinding" value="Tembok" control={<Radio />} label="Tembok" />
                      <FormControlLabel nama="jenisDinding" value="Kayu/Papan" control={<Radio />} label="Kayu/Papan" />
                      <FormControlLabel nama="jenisDinding" value="Seng" control={<Radio />} label="Seng" />
                      <FormControlLabel nama="jenisDinding" value="Bambu" control={<Radio />} label="Bambu" />
                      <FormControlLabel nama="jenisDinding" value="Lainnya" control={<Radio />} label="Lainnya" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="jenisLantai">
                      Jenis lantai rumah terluas
                      {initialData.jenisLantai !== formik.values.jenisLantai && <UpdateChip />}
                    </FormLabel>
                    {initialData.jenisLantai !== formik.values.jenisLantai && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.jenisLantai}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="jenisLantai" value={formik.values.jenisLantai} onChange={formik.handleChange}>
                      <FormControlLabel
                        value="Keramik/Granit/Marmer/Ubin/Tegel/Teraso"
                        control={<Radio />}
                        label="Keramik/Granit/Marmer/Ubin/Tegel/Teraso"
                      />
                      <FormControlLabel name="jenisLantai" value="Semen" control={<Radio />} label="Semen" />
                      <FormControlLabel name="jenisLantai" value="Kayu/Papan" control={<Radio />} label="Kayu/Papan" />
                      <FormControlLabel name="jenisLantai" value="Bambu" control={<Radio />} label="Bambu" />
                      <FormControlLabel name="jenisLantai" value="Tanah" control={<Radio />} label="Tanah" />
                      <FormControlLabel name="jenisLantai" value="Lainnya" control={<Radio />} label="Lainnya" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="sumberPenerangan">
                      Sumber penerangan utama
                      {initialData.sumberPenerangan !== formik.values.sumberPenerangan && <UpdateChip />}
                    </FormLabel>
                    {initialData.sumberPenerangan !== formik.values.sumberPenerangan && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.sumberPenerangan}</FormHelperText>
                    )}
                    <RadioGroup
                      row
                      aria-labelledby="sumberPenerangan"
                      value={formik.values.sumberPenerangan}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        name="sumberPenerangan"
                        value="Listrik Pribadi s/d 900 Watt"
                        control={<Radio />}
                        label="Listrik Pribadi s/d 900 Watt"
                      />
                      <FormControlLabel
                        name="sumberPenerangan"
                        value="Listrik Pribadi > 900 Watt"
                        control={<Radio />}
                        label="Listrik Pribadi > 900 Watt"
                      />
                      <FormControlLabel name="sumberPenerangan" value="Genset/solar Cell" control={<Radio />} label="Genset/solar Cell" />
                      <FormControlLabel name="sumberPenerangan" value="Listrik Bersama" control={<Radio />} label="Listrik Bersama" />
                      <FormControlLabel name="sumberPenerangan" value="Non-Listrik" control={<Radio />} label="Non-Listrik" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="sumberAirMinum">
                      Sumber air minum utama
                      {initialData.sumberAirMinum !== formik.values.sumberAirMinum && <UpdateChip />}
                    </FormLabel>
                    {initialData.sumberAirMinum !== formik.values.sumberAirMinum && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.sumberAirMinum}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="sumberAirMinum" value={formik.values.sumberAirMinum} onChange={formik.handleChange}>
                      <FormControlLabel
                        name="sumberAirMinum"
                        value="Air Kemasan/Isi Ulang"
                        control={<Radio />}
                        label="Air Kemasan/Isi Ulang"
                      />
                      <FormControlLabel name="sumberAirMinum" value="Ledeng/PAM" control={<Radio />} label="Ledeng/PAM" />
                      <FormControlLabel name="sumberAirMinum" value="Sumur Bor" control={<Radio />} label="Sumur Bor" />
                      <FormControlLabel name="sumberAirMinum" value="Sumur Terlindung" control={<Radio />} label="Sumur Terlindung" />
                      <FormControlLabel
                        name="sumberAirMinum"
                        value="Sumur Tidak Terlindung"
                        control={<Radio />}
                        label="Sumur Tidak Terlindung"
                      />
                      <FormControlLabel
                        name="sumberAirMinum"
                        value="Air Permukaan (Sungai, Danau, dll)"
                        control={<Radio />}
                        label="Air Permukaan (Sungai, Danau, dll)"
                      />
                      <FormControlLabel name="sumberAirMinum" value="Air Hujan" control={<Radio />} label="Air Hujan" />
                      <FormControlLabel name="sumberAirMinum" value="Lainnya" control={<Radio />} label="Lainnya" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="fasilitasBuangAirBesar">
                      Memiliki fasilitas tempat buang air besar
                      {initialData.fasilitasBuangAirBesar !== formik.values.fasilitasBuangAirBesar && <UpdateChip />}
                    </FormLabel>
                    {initialData.fasilitasBuangAirBesar !== formik.values.fasilitasBuangAirBesar && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.fasilitasBuangAirBesar}</FormHelperText>
                    )}
                    <RadioGroup
                      row
                      aria-labelledby="fasilitasBuangAirBesar"
                      value={formik.values.fasilitasBuangAirBesar}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        name="fasilitasBuangAirBesar"
                        value="Dengan Sepetic Tank"
                        control={<Radio />}
                        label="Dengan Sepetic Tank"
                      />
                      <FormControlLabel
                        name="fasilitasBuangAirBesar"
                        value="Tanpa Septic Tank"
                        control={<Radio />}
                        label="Tanpa Septic Tank"
                      />
                      <FormControlLabel
                        name="fasilitasBuangAirBesar"
                        value="Tidak, Jamban Umum/Bersama"
                        control={<Radio />}
                        label="Jamban Umum/Bersama"
                      />
                      <FormControlLabel name="fasilitasBuangAirBesar" value="Lainnya" control={<Radio />} label="Lainnya" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="bahanBakarMemasak">
                      Sumber Bahan Bakar Untuk Memasak
                      {initialData.bahanBakarMemasak !== formik.values.bahanBakarMemasak && <UpdateChip />}
                    </FormLabel>
                    {initialData.bahanBakarMemasak !== formik.values.bahanBakarMemasak && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.bahanBakarMemasak}</FormHelperText>
                    )}
                    <RadioGroup
                      row
                      aria-labelledby="bahanBakarMemasak"
                      value={formik.values.bahanBakarMemasak}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel name="bahanBakarMemasak" value="Listrik/Gas" control={<Radio />} label="Listrik/Gas" />
                      <FormControlLabel name="bahanBakarMemasak" value="Minyak Tanah" control={<Radio />} label="Minyak Tanah" />
                      <FormControlLabel name="bahanBakarMemasak" value="Arang/Kayu" control={<Radio />} label="Arang/Kayu" />
                      <FormControlLabel name="bahanBakarMemasak" value="Lainnya" control={<Radio />} label="Lainnya" />
                    </RadioGroup>
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <FormControl>
                    <FormLabel sx={labelStyle} id="penerimaBPNT">
                      Penerima Bantuan Pangan Non Tunai (BPNT)
                      {initialData.penerimaBPNT !== formik.values.penerimaBPNT && <UpdateChip />}
                    </FormLabel>
                    {initialData.penerimaBPNT !== formik.values.penerimaBPNT && (
                      <FormHelperText sx={{ margin: 0 }}>Sebelumnya: {initialData.penerimaBPNT}</FormHelperText>
                    )}
                    <RadioGroup row aria-labelledby="penerimaBPNT" value={formik.values.penerimaBPNT} onChange={formik.handleChange}>
                      <FormControlLabel name="penerimaBPNT" value="Ya" control={<Radio />} label="Ya" />
                      <FormControlLabel name="penerimaBPNT" value="Tidak" control={<Radio />} label="Tidak" />
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
                    <FormLabel sx={labelStyle} id="penerimaLainnya">
                      Penerima Bantuan Lainnya
                    </FormLabel>
                    <TextField
                      multiline
                      rows={3}
                      name="penerimaLainnya"
                      value={formik.values.penerimaLainnya}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                  <Divider sx={{ marginY: 2 }} />
                  <ConfirmVerifikasiDialog
                    title="Verifikasi Keluarga"
                    handleFunc={formik.handleSubmit}
                    isLoading={queryCreateKeluargaVerifikasi.isLoading || queryUpdateKeluargaVerifikasi.isLoading}
                  />
                </SubCard>
              )}
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </>
  );
};

FormVerifikasiKeluarga.propTypes = {
  isEdit: PropTypes.bool,
  initialData: PropTypes.any
};

export default FormVerifikasiKeluarga;
