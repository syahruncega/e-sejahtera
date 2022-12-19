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

const validationSchema = yup.object({
  programId: yup.string().required('Program wajib diisi'),
  nama_kegiatan: yup.string().required('Nama Kegiatan wajib diisi'),
  indikator_kinerja_kegiatan: yup.string().required('Indikator Kinerja Kegiatan wajib diisi')
});

const FormKegiatan = ({ isEdit, kegiatan, dataProgram }) => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      programId: '',
      nama_kegiatan: '',
      indikator_kinerja_kegiatan: ''
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
        <Tooltip title="Tambah Kegiatan">
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
          <DialogTitle> {isEdit ? 'Ubah Kegiatan' : 'Tambah Kegiatan'}</DialogTitle>

          <DialogContent>
            <Autocomplete
              disablePortal
              name="programId"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama_program}
              onChange={(e, value) => {
                formik.setFieldValue('programId', value !== null ? value.id : '');
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
            <TextField
              name="nama_kegiatan"
              label="Nama Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.nama_kegiatan}
              onChange={formik.handleChange}
              error={formik.touched.nama_kegiatan && Boolean(formik.errors.nama_kegiatan)}
              helperText={formik.touched.nama_kegiatan && formik.errors.nama_kegiatan}
            />
            <TextField
              name="indikator_kinerja_kegiatan"
              label="Indikator Kinerja Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.indikator_kinerja_kegiatan}
              onChange={formik.handleChange}
              error={formik.touched.indikator_kinerja_kegiatan && Boolean(formik.errors.indikator_kinerja_kegiatan)}
              helperText={formik.touched.indikator_kinerja_kegiatan && formik.errors.indikator_kinerja_kegiatan}
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

FormKegiatan.propTypes = {
  isEdit: PropTypes.bool,
  kegiatan: PropTypes.any,
  dataProgram: PropTypes.array
};

export default FormKegiatan;
