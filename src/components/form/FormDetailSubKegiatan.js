import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Fab, IconButton, MenuItem, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { EditOutlined } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDetailSubKegiatan, updateDetailSubKegiatan } from 'store/slices/detail-sub-kegiatan';
import { toast } from 'react-hot-toast';

const validationSchema = yup.object({
  subKegiatanId: yup.number().required('Sub Kegiatan Id wajib diisi'),
  fokusBelanja: yup.string().required('Fokus Belanja wajib diisi'),
  indikator: yup.string().required('Indikator wajib diisi'),
  target: yup.number().required('Target wajib diisi').typeError('Target harus berupa angka'),
  satuan: yup.string().required('Satuan wajib diisi'),
  paguFokusBelanja: yup.number().required('Pagu Fokus Belanja wajib diisi').typeError('Pagu Fokus Belanja harus berupa angka'),
  keterangan: yup.string().required('Keterangan wajib diisi')
});

const FormDetailSubKegiatan = ({ isEdit, detailSubKegiatan }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const queryCreateDetailSubKegiatan = useMutation({
    mutationFn: (newDetailSubKegiatan) => createDetailSubKegiatan(newDetailSubKegiatan),

    onSuccess: (newDetailSubKegiatan) => {
      queryClient.invalidateQueries(['detailSubKegiatan']);
      // queryClient.setQueriesData(['detailSubKegiatan'], (oldData) => [newDetailSubKegiatan, ...(oldData ?? [])]);
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateDetailSubKegiatan = useMutation({
    mutationFn: (newDetailSubKegiatan) => updateDetailSubKegiatan(detailSubKegiatan.id, newDetailSubKegiatan),
    onSuccess: (newDetailSubKegiatan) => {
      queryClient.invalidateQueries(['detailSubKegiatan']);
      // queryClient.setQueriesData(['detailSubKegiatan'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newDetailSubKegiatan.id);
      //   return [newDetailSubKegiatan, ...(filteredOldData ?? [])];
      // });

      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      subKegiatanId: Number(router.query.subKegiatanId),
      fokusBelanja: isEdit ? detailSubKegiatan.fokusBelanja : '',
      indikator: isEdit ? detailSubKegiatan.indikator : '',
      target: isEdit ? detailSubKegiatan.target : '',
      satuan: isEdit ? detailSubKegiatan.satuan : '',
      paguFokusBelanja: isEdit ? detailSubKegiatan.paguFokusBelanja : '',
      keterangan: isEdit ? detailSubKegiatan.keterangan : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit
          ? queryUpdateDetailSubKegiatan.mutateAsync({
              ...values,
              target: Number(values.target),
              paguFokusBelanja: Number(values.paguFokusBelanja)
            })
          : queryCreateDetailSubKegiatan.mutateAsync({
              ...values,
              target: Number(values.target),
              paguFokusBelanja: Number(values.paguFokusBelanja)
            }),
        {
          loading: 'Sedang menyimpan...',
          success: `Data program berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
          error: (err) => `${err.message}`
        },
        { id: 'toast' }
      );
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
        <Tooltip title="Ubah">
          <IconButton size="medium" aria-label="Ubah" onClick={handleClickOpen}>
            <EditOutlined fontSize="small" sx={{ color: 'grey.500' }} />
          </IconButton>
        </Tooltip>
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
              name="fokusBelanja"
              label="Fokus Belanja"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.fokusBelanja}
              onChange={formik.handleChange}
              error={formik.touched.fokusBelanja && Boolean(formik.errors.fokusBelanja)}
              helperText={formik.touched.fokusBelanja && formik.errors.fokusBelanja}
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
              inputProps={{ inputMode: 'numeric' }}
              sx={{ marginTop: 2 }}
              value={formik.values.target}
              onChange={formik.handleChange}
              error={formik.touched.target && Boolean(formik.errors.target)}
              helperText={formik.touched.target && formik.errors.target}
            />
            <TextField
              name="satuan"
              label="Satuan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.satuan}
              onChange={formik.handleChange}
              error={formik.touched.satuan && Boolean(formik.errors.satuan)}
              helperText={formik.touched.satuan && formik.errors.satuan}
            />
            <TextField
              name="paguFokusBelanja"
              label="Pagu Fokus Belanja"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.paguFokusBelanja}
              onChange={formik.handleChange}
              error={formik.touched.paguFokusBelanja && Boolean(formik.errors.paguFokusBelanja)}
              helperText={formik.touched.paguFokusBelanja && formik.errors.paguFokusBelanja}
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
