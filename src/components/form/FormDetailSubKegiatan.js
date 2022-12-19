import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Fab, MenuItem, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const validationSchema = yup.object({
  sub_kegiatanId: yup.string().required('Sub Kegiatan Id wajib diisi'),
  fokus_belanja: yup.string().required('Fokus Belanja wajib diisi'),
  indikator: yup.string().required('Indikator wajib diisi'),
  target: yup.string().required('Target wajib diisi'),
  satuan: yup.string().required('Satuan wajib diisi'),
  pagu_fokus_belanja: yup.string().required('Pagu Fokus Belanja wajib diisi'),
  keterangan: yup.string().required('Keterangan wajib diisi')
});

const FormDetailSubKegiatan = ({ isEdit, detailSubKegiatan }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      sub_kegiatanId: router.query.sub_kegiatanId,
      fokus_belanja: '',
      indikator: '',
      target: '',
      satuan: '',
      pagu_fokus_belanja: '',
      keterangan: ''
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
        <Tooltip title="Tambah Detail Sub Kegiatan">
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
          <DialogTitle> {isEdit ? 'Ubah Detail Sub Kegiatan' : 'Tambah Detail Sub Kegiatan'}</DialogTitle>
          <DialogContent>
            <TextField
              name="fokus_belanja"
              label="Fokus Belanja"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.fokus_belanja}
              onChange={formik.handleChange}
              error={formik.touched.fokus_belanja && Boolean(formik.errors.fokus_belanja)}
              helperText={formik.touched.fokus_belanja && formik.errors.fokus_belanja}
            />
            <TextField
              name="indikator"
              label="Indikator"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.indikator}
              onChange={formik.handleChange}
              error={formik.touched.indikator && Boolean(formik.errors.indikator)}
              helperText={formik.touched.indikator && formik.errors.indikator}
            />
            <TextField
              name="target"
              label="Target"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.target}
              onChange={formik.handleChange}
              error={formik.touched.target && Boolean(formik.errors.target)}
              helperText={formik.touched.target && formik.errors.target}
            />
            <TextField
              name="satuan"
              label="Target"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.satuan}
              onChange={formik.handleChange}
              error={formik.touched.satuan && Boolean(formik.errors.satuan)}
              helperText={formik.touched.satuan && formik.errors.satuan}
            />
            <TextField
              name="pagu_fokus_belanja"
              label="Pagu Fokus Belanja"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.pagu_fokus_belanja}
              onChange={formik.handleChange}
              error={formik.touched.pagu_fokus_belanja && Boolean(formik.errors.pagu_fokus_belanja)}
              helperText={formik.touched.pagu_fokus_belanja && formik.errors.pagu_fokus_belanja}
            />
            <TextField
              name="keterangan"
              label="Keterangan"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ marginTop: 2 }}
              value={formik.values.keterangan}
              onChange={formik.handleChange}
              error={formik.touched.keterangan && Boolean(formik.errors.keterangan)}
              helperText={formik.touched.keterangan && formik.errors.keterangan}
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

FormDetailSubKegiatan.propTypes = {
  isEdit: PropTypes.bool,
  detailSubKegiatan: PropTypes.any
};

export default FormDetailSubKegiatan;
