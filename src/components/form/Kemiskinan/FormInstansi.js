import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useState } from 'react';
import { Autocomplete, Fab, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { EditTwoTone } from '@mui/icons-material';
import { createInstansi, updateInstansi } from 'store/slices/instansi';
import { IMaskInput } from 'react-imask';

const KodeInstansiMask = forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#.00.0.00.0.00.00.0000"
      definitions={{
        '#': /[1-9]/
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const validationSchema = yup.object({
  instansiId: yup.string().required('Kode Instansi wajib diisi'),
  namaInstansi: yup.string().required('Nama Instansi wajib diisi')
});

const FormInstansi = ({ isEdit, instansi }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryCreateInstansi = useMutation({
    mutationFn: (newInstansi) => createInstansi(newInstansi),

    onSuccess: (newInstansi) => {
      // queryClient.setQueriesData(['instansi'], (oldData) => [newInstansi, ...(oldData ?? [])]);
      queryClient.invalidateQueries('instansi');
      setOpen(false);
      // setBidangUrusan(null);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateInstansi = useMutation({
    mutationFn: (newInstansi) => updateInstansi(instansi.id, newInstansi),
    onSuccess: (newInstansi) => {
      queryClient.invalidateQueries('instansi');
      // queryClient.setQueriesData(['instansi'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newInstansi.id);
      //   return [newInstansi, ...(filteredOldData ?? [])];
      // });
      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      instansiId: isEdit ? instansi.id : '',
      namaInstansi: isEdit ? instansi.namaInstansi : ''
    },
    validationSchema,
    validate: (values) => {
      const errors = {};
      if (values.instansiId.length < 22) errors.instansiId = 'Format kode instansi tidak valid';
      return errors;
    },
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateInstansi.mutateAsync(values) : queryCreateInstansi.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Data instansi berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
        <Tooltip title="Tambah Instansi">
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
          <DialogTitle> {isEdit ? 'Ubah Instansi' : 'Tambah Instansi'}</DialogTitle>
          <DialogContent>
            <TextField
              name="instansiId"
              label="Kode Instansi"
              variant="outlined"
              fullWidth
              placeholder="-.--.-.--.-.--.--.----"
              sx={{ marginTop: 2 }}
              value={formik.values.instansiId}
              onChange={formik.handleChange}
              error={formik.touched.instansiId && Boolean(formik.errors.instansiId)}
              helperText={formik.touched.instansiId && formik.errors.instansiId}
              InputProps={{ inputComponent: KodeInstansiMask }}
            />
            <TextField
              name="namaInstansi"
              label="Nama Instansi"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.namaInstansi}
              onChange={formik.handleChange}
              error={formik.touched.namaInstansi && Boolean(formik.errors.namaInstansi)}
              helperText={formik.touched.namaInstansi && formik.errors.namaInstansi}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={queryCreateInstansi.isLoading || queryUpdateInstansi.isLoading} onClick={handleClose}>
              Batal
            </Button>
            <LoadingButton loading={queryCreateInstansi.isLoading || queryUpdateInstansi.isLoading} type="submit">
              Simpan
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormInstansi.propTypes = {
  isEdit: PropTypes.bool,
  instansi: PropTypes.any
};

export default FormInstansi;
