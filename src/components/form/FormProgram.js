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
  instansiId: yup.string().required('Instansi wajib diisi'),
  nama_program: yup.string().required('Nama Program wajib diisi'),
  indikator_kinerja_program: yup.string().required('Indikator Kinerja Program wajib diisi')
});

const FormProgram = ({ isEdit, program, dataInstansi }) => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      instansiId: '',
      nama_program: '',
      indikator_kinerja_program: ''
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
        <Tooltip title="Tambah Program">
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
          <DialogTitle> {isEdit ? 'Ubah Program' : 'Tambah Program'}</DialogTitle>
          <DialogContent>
            <Autocomplete
              disablePortal
              name="instansiId"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama_instansi}
              onChange={(e, value) => {
                formik.setFieldValue('instansiId', value !== null ? value.id : '');
              }}
              options={dataInstansi || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Instansi"
                  value={formik.values.instansiId}
                  helperText={formik.touched.instansiId && formik.errors.instansiId}
                  error={formik.touched.instansiId && Boolean(formik.errors.instansiId)}
                  {...params}
                />
              )}
            />
            <TextField
              name="nama_program"
              label="Nama Program"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.nama_program}
              onChange={formik.handleChange}
              error={formik.touched.nama_program && Boolean(formik.errors.nama_program)}
              helperText={formik.touched.nama_program && formik.errors.nama_program}
            />
            <TextField
              name="indikator_kinerja_program"
              label="Indikator Kinerja Program"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.indikator_kinerja_program}
              onChange={formik.handleChange}
              error={formik.touched.indikator_kinerja_program && Boolean(formik.errors.indikator_kinerja_program)}
              helperText={formik.touched.indikator_kinerja_program && formik.errors.indikator_kinerja_program}
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

FormProgram.propTypes = {
  isEdit: PropTypes.bool,
  program: PropTypes.any,
  dataInstansi: PropTypes.array
};

export default FormProgram;
