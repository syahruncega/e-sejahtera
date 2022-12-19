import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, Fab, MenuItem, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

const validationSchema = yup.object({
  programId: yup.string().required('Program wajib diisi'),
  kegiatanId: yup.string().required('Kegiatan wajib diisi'),
  nama_sub_kegiatan: yup.string().required('Nama Program wajib diisi'),
  indikator_kinerja_sub_kegiatan: yup.string().required('Indikator Kinerja Program wajib diisi')
});

const FormSubKegiatan = ({ isEdit, subKegiatan, dataProgram }) => {
  const [open, setOpen] = useState(false);
  const [dataKegiatan, setDataKegiatan] = useState([]);
  const [keyBool, setKeyBool] = useState(false);

  const formik = useFormik({
    initialValues: {
      programId: '',
      kegiatanId: '',
      nama_sub_kegiatan: '',
      indikator_kinerja_sub_kegiatan: ''
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        <Tooltip title="Tambah Sub Kegiatan">
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
          <DialogTitle> {isEdit ? 'Ubah Sub Kegiatan' : 'Tambah Sub Kegiatan'}</DialogTitle>
          <DialogContent>
            <Autocomplete
              disablePortal
              name="programId"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama_program}
              onChange={async (e, value) => {
                if (value !== null) {
                  formik.setFieldValue('programId', value.id);
                  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kegiatans`, {
                    params: { programId: value.id }
                  });
                  setDataKegiatan(response.data);
                  formik.setFieldValue('kegiatanId', '');
                  setKeyBool(!keyBool);
                } else {
                  formik.setFieldValue('programId', '');
                  setDataKegiatan([]);
                }
              }}
              options={dataProgram || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Program"
                  value={formik.values.programId}
                  helperText={formik.touched.programId && formik.errors.programId}
                  error={formik.touched.programId && Boolean(formik.errors.programId)}
                  {...params}
                />
              )}
            />
            <Autocomplete
              key={keyBool}
              disablePortal
              name="kegiatanId"
              disabled={!(dataKegiatan.length > 0)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama_kegiatan}
              onChange={async (e, value) => {
                if (value !== null) {
                  formik.setFieldValue('kegiatanId', value.id);
                } else {
                  formik.setFieldValue('kegiatanId', '');
                }
              }}
              options={dataKegiatan || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Kegiatan"
                  value={formik.values.kegiatanId}
                  helperText={formik.touched.kegiatanId && formik.errors.kegiatanId}
                  error={formik.touched.kegiatanId && Boolean(formik.errors.kegiatanId)}
                  {...params}
                />
              )}
            />
            <TextField
              name="nama_sub_kegiatan"
              label="Nama Sub Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.nama_sub_kegiatan}
              onChange={formik.handleChange}
              error={formik.touched.nama_sub_kegiatan && Boolean(formik.errors.nama_sub_kegiatan)}
              helperText={formik.touched.nama_sub_kegiatan && formik.errors.nama_sub_kegiatan}
            />
            <TextField
              name="indikator_kinerja_sub_kegiatan"
              label="Indikator Kinerja Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.indikator_kinerja_sub_kegiatan}
              onChange={formik.handleChange}
              error={formik.touched.indikator_kinerja_sub_kegiatan && Boolean(formik.errors.indikator_kinerja_sub_kegiatan)}
              helperText={formik.touched.indikator_kinerja_sub_kegiatan && formik.errors.indikator_kinerja_sub_kegiatan}
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

FormSubKegiatan.propTypes = {
  isEdit: PropTypes.bool,
  subKegiatan: PropTypes.any,
  dataProgram: PropTypes.array
};

export default FormSubKegiatan;
