// material-ui
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'components/ui-component/cards/MainCard';

// assets

import { FormattedMessage } from 'react-intl';
import { IconSearch } from '@tabler/icons';
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SubCard from 'components/ui-component/cards/SubCard';

const ReviewPage = () => {
  const [value, setValue] = useState(null);

  const pageProps = {
    title: 'Review',
    navigation: [
      { title: <FormattedMessage id="verifikasi-p3ke" defaultMessage="Verifikasi P3KE" />, url: '/dashboard/verifikasi-p3ke' },
      { title: <FormattedMessage id="review" defaultMessage="Review" />, url: '/dashboard/verifikasi-p3ke/review' }
    ]
  };

  // Success
  return (
    <>
      <Page {...pageProps}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MainCard title="Data Pembanding">
              <Grid container spacing={3}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <SubCard title="Keluarga/Kepala Keluarga">
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="desil">
                        Status Kesejahteraan/Desil
                      </FormLabel>
                      <RadioGroup row aria-labelledby="desil" name="desil">
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                        <FormControlLabel value="4+" control={<Radio />} label="4+" />
                        <FormControlLabel value="5" control={<Radio />} label="5" />
                        <FormControlLabel value="6" control={<Radio />} label="6" />
                        <FormControlLabel value="7" control={<Radio />} label="7" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
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
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="tabungan">
                        Tabungan/Simpanan
                      </FormLabel>
                      <RadioGroup row aria-labelledby="tabungan" name="tabungan">
                        <FormControlLabel value="Ya" control={<Radio />} label="Ya" />
                        <FormControlLabel value="Tidak" control={<Radio />} label="Tidak" />
                      </RadioGroup>
                    </FormControl>
                    <FormHelperText>Uang kontan, perhiasan, hewan ternak, hasil kebun, dll.</FormHelperText>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="kepemilikanRumah">
                        Kepemilikan rumah/bangunan tempat tinggal
                      </FormLabel>
                      <RadioGroup row aria-labelledby="kepemilikanRumah" name="kepemilikanRumah">
                        <FormControlLabel value="Milik Sendiri" control={<Radio />} label="Milik Sendiri" />
                        <FormControlLabel value="Kontrak/Sewa" control={<Radio />} label="Kontrak/Sewa" />
                        <FormControlLabel value="Bebas Sewa" control={<Radio />} label="Bebas Sewa" />
                        <FormControlLabel value="Menumpang" control={<Radio />} label="Menumpang" />
                        <FormControlLabel value="Dinas" control={<Radio />} label="Dinas" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="jenisDinding">
                        Jenis dinding rumah terluas
                      </FormLabel>
                      <RadioGroup row aria-labelledby="jenisDinding" name="jenisDinding">
                        <FormControlLabel value="Tembok" control={<Radio />} label="Tembok" />
                        <FormControlLabel value="Kayu/Papan" control={<Radio />} label="Kayu/Papan" />
                        <FormControlLabel value="Seng" control={<Radio />} label="Seng" />
                        <FormControlLabel value="Bambu" control={<Radio />} label="Bambu" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="jenisLantai">
                        Jenis lantai rumah terluas
                      </FormLabel>
                      <RadioGroup row aria-labelledby="jenisLantai" name="jenisLantai">
                        <FormControlLabel
                          value="Keramik/Granit/Marmer/Ubin/Tegel/Teraso"
                          control={<Radio />}
                          label="Keramik/Granit/Marmer/Ubin/Tegel/Teraso"
                        />
                        <FormControlLabel value="Semen" control={<Radio />} label="Semen" />
                        <FormControlLabel value="Kayu/Papan" control={<Radio />} label="Kayu/Papan" />
                        <FormControlLabel value="Bambu" control={<Radio />} label="Bambu" />
                        <FormControlLabel value="Tanah" control={<Radio />} label="Tanah" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="sumberPenerangan">
                        Sumber penerangan utama
                      </FormLabel>
                      <RadioGroup row aria-labelledby="sumberPenerangan" name="sumberPenerangan">
                        <FormControlLabel value="Listrik Pribadi 900W" control={<Radio />} label="Listrik Pribadi 900W" />
                        <FormControlLabel value="Listrik Pribadi > 900 W" control={<Radio />} label="Listrik Pribadi > 900 W" />
                        <FormControlLabel value="Genset/Solar Cell" control={<Radio />} label="Genset/Solar Cell" />
                        <FormControlLabel value="Listrik Bersama" control={<Radio />} label="Listrik Bersama" />
                        <FormControlLabel value="Non Listrik" control={<Radio />} label="Non Listrik" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="sumberAirMinum">
                        Sumber air minum utama
                      </FormLabel>
                      <RadioGroup row aria-labelledby="sumberAirMinum" name="sumberAirMinum">
                        <FormControlLabel value="Air Kemasan/Isi Ulang" control={<Radio />} label="Air Kemasan/Isi Ulang" />
                        <FormControlLabel value="Ledeng/PAM" control={<Radio />} label="Ledeng/PAM" />
                        <FormControlLabel value="Sumur Bor" control={<Radio />} label="Sumur Bor" />
                        <FormControlLabel value="Sumur Terlindung" control={<Radio />} label="Sumur Terlindung" />
                        <FormControlLabel value="Sumur Tidak Terlindung" control={<Radio />} label="Sumur Tidak Terlindung" />
                        <FormControlLabel
                          value="Air Permukaan (Sungai, Danau dan lain sebagainya"
                          control={<Radio />}
                          label="Air Permukaan (Sungai, Danau dan lain sebagainya"
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
                      <RadioGroup row aria-labelledby="fasilitasBAB" name="fasilitasBAB">
                        <FormControlLabel value="Dengan Sepetic Tank" control={<Radio />} label="Dengan Sepetic Tank" />
                        <FormControlLabel value="Tanpa Septic Tank" control={<Radio />} label="Tanpa Septic Tank" />
                        <FormControlLabel value="Jamban Umum/Bersama" control={<Radio />} label="Jamban Umum/Bersama" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="sumberBahanBakar">
                        Sumber Bahan Bakar Untuk Memasak
                      </FormLabel>
                      <RadioGroup row aria-labelledby="sumberBahanBakar" name="sumberBahanBakar">
                        <FormControlLabel value="Listrik/Gas" control={<Radio />} label="Listrik/Gas" />
                        <FormControlLabel value="Minyak Tanah" control={<Radio />} label="Minyak Tanah" />
                        <FormControlLabel value="Arang Kayu" control={<Radio />} label="Arang Kayu" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="penerimaBansos">
                        Penerima Program Perlindungan Sosial (Bansos/Subsidi)
                      </FormLabel>
                      <RadioGroup row aria-labelledby="penerimaBansos" name="penerimaBansos">
                        <FormControlLabel value="PKH" control={<Radio />} label="PKH" />
                        <FormControlLabel value="Sembako" control={<Radio />} label="Sembako" />
                        <FormControlLabel value="BPNT" control={<Radio />} label="BPNT" />
                        <FormControlLabel value="Minyak Goreng" control={<Radio />} label="Minyak Goreng" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                  </SubCard>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Data Verifikasi">
              <Grid container spacing={3}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <SubCard title="Keluarga/Kepala Keluarga">
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="desil">
                        Status Kesejahteraan/Desil
                      </FormLabel>
                      <RadioGroup row aria-labelledby="desil" name="desil">
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                        <FormControlLabel value="4+" control={<Radio />} label="4+" />
                        <FormControlLabel value="5" control={<Radio />} label="5" />
                        <FormControlLabel value="6" control={<Radio />} label="6" />
                        <FormControlLabel value="7" control={<Radio />} label="7" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
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
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="tabungan">
                        Tabungan/Simpanan
                      </FormLabel>
                      <RadioGroup row aria-labelledby="tabungan" name="tabungan">
                        <FormControlLabel value="Ya" control={<Radio />} label="Ya" />
                        <FormControlLabel value="Tidak" control={<Radio />} label="Tidak" />
                      </RadioGroup>
                    </FormControl>
                    <FormHelperText>Uang kontan, perhiasan, hewan ternak, hasil kebun, dll.</FormHelperText>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="kepemilikanRumah">
                        Kepemilikan rumah/bangunan tempat tinggal
                      </FormLabel>
                      <RadioGroup row aria-labelledby="kepemilikanRumah" name="kepemilikanRumah">
                        <FormControlLabel value="Milik Sendiri" control={<Radio />} label="Milik Sendiri" />
                        <FormControlLabel value="Kontrak/Sewa" control={<Radio />} label="Kontrak/Sewa" />
                        <FormControlLabel value="Bebas Sewa" control={<Radio />} label="Bebas Sewa" />
                        <FormControlLabel value="Menumpang" control={<Radio />} label="Menumpang" />
                        <FormControlLabel value="Dinas" control={<Radio />} label="Dinas" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="jenisDinding">
                        Jenis dinding rumah terluas
                      </FormLabel>
                      <RadioGroup row aria-labelledby="jenisDinding" name="jenisDinding">
                        <FormControlLabel value="Tembok" control={<Radio />} label="Tembok" />
                        <FormControlLabel value="Kayu/Papan" control={<Radio />} label="Kayu/Papan" />
                        <FormControlLabel value="Seng" control={<Radio />} label="Seng" />
                        <FormControlLabel value="Bambu" control={<Radio />} label="Bambu" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="jenisLantai">
                        Jenis lantai rumah terluas
                      </FormLabel>
                      <RadioGroup row aria-labelledby="jenisLantai" name="jenisLantai">
                        <FormControlLabel
                          value="Keramik/Granit/Marmer/Ubin/Tegel/Teraso"
                          control={<Radio />}
                          label="Keramik/Granit/Marmer/Ubin/Tegel/Teraso"
                        />
                        <FormControlLabel value="Semen" control={<Radio />} label="Semen" />
                        <FormControlLabel value="Kayu/Papan" control={<Radio />} label="Kayu/Papan" />
                        <FormControlLabel value="Bambu" control={<Radio />} label="Bambu" />
                        <FormControlLabel value="Tanah" control={<Radio />} label="Tanah" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="sumberPenerangan">
                        Sumber penerangan utama
                      </FormLabel>
                      <RadioGroup row aria-labelledby="sumberPenerangan" name="sumberPenerangan">
                        <FormControlLabel value="Listrik Pribadi 900W" control={<Radio />} label="Listrik Pribadi 900W" />
                        <FormControlLabel value="Listrik Pribadi > 900 W" control={<Radio />} label="Listrik Pribadi > 900 W" />
                        <FormControlLabel value="Genset/Solar Cell" control={<Radio />} label="Genset/Solar Cell" />
                        <FormControlLabel value="Listrik Bersama" control={<Radio />} label="Listrik Bersama" />
                        <FormControlLabel value="Non Listrik" control={<Radio />} label="Non Listrik" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="sumberAirMinum">
                        Sumber air minum utama
                      </FormLabel>
                      <RadioGroup row aria-labelledby="sumberAirMinum" name="sumberAirMinum">
                        <FormControlLabel value="Air Kemasan/Isi Ulang" control={<Radio />} label="Air Kemasan/Isi Ulang" />
                        <FormControlLabel value="Ledeng/PAM" control={<Radio />} label="Ledeng/PAM" />
                        <FormControlLabel value="Sumur Bor" control={<Radio />} label="Sumur Bor" />
                        <FormControlLabel value="Sumur Terlindung" control={<Radio />} label="Sumur Terlindung" />
                        <FormControlLabel value="Sumur Tidak Terlindung" control={<Radio />} label="Sumur Tidak Terlindung" />
                        <FormControlLabel
                          value="Air Permukaan (Sungai, Danau dan lain sebagainya"
                          control={<Radio />}
                          label="Air Permukaan (Sungai, Danau dan lain sebagainya"
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
                      <RadioGroup row aria-labelledby="fasilitasBAB" name="fasilitasBAB">
                        <FormControlLabel value="Dengan Sepetic Tank" control={<Radio />} label="Dengan Sepetic Tank" />
                        <FormControlLabel value="Tanpa Septic Tank" control={<Radio />} label="Tanpa Septic Tank" />
                        <FormControlLabel value="Jamban Umum/Bersama" control={<Radio />} label="Jamban Umum/Bersama" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="sumberBahanBakar">
                        Sumber Bahan Bakar Untuk Memasak
                      </FormLabel>
                      <RadioGroup row aria-labelledby="sumberBahanBakar" name="sumberBahanBakar">
                        <FormControlLabel value="Listrik/Gas" control={<Radio />} label="Listrik/Gas" />
                        <FormControlLabel value="Minyak Tanah" control={<Radio />} label="Minyak Tanah" />
                        <FormControlLabel value="Arang Kayu" control={<Radio />} label="Arang Kayu" />
                        <FormControlLabel value="Lainnya" control={<Radio />} label="Lainnya" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                    <FormControl>
                      <FormLabel sx={{ fontWeight: 500, color: 'black' }} id="penerimaBansos">
                        Penerima Program Perlindungan Sosial (Bansos/Subsidi)
                      </FormLabel>
                      <RadioGroup row aria-labelledby="penerimaBansos" name="penerimaBansos">
                        <FormControlLabel value="PKH" control={<Radio />} label="PKH" />
                        <FormControlLabel value="Sembako" control={<Radio />} label="Sembako" />
                        <FormControlLabel value="BPNT" control={<Radio />} label="BPNT" />
                        <FormControlLabel value="Minyak Goreng" control={<Radio />} label="Minyak Goreng" />
                      </RadioGroup>
                    </FormControl>
                    <Divider sx={{ marginY: 2 }} />
                  </SubCard>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

ReviewPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ReviewPage;
