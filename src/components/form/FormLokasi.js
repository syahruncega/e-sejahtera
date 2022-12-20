import PropTypes, { number } from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useId } from 'react';
import { Autocomplete, Fab, MenuItem, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';

const validationSchema = yup.object({
  detail_sub_kegiatanId: yup.number().required('Detail Sub Kegiatan wajib diisi'),
  kabupaten_kotaId: yup.number().required('Kabupaten wajib diisi'),
  kecamatanId: yup.number().nullable().optional(),
  kelurahanId: yup.number().nullable().optional()
});

const FormLokasi = ({ isEdit, lokasi, dataKabupatenKota }) => {
  const [open, setOpen] = useState(false);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);
  const [keyKecamatan, setKeyKecamatan] = useState(false);
  const [keyKelurahan, setKeyKelurahan] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      detail_sub_kegiatanId: Number.parseInt(router.query.detail_sub_kegiatanId, 10),
      kabupaten_kotaId: '',
      kecamatanId: '',
      kelurahanId: ''
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // console.log(values);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  return (
    <>
      {isEdit ? (
        <MenuItem onClick={handleClickOpen}> Ubah</MenuItem>
      ) : (
        <Tooltip title="Tambah Lokasi">
          <Fab
            color="primary"
            size="small"
            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
            onClick={handleClickOpen}
          >
            <AddIcon fontSize="small" />
          </Fab>
        </Tooltip>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle> {isEdit ? 'Ubah Lokasi' : 'Tambah Lokasi'}</DialogTitle>
          <DialogContent>
            <Autocomplete
              disablePortal
              name="kabupaten_kotaId"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama}
              onChange={async (e, value) => {
                if (value !== null) {
                  formik.setFieldValue('kabupaten_kotaId', value.id);
                  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kecamatans`, {
                    params: { kabupaten_kotaId: value.id }
                  });
                  setDataKecamatan(response.data);
                  formik.setFieldValue('kecamatanId', '');
                  formik.setFieldValue('kelurahanId', '');
                  setKeyKecamatan(!keyKecamatan);
                  setKeyKelurahan(!keyKelurahan);
                } else {
                  formik.setFieldValue('kabupaten_kotaId', '');
                  setDataKecamatan([]);
                  setDataKelurahan([]);
                }
              }}
              options={dataKabupatenKota || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Kabupaten"
                  value={formik.values.kabupaten_kotaId}
                  helperText={formik.touched.kabupaten_kotaId && formik.errors.kabupaten_kotaId}
                  error={formik.touched.kabupaten_kotaId && Boolean(formik.errors.kabupaten_kotaId)}
                  {...params}
                />
              )}
            />
            <Autocomplete
              disablePortal
              key={`kecamatan${keyKecamatan}`}
              name="kecamatanId"
              disabled={!(dataKecamatan.length > 0)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama}
              onChange={async (e, value) => {
                if (value !== null) {
                  formik.setFieldValue('kecamatanId', value.id);
                  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kelurahans`, {
                    params: { kecamatanId: value.id }
                  });
                  setDataKelurahan(response.data);
                  formik.setFieldValue('kelurahanId', '');
                  setKeyKelurahan(!keyKelurahan);
                } else {
                  formik.setFieldValue('kecamatanId', '');
                  setKeyKelurahan([]);
                }
              }}
              options={dataKecamatan || []}
              sx={{ width: 'auto', marginTop: 2 }}
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
            <Autocomplete
              disablePortal
              key={`kelurahan${keyKelurahan}`}
              name="kelurahanId"
              disabled={!(dataKelurahan.length > 0)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama}
              onChange={async (e, value) => {
                if (value !== null) {
                  formik.setFieldValue('kelurahanId', value.id);
                } else {
                  formik.setFieldValue('kelurahanId', '');
                }
              }}
              options={dataKelurahan || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Kelurahan"
                  value={formik.values.kelurahanId}
                  helperText={formik.touched.kelurahanId && formik.errors.kelurahanId}
                  error={formik.touched.kelurahanId && Boolean(formik.errors.kelurahanId)}
                  {...params}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormLokasi.propTypes = {
  isEdit: PropTypes.bool,
  lokasi: PropTypes.any,
  dataKabupatenKota: PropTypes.array
};

export default FormLokasi;
