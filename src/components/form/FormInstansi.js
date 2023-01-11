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
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { EditOutlined } from '@mui/icons-material';
import { createInstansi, updateInstansi } from 'store/slices/instansi';

const validationSchema = yup.object({
  bidangUrusanId: yup.string().required('Bidang urusan wajib diisi'),
  namaInstansi: yup.string().required('Instansi wajib diisi')
});

const FormInstansi = ({ isEdit, instansi, dataBidangUrusan }) => {
  const [open, setOpen] = useState(false);
  const [bidangUrusan, setBidangUrusan] = useState(isEdit ? instansi.bidangUrusan : null);

  const queryClient = useQueryClient();

  const queryCreateInstansi = useMutation({
    mutationFn: (newInstansi) => createInstansi(newInstansi),

    onSuccess: (newInstansi) => {
      // queryClient.setQueriesData(['instansi'], (oldData) => [newInstansi, ...(oldData ?? [])]);
      queryClient.invalidateQueries('instansi');
      setOpen(false);
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
      namaInstansi: isEdit ? instansi.namaInstansi : '',
      bidangUrusanId: isEdit ? instansi.bidangUrusanId : ''
    },
    validationSchema,
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
          <IconButton size="medium" aria-label="Ubah" onClick={handleClickOpen}>
            <EditOutlined fontSize="small" sx={{ color: 'grey.500' }} />
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
            <Autocomplete
              disablePortal
              name="bidangUrusanId"
              value={bidangUrusan}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.namaBidangUrusan}
              onChange={(e, value) => {
                formik.setFieldValue('bidangUrusanId', value !== null ? value.id : '');
                setBidangUrusan(value);
              }}
              options={dataBidangUrusan || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Bidang Urusan"
                  value={formik.values.bidangUrusanId}
                  helperText={formik.touched.bidangUrusanId && formik.errors.bidangUrusanId}
                  error={formik.touched.bidangUrusanId && Boolean(formik.errors.bidangUrusanId)}
                  {...params}
                />
              )}
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
  instansi: PropTypes.any,
  dataBidangUrusan: PropTypes.array
};

export default FormInstansi;
