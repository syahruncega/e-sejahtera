import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useState } from 'react';
import { Autocomplete, Fab, IconButton, InputAdornment, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProgram, updateProgram } from 'store/slices/kemiskinan/program';
import { toast } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { EditTwoTone } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';
import { createInstansiOnProgram } from 'store/slices/kemiskinan/instansi-on-program';
import { createRencanaProgram, updateRencanaProgram } from 'store/slices/kemiskinan/rencana-program';

const validationSchema = yup.object({
  instansiId: yup.string().required('Instansi wajib diisi'),
  programId: yup.string().required('Program wajib diisi'),
  paguProgram: yup.number().typeError('Pagu Program harus berupa angka').required('Pagu Program wajib diisi'),
  tipe: yup.string().required('Tipe wajib diisi')
});

const FormRencanaProgram = ({ isEdit, instansiId, rencanaProgram, dataProgram }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [programValue, setProgramValue] = useState(isEdit ? rencanaProgram : null);

  const queryCreateProgram = useMutation({
    mutationFn: async (newRencanaProgram) =>
      createRencanaProgram({ ...newRencanaProgram, paguProgram: Number(newRencanaProgram.paguProgram) }),

    onSuccess: (newRencanaProgram) => {
      queryClient.invalidateQueries(['rencanaProgram']);
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateProgram = useMutation({
    mutationFn: (newRencanaProgram) => updateRencanaProgram(rencanaProgram.id, newRencanaProgram),
    onSuccess: (newRencanaProgram) => {
      queryClient.invalidateQueries(['rencanaProgram']);

      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      instansiId,
      programId: isEdit ? rencanaProgram.programId : '',
      paguProgram: isEdit ? rencanaProgram.paguProgram : '',
      tipe: 'Kemiskinan'
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateProgram.mutateAsync(values) : queryCreateProgram.mutateAsync(values),
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
          <IconButton color="primary" size="medium" aria-label="Ubah" onClick={handleClickOpen}>
            <EditTwoTone fontSize="small" />
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
              name="programId"
              value={programValue}
              isOptionEqualToValue={(option, value) => option.programId === value.programId}
              getOptionLabel={(option) => option.program.namaProgram}
              onChange={(e, value) => {
                formik.setFieldValue('programId', value !== null ? value.id : '');
                setProgramValue(value);
              }}
              options={dataProgram}
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
              name="paguProgram"
              label="Pagu Program"
              variant="outlined"
              fullWidth
              InputProps={{ inputMode: 'numeric', startAdornment: <InputAdornment position="start">Rp</InputAdornment> }}
              sx={{ marginTop: 2 }}
              value={formik.values.paguProgram}
              onChange={formik.handleChange}
              error={formik.touched.paguProgram && Boolean(formik.errors.paguProgram)}
              helperText={formik.touched.paguProgram && formik.errors.paguProgram}
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

FormRencanaProgram.propTypes = {
  isEdit: PropTypes.bool,
  instansiId: PropTypes.number,
  rencanaProgram: PropTypes.object,
  dataProgram: PropTypes.array
};

export default FormRencanaProgram;
