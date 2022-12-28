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
import { EditOutlined } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createKegiatan, updateKegiatan } from 'store/slices/kegiatan';
import { toast } from 'react-hot-toast';

const validationSchema = yup.object({
  programId: yup.string().required('Program wajib diisi'),
  namaKegiatan: yup.string().required('Nama Kegiatan wajib diisi'),
  indikatorKinerjaKegiatan: yup.string().required('Indikator Kinerja Kegiatan wajib diisi')
});

const FormKegiatan = ({ isEdit, kegiatan, dataProgram }) => {
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
          <IconButton size="medium" aria-label="Ubah" onClick={handleClickOpen}>
            <EditOutlined fontSize="small" sx={{ color: 'grey.500' }} />
          </IconButton>
        </Tooltip>
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
              value={programId}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.namaProgram}
              onChange={(e, value) => {
                formik.setFieldValue('programId', value !== null ? value.id : '');
                setProgramId(value);
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
              name="namaKegiatan"
              label="Nama Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.namaKegiatan}
              onChange={formik.handleChange}
              error={formik.touched.namaKegiatan && Boolean(formik.errors.namaKegiatan)}
              helperText={formik.touched.namaKegiatan && formik.errors.namaKegiatan}
            />
            <TextField
              name="indikatorKinerjaKegiatan"
              label="Indikator Kinerja Kegiatan"
              variant="outlined"
              fullWidth
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

FormKegiatan.propTypes = {
  isEdit: PropTypes.bool,
  kegiatan: PropTypes.any,
  dataProgram: PropTypes.array
};

export default FormKegiatan;
