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
import { EditTwoTone } from '@mui/icons-material';
import { createBidangUrusan, updateBidangUrusan } from 'store/slices/kemiskinan/bidang-urusan';
import { createBidangUrusanOnInstansi, updateBidangUrusanOnInstansi } from 'store/slices/kemiskinan/bidang-urusan-on-instansi';

const validationSchema = yup.object({
  bidangUrusanId: yup.string().required('Bidang Urusan wajib diisi')
});

const FormBidangUrusanInstansi = ({ isEdit, instansiId, dataBidangUrusan }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryCreateBidangUrusanInstansi = useMutation({
    mutationFn: (newBidangUrusanInstansi) => createBidangUrusanOnInstansi({ instansiId, ...newBidangUrusanInstansi }),

    onSuccess: (newBidangUrusanInstansi) => {
      queryClient.invalidateQueries('bidangUrusanInstansi');
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const formik = useFormik({
    initialValues: {
      bidangUrusanId: ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        queryCreateBidangUrusanInstansi.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Data bidang urusan berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
          Tambah Bidang Urusan
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle> {isEdit ? 'Ubah Bidang Urusan Instansi' : 'Tambah Bidang Urusan Instansi'}</DialogTitle>
          <DialogContent>
            <Autocomplete
              disablePortal
              name="bidangUrusanId"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.namaBidangUrusan}
              onChange={(e, value) => {
                formik.setFieldValue('bidangUrusanId', value !== null ? value.id : '');
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
          </DialogContent>
          <DialogActions>
            <Button disabled={queryCreateBidangUrusanInstansi.isLoading} onClick={handleClose}>
              Batal
            </Button>
            <LoadingButton loading={queryCreateBidangUrusanInstansi.isLoading} type="submit">
              Simpan
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormBidangUrusanInstansi.propTypes = {
  isEdit: PropTypes.bool,
  instansiId: PropTypes.number,
  dataBidangUrusan: PropTypes.array
};

export default FormBidangUrusanInstansi;
