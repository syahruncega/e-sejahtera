import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Button, Divider, FormControl, FormLabel, Grid } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';

import MainCard from 'components/ui-component/cards/MainCard';

import { Box } from '@mui/system';
import { toast } from 'react-hot-toast';
import { TaskAltTwoTone } from '@mui/icons-material';

const validationSchema = yup.object({
  namaPenerima: yup.string().required(''),
  jenisBantuan: yup.string().required(''),
  volumeBantuan: yup.number().required('').typeError('Volume bantuan harus berupa angka'),
  satuanVolume: yup.string().required('')
});

const FormVerifikasiMonev = ({ isEdit, initialData, readOnly = false }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      namaPenerima: initialData?.namaPenerima ?? '',
      jenisBantuan: initialData?.jenisBantuan ?? '',
      volumeBantuan: initialData?.volumeBantuan ?? '0',
      satuanVolume: initialData?.satuanVolume ?? ''
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel
                  sx={{
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black'
                  }}
                  id="namaPenerima"
                >
                  Nama Penerima
                  {initialData.namaPenerima !== formik.values.namaPenerima && (
                    <TaskAltTwoTone fontSize="14" color="primary" sx={{ marginLeft: 1 }} />
                  )}
                </FormLabel>
                <TextField
                  InputProps={{ readOnly }}
                  placeholder="Masukkan nama penerima"
                  name="namaPenerima"
                  value={formik.values.namaPenerima}
                  onChange={formik.handleChange}
                />
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
                  id="jenisBantuan"
                >
                  Jenis Bantuan
                  {initialData.jenisBantuan !== formik.values.jenisBantuan && (
                    <TaskAltTwoTone fontSize="14" color="primary" sx={{ marginLeft: 1 }} />
                  )}
                </FormLabel>
                <TextField
                  InputProps={{ readOnly }}
                  placeholder="Masukkan jenis bantuan"
                  name="jenisBantuan"
                  value={formik.values.jenisBantuan}
                  onChange={formik.handleChange}
                />
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
                  id="volumeBantuan"
                >
                  Volume Bantuan
                  {initialData.volumeBantuan !== Number(formik.values.volumeBantuan) && (
                    <TaskAltTwoTone fontSize="14" color="primary" sx={{ marginLeft: 1 }} />
                  )}
                </FormLabel>
                <TextField
                  InputProps={{ readOnly }}
                  placeholder="Masukkan jenis bantuan"
                  name="volumeBantuan"
                  value={formik.values.volumeBantuan}
                  onChange={formik.handleChange}
                />
              </FormControl>{' '}
              <Divider sx={{ marginY: 2 }} />
              <FormControl fullWidth>
                <FormLabel
                  sx={{
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black'
                  }}
                  id="satuanVolume"
                >
                  Satuan Volume
                  {initialData.satuanVolume !== formik.values.satuanVolume && (
                    <TaskAltTwoTone fontSize="14" color="primary" sx={{ marginLeft: 1 }} />
                  )}
                </FormLabel>
                <TextField
                  InputProps={{ readOnly }}
                  placeholder="Masukkan satuan volume"
                  name="satuanVolume"
                  value={formik.values.satuanVolume}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <Divider sx={{ marginY: 2 }} />
              {!readOnly && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" type="submit">
                    Verifikasi
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </>
  );
};

FormVerifikasiMonev.propTypes = {
  isEdit: PropTypes.bool,
  readOnly: PropTypes.bool,
  initialData: PropTypes.any
};

export default FormVerifikasiMonev;
