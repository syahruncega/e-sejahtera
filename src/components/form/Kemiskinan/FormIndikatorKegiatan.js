import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, Fab, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { EditTwoTone } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createKegiatan, updateKegiatan } from 'store/slices/kemiskinan/kegiatan';
import { toast } from 'react-hot-toast';

const validationSchema = yup.object({
  programId: yup.string().required('Program wajib diisi'),
  namaKegiatan: yup.string().required('Nama Kegiatan wajib diisi'),
  indikatorKinerjaKegiatan: yup.string().required('Indikator Kinerja Kegiatan wajib diisi')
});

const FormIndikatorKegiatan = ({ isEdit, kegiatan, dataProgram }) => {
  const [open, setOpen] = useState(false);
  const [programId, setProgramId] = useState(isEdit ? kegiatan.program : null);

  const queryClient = useQueryClient();

  const queryCreateKegiatan = useMutation({
    mutationFn: (newKegiatan) => createKegiatan(newKegiatan),

    onSuccess: (newKegiatan) => {
      queryClient.invalidateQueries(['kegiatan']);
      // queryClient.setQueriesData(['kegiatan'], (oldData) => [newKegiatan, ...(oldData ?? [])]);
      setOpen(false);
      setProgramId(null);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateKegiatan = useMutation({
    mutationFn: (newKegiatan) => updateKegiatan(kegiatan.id, newKegiatan),
    onSuccess: (newKegiatan) => {
      queryClient.invalidateQueries(['kegiatan']);
      // queryClient.setQueriesData(['kegiatan'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newKegiatan.id);
      //   return [newKegiatan, ...(filteredOldData ?? [])];
      // });

      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      programId: isEdit ? kegiatan.programId : '',
      namaKegiatan: isEdit ? kegiatan.namaKegiatan : '',
      indikatorKinerjaKegiatan: isEdit ? kegiatan.indikatorKinerjaKegiatan : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit
          ? queryUpdateKegiatan.mutateAsync({ ...values, paguKegiatan: kegiatan.paguKegiatan })
          : queryCreateKegiatan.mutateAsync({ ...values, paguKegiatan: 1 }),
        {
          loading: 'Sedang menyimpan...',
          success: `Data kegiatan berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
          <IconButton color="primary" size="medium" aria-label="Ubah" onClick={handleClickOpen}>
            <EditTwoTone fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Tambah Indikator Kegiatan
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle> {isEdit ? 'Ubah Indikator Kegiatan' : 'Tambah Indikator Kegiatan'}</DialogTitle>

          <DialogContent>
            <TextField
              name="indikatorKinerjaKegiatan"
              label="Indikator Kegiatan"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ marginTop: 2 }}
              value={formik.values.indikatorKinerjaKegiatan}
              onChange={formik.handleChange}
              error={formik.touched.indikatorKinerjaKegiatan && Boolean(formik.errors.indikatorKinerjaKegiatan)}
              helperText={formik.touched.indikatorKinerjaKegiatan && formik.errors.indikatorKinerjaKegiatan}
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

FormIndikatorKegiatan.propTypes = {
  isEdit: PropTypes.bool,
  kegiatan: PropTypes.any,
  dataProgram: PropTypes.array
};

export default FormIndikatorKegiatan;
