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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProgram, updateProgram } from 'store/slices/program';
import { toast } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { EditOutlined } from '@mui/icons-material';

const validationSchema = yup.object({
  instansiId: yup.string().required('Instansi wajib diisi'),
  namaProgram: yup.string().required('Nama Program wajib diisi'),
  indikatorKinerjaProgram: yup.string().required('Indikator Kinerja Program wajib diisi'),
  sasaran: yup.string().required('Sasaran wajib diisi'),
  indikatorSasaran: yup.string().required('Indikator Sasaran wajib diisi'),
  kebijakan: yup.string().required('Kebijakan wajib diisi')
});

const FormProgram = ({ isEdit, program, dataInstansi }) => {
  const [open, setOpen] = useState(false);

  const [instansiId, setInstansiId] = useState(isEdit ? program.instansi : null);

  const queryClient = useQueryClient();

  const queryCreateProgram = useMutation({
    mutationFn: (newProgram) => createProgram(newProgram),

    onSuccess: (newProgram) => {
      queryClient.invalidateQueries(['program']);
      // queryClient.setQueriesData(['program'], (oldData) => [newProgram, ...(oldData ?? [])]);
      setOpen(false);
      setInstansiId(null);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateProgram = useMutation({
    mutationFn: (newProgram) => updateProgram(program.id, newProgram),
    onSuccess: (newProgram) => {
      queryClient.invalidateQueries(['program']);
      // queryClient.setQueriesData(['program'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newProgram.id);
      //   return [newProgram, ...(filteredOldData ?? [])];
      // });

      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      instansiId: isEdit ? program.instansiId : '',
      namaProgram: isEdit ? program.namaProgram : '',
      indikatorKinerjaProgram: isEdit ? program.indikatorKinerjaProgram : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit
          ? queryUpdateProgram.mutateAsync({ ...values, paguProgram: program.paguProgram })
          : queryCreateProgram.mutateAsync({ ...values, paguProgram: 1 }),
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
              value={instansiId}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.namaInstansi}
              onChange={(e, value) => {
                formik.setFieldValue('instansiId', value !== null ? value.id : '');
                setInstansiId(value);
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
              name="sasaran"
              label="Sasaran"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.sasaran}
              onChange={formik.handleChange}
              error={formik.touched.sasaran && Boolean(formik.errors.sasaran)}
              helperText={formik.touched.sasaran && formik.errors.sasaran}
            />
            <TextField
              name="indikatorSasaran"
              label="Indikator Sasaran"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.indikatorSasaran}
              onChange={formik.handleChange}
              error={formik.touched.indikatorSasaran && Boolean(formik.errors.indikatorSasaran)}
              helperText={formik.touched.indikatorSasaran && formik.errors.indikatorSasaran}
            />
            <TextField
              name="kebijakan"
              label="Kebijakan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.kebijakan}
              onChange={formik.handleChange}
              error={formik.touched.kebijakan && Boolean(formik.errors.kebijakan)}
              helperText={formik.touched.kebijakan && formik.errors.kebijakan}
            />
            <TextField
              name="namaProgram"
              label="Nama Program"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.namaProgram}
              onChange={formik.handleChange}
              error={formik.touched.namaProgram && Boolean(formik.errors.namaProgram)}
              helperText={formik.touched.namaProgram && formik.errors.namaProgram}
            />
            <TextField
              name="indikatorKinerjaProgram"
              label="Indikator Kinerja Program"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.indikatorKinerjaProgram}
              onChange={formik.handleChange}
              error={formik.touched.indikatorKinerjaProgram && Boolean(formik.errors.indikatorKinerjaProgram)}
              helperText={formik.touched.indikatorKinerjaProgram && formik.errors.indikatorKinerjaProgram}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <LoadingButton loading={queryCreateProgram.isLoading || queryUpdateProgram.isLoading} type="submit">
              Simpan
            </LoadingButton>
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
