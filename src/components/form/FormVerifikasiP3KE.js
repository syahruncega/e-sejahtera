import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';

import MainCard from 'components/ui-component/cards/MainCard';
import SubCard from 'components/ui-component/cards/SubCard';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/system';
import { toast } from 'react-hot-toast';
import { TaskAlt, TaskAltTwoTone, VerifiedTwoTone, VerifiedUserTwoTone } from '@mui/icons-material';

const validationSchema = yup.object({
  desilKesejahteraan: yup.string().required(''),
  kepalaKeluarga: yup.string().required(''),
  nik: yup.string().required(''),
  alamat: yup.string().required(''),
  jenisKelamin: yup.string().required(''),
  tanggalLahir: yup.date().required(''),
  pekerjaan: yup.string().required(''),
  pendidikan: yup.string().required(''),
  simpanan: yup.string().required(''),
  kepemilikanRumah: yup.string().required(''),
  jenisDinding: yup.string().required(''),
  jenisLantai: yup.string().required(''),
  sumberPenerangan: yup.string().required(''),
  sumberAirMinum: yup.string().required(''),
  fasilitasBuangAirBesar: yup.string().required(''),
  bahanBakarMemasak: yup.string().required(''),
  penerimaBPNT: yup.string().required(''),
  penerimaBPUM: yup.string().required(''),
  penerimaBST: yup.string().required(''),
  penerimaPKH: yup.string().required(''),
  penerimaSembako: yup.string().required('')
});

const FormVerifikasiP3KE = ({ isEdit, initialData, readOnly = false }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      desilKesejahteraan: initialData?.desilKesejahteraan ?? '1',
      kepalaKeluarga: initialData?.kepalaKeluarga ?? '',
      nik: initialData?.nik ?? '',
      alamat: initialData?.alamat ?? '',
      jenisKelamin: initialData?.jenisKelamin ?? 'Laki-laki',
      tanggalLahir: initialData?.tanggalLahir ? new Date(initialData.tanggalLahir) : new Date(),
      pekerjaan: initialData?.pekerjaan ?? 'Tidak/Belum Bekerja',
      pendidikan: initialData?.pendidikan ?? 'Tidak/Belum Sekolah',
      simpanan: initialData?.simpanan ?? 'Tidak',
      kepemilikanRumah: initialData?.kepemilikanRumah ?? 'Lainnya',
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
      penerimaSembako: initialData?.penerimaSembako ?? 'Tidak'
    },
    validationSchema,
    onSubmit: (values) => {
      toast.success('Data berhasil diverifikasi');
    }
  });

  const [value, setValue] = useState(formik.values.tanggalLahir);

  return (
    <>
      <MainCard title={readOnly ? 'Data Mentah (Read Only)' : 'Data Verifikasi'}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <SubCard>
                <FormControl disabled>
                  <FormLabel sx={{ fontWeight: 500 }} id="tujuan">
                    Tujuan
                  </FormLabel>
                  <RadioGroup row aria-labelledby="tujuan" name="tujuan" defaultValue="Pelaksanaan Program Bantuan/Subsidi">
                    <FormControlLabel
                      value="Pelaksanaan Program Bantuan/Subsidi"
                      control={<Radio />}
                      label="Pelaksanaan Program Bantuan/Subsidi"
                    />
                    <FormControlLabel
                      value="Perencanaan Anggaran/Kegiatan Program"
                      control={<Radio />}
                      label="Perencanaan Anggaran/Kegiatan Program"
                    />
                    <FormControlLabel value="Pemadanan/Sinkronisasi" control={<Radio />} label="Pemadanan/Sinkronisasi" />
                    <FormControlLabel
                      value="Survey Pemutakhiran/Verifikasi-Validasi/Musdes-Muskel"
                      control={<Radio />}
                      label="Survey Pemutakhiran/Verifikasi-Validasi/Musdes-Muskel"
                    />
                    <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl disabled>
                  <FormLabel sx={{ fontWeight: 500 }} id="jenisData">
                    Jenis Data
                  </FormLabel>
                  <RadioGroup row aria-labelledby="jenisData" name="jenisData" defaultValue="Dengan Nama/Alamat (BNBA)">
                    <FormControlLabel value="Dengan Nama/Alamat (BNBA)" control={<Radio />} label="Dengan Nama/Alamat (BNBA)" />
                    <FormControlLabel value="Tanpa" control={<Radio />} label="Tanpa" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="satuanData">
                    Satuan Data
                  </FormLabel>
                  <RadioGroup row aria-labelledby="satuanData" name="satuanData" defaultValue="Dengan Nama/Alamat (BNBA)">
                    <FormControlLabel value="Keluarga" control={<Radio />} label="Keluarga" />
                    <FormControlLabel value="Individu" control={<Radio />} label="Individu" />
                    <FormControlLabel value="Provinsi" control={<Radio />} label="Provinsi" />
                    <FormControlLabel value="Kabupaten/Kota" control={<Radio />} label="Kabupaten/Kota" />
                    <FormControlLabel value="Kecamatan" control={<Radio />} label="Kecamatan" />
                    <FormControlLabel value="Desa/Kelurahan" control={<Radio />} label="Desa/Kelurahan" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="batasanSpasial">
                    Batasan Spasial
                  </FormLabel>
                  <FormGroup row>
                    <FormControlLabel control={<Checkbox />} label="Provinsi" value="Provinsi" />
                    <FormControlLabel control={<Checkbox />} label="Kabupaten/Kota" value="Kabupaten/Kota" />
                    <FormControlLabel control={<Checkbox />} label="Kecamatan" value="Kecamatan" />
                    <FormControlLabel control={<Checkbox />} label="Kelurahan" value="Kelurahan" />
                  </FormGroup>
                </FormControl>
                <FormHelperText>Boleh diisi lebih dari satu.</FormHelperText>
              </SubCard>
            </Grid> */}
            <Grid item xs={12}>
              <SubCard title="Keluarga/Kepala Keluarga">
                <FormControl disabled>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="desil">
                    Status Kesejahteraan/Desil
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="desil"
                    value={formik.values.desilKesejahteraan}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel name="desilKesejahteraan" value="1" control={<Radio readOnly={readOnly} />} label="1" />
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
                  <FormLabel
                    sx={{
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'black'
                    }}
                    id="nama"
                  >
                    Nama
                    {initialData.kepalaKeluarga !== formik.values.kepalaKeluarga && (
                      <TaskAltTwoTone fontSize="14" color="primary" sx={{ marginLeft: 1 }} />
                    )}
                  </FormLabel>
                  <TextField
                    InputProps={{ readOnly }}
                    placeholder="Masukkan nama kepala keluarga"
                    name="kepalaKeluarga"
                    value={formik.values.kepalaKeluarga}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      fontWeight: 500,
                      color: 'black'
                    }}
                    id="nik"
                  >
                    NIK
                  </FormLabel>
                  <TextField InputProps={{ readOnly }} name="nik" value={formik.values.nik} onChange={formik.handleChange} />
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      fontWeight: 500,
                      color: 'black'
                    }}
                    id="alamat"
                  >
                    Alamat
                  </FormLabel>
                  <TextField
                    InputProps={{ readOnly }}
                    multiline
                    rows={3}
                    name="alamat"
                    value={formik.values.alamat}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel
                    sx={{
                      fontWeight: 500,
                      color: 'black'
                    }}
                    id="jenisKelamin"
                  >
                    Jenis Kelamin
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="jenisKelamin"
                    name="jenisKelamin"
                    value={formik.values.jenisKelamin}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel value="Laki-laki" control={<Radio />} label="Laki-laki" />
                    <FormControlLabel value="Perempuan" control={<Radio />} label="Perempuan" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="tanggalLahir">
                    Tanggal Lahir
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          name="tanggalLahir"
                          value={formik.values.tanggalLahir}
                          onChange={formik.handleChange}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                {/* <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="statusKawin">
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
                  <FormLabel
                    sx={{ fontWeight: 500, color: initialData.pekerjaan !== formik.values.pekerjaan ? 'secondary' : 'black' }}
                    id="pekerjaan"
                  >
                    Pekerjaan
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="pekerjaan"
                    value={formik.values.pekerjaan}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
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
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="pendidikan">
                    Pendidikan
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="pendidikan"
                    value={formik.values.pendidikan}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
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
                    <FormControlLabel name="pendidikan" value="Tamat Perguruan Tinggi" control={<Radio />} label="Tamat Perguruan Tinggi" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="simpanan">
                    Tabungan/Simpanan
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="simpanan"
                    value={formik.values.simpanan}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel name="simpanan" value="Ya" control={<Radio />} label="Ya" />
                    <FormControlLabel name="simpanan" value="Tidak" control={<Radio />} label="Tidak" />
                  </RadioGroup>
                </FormControl>
                <FormHelperText>Uang kontan, perhiasan, hewan ternak, hasil kebun, dll.</FormHelperText>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="kepemilikanRumah">
                    Kepemilikan rumah/bangunan tempat tinggal
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="kepemilikanRumah"
                    value={formik.values.kepemilikanRumah}
                    onChange={readOnly ? () => {} : formik.handleChange}
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
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="jenisDinding">
                    Jenis dinding rumah terluas
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="jenisDinding"
                    value={formik.values.jenisDinding}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel nama="jenisDinding" value="Tembok" control={<Radio />} label="Tembok" />
                    <FormControlLabel nama="jenisDinding" value="Kayu/Papan" control={<Radio />} label="Kayu/Papan" />
                    <FormControlLabel nama="jenisDinding" value="Seng" control={<Radio />} label="Seng" />
                    <FormControlLabel nama="jenisDinding" value="Bambu" control={<Radio />} label="Bambu" />
                    <FormControlLabel nama="jenisDinding" value="Lainnya" control={<Radio />} label="Lainnya" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="jenisLantai">
                    Jenis lantai rumah terluas
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="jenisLantai"
                    value={formik.values.jenisLantai}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
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
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="sumberPenerangan">
                    Sumber penerangan utama
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="sumberPenerangan"
                    value={formik.values.sumberPenerangan}
                    onChange={readOnly ? () => {} : formik.handleChange}
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
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="sumberAirMinum">
                    Sumber air minum utama
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="sumberAirMinum"
                    value={formik.values.sumberAirMinum}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
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
                      value="Air Permukaan (Sungai, Danau, dll)"
                      control={<Radio />}
                      label="Air Permukaan (Sungai, Danau, dll)"
                    />
                    <FormControlLabel value="Air Hujan" control={<Radio />} label="Air Hujan" />
                    <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="fasilitasBAB">
                    Memiliki fasilitas tempat buang air besar
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="fasilitasBAB"
                    value={formik.values.fasilitasBuangAirBesar}
                    onChange={readOnly ? () => {} : formik.handleChange}
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
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="sumberBahanBakar">
                    Sumber Bahan Bakar Untuk Memasak
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="sumberBahanBakar"
                    value={formik.values.bahanBakarMemasak}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel name="bahanBakarMemasak" value="Listrik/Gas" control={<Radio />} label="Listrik/Gas" />
                    <FormControlLabel name="bahanBakarMemasak" value="Minyak Tanah" control={<Radio />} label="Minyak Tanah" />
                    <FormControlLabel name="bahanBakarMemasak" value="Arang/Kayu" control={<Radio />} label="Arang/Kayu" />
                    <FormControlLabel name="bahanBakarMemasak" value="Lainnya" control={<Radio />} label="Lainnya" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="penerimaBPNT">
                    Penerima BPNT
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="penerimaBPNT"
                    value={formik.values.penerimaBPNT}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel name="penerimaBPNT" value="Ya" control={<Radio />} label="Ya" />
                    <FormControlLabel name="penerimaBPNT" value="Tidak" control={<Radio />} label="Tidak" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="penerimaBPUM">
                    Penerima BPUM
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="penerimaBPUM"
                    value={formik.values.penerimaBPUM}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel name="penerimaBPUM" value="Ya" control={<Radio />} label="Ya" />
                    <FormControlLabel name="penerimaBPUM" value="Tidak" control={<Radio />} label="Tidak" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="penerimaBST">
                    Penerima BST
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="penerimaBST"
                    value={formik.values.penerimaBST}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel name="penerimaBST" value="Ya" control={<Radio />} label="Ya" />
                    <FormControlLabel name="penerimaBST" value="Tidak" control={<Radio />} label="Tidak" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="penerimaPKH">
                    Penerima PKH
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="penerimaPKH"
                    value={formik.values.penerimaPKH}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel name="penerimaPKH" value="Ya" control={<Radio />} label="Ya" />
                    <FormControlLabel name="penerimaPKH" value="Tidak" control={<Radio />} label="Tidak" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="penerimaSembako">
                    Penerima SEMBAKO
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="penerimaSembako"
                    value={formik.values.penerimaSembako}
                    onChange={readOnly ? () => {} : formik.handleChange}
                  >
                    <FormControlLabel name="penerimaSembako" value="Ya" control={<Radio />} label="Ya" />
                    <FormControlLabel name="penerimaSembako" value="Tidak" control={<Radio />} label="Tidak" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                {!readOnly && (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" type="submit">
                      Verifikasi
                    </Button>{' '}
                  </Box>
                )}
              </SubCard>
            </Grid>
            {/* <Grid item xs={12}>
              <SubCard title="Individu/Anggota Keluarga">
                <FormControl fullWidth>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="nama">
                    Nama
                  </FormLabel>
                  <TextField placeholder="Masukkan nama lengkap" />
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl fullWidth>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="nik">
                    NIK
                  </FormLabel>
                  <TextField />
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl fullWidth>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="alamat">
                    Alamat
                  </FormLabel>
                  <TextField multiline rows={3} />
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="jenisKelamin">
                    Jenis Kelamin
                  </FormLabel>
                  <RadioGroup row aria-labelledby="jenisKelamin" name="jenisKelamin" defaultValue="Laki-laki">
                    <FormControlLabel value="Laki-laki" control={<Radio />} label="Laki-laki" />
                    <FormControlLabel value="Perempuan" control={<Radio />} label="Perempuan" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="tanggalLahir">
                    Tanggal Lahir
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="statusKawin">
                    Status Kawin
                  </FormLabel>
                  <RadioGroup row aria-labelledby="statusKawin" name="statusKawin">
                    <FormControlLabel value="Belum Kawin" control={<Radio />} label="Belum Kawin" />
                    <FormControlLabel value="Kawin" control={<Radio />} label="Kawin" />
                    <FormControlLabel value="Cerai Hidup" control={<Radio />} label="Cerai Hidup" />
                    <FormControlLabel value="Cerai Mati" control={<Radio />} label="Cerai Mati" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="pekerjaan">
                    Pekerjaan
                  </FormLabel>
                  <RadioGroup row aria-labelledby="pekerjaan" name="pekerjaan">
                    <FormControlLabel value="Tidak/Belum Bekerja" control={<Radio />} label="Tidak/Belum Bekerja" />
                    <FormControlLabel value="Petain" control={<Radio />} label="Petain" />
                    <FormControlLabel value="Nelayan" control={<Radio />} label="Nelayan" />
                    <FormControlLabel value="Pedagang" control={<Radio />} label="Pedagang" />
                    <FormControlLabel value="Pegawai Swasta" control={<Radio />} label="Pegawai Swasta" />
                    <FormControlLabel value="Wiraswasta" control={<Radio />} label="Wiraswasta" />
                    <FormControlLabel value="Pensiunan" control={<Radio />} label="Pensiunan" />
                    <FormControlLabel value="Pekerja Lepas" control={<Radio />} label="Pekerja Lepas" />
                    <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ marginY: 2 }} />
                <FormControl>
                  <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="pendidikan">
                    Pendidikan
                  </FormLabel>
                  <RadioGroup row aria-labelledby="pendidikan" name="pendidikan">
                    <FormControlLabel value="Tidak/Belum Sekolah" control={<Radio />} label="Tidak/Belum Sekolah" />
                    <FormControlLabel value="Tidak Tamat SD" control={<Radio />} label="Tidak Tamat SD" />
                    <FormControlLabel value="Masih SD" control={<Radio />} label="Masih SD" />
                    <FormControlLabel value="Tamat SD" control={<Radio />} label="Tamat SD" />
                    <FormControlLabel value="Masih SMP" control={<Radio />} label="Masih SMP" />
                    <FormControlLabel value="Tamat SMP" control={<Radio />} label="Tamat SMP" />
                    <FormControlLabel value="Masih SMA" control={<Radio />} label="Masih SMA" />
                    <FormControlLabel value="Tamat SMA" control={<Radio />} label="Tamat SMA" />
                    <FormControlLabel value="Masih PT/Akademi" control={<Radio />} label="Masih PT/Akademi" />
                    <FormControlLabel value="Tamat PT/Akademi" control={<Radio />} label="Tamat PT/Akademi" />
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid> */}
          </Grid>
        </form>
      </MainCard>
    </>
  );
};

FormVerifikasiP3KE.propTypes = {
  isEdit: PropTypes.bool,
  readOnly: PropTypes.bool,
  initialData: PropTypes.any
};

export default FormVerifikasiP3KE;
