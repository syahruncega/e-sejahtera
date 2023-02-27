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
import { createBidangUrusan, updateBidangUrusan } from 'store/slices/bidang-urusan';

const validationSchema = yup.object({
  kodeBidangUrusan: yup.string().required('Bidang Urusan wajib diisi')
});

const FormBidangUrusanInstansi = ({ isEdit, bidangUrusanInstansi, dataBidangUrusan }) => {
  const [open, setOpen] = useState(false);

  const [bidangUrusan, setBidangUrusan] = useState(isEdit ? bidangUrusanInstansi.bidangUrusan : null);

  const queryClient = useQueryClient();

  const queryCreateBidangUrusan = useMutation({
    mutationFn: (newBidangUrusan) => createBidangUrusan(newBidangUrusan),

    onSuccess: (newBidangUrusan) => {
      // queryClient.setQueriesData(['bidangUrusanInstansi'], (oldData) => [newBidangUrusan, ...(oldData ?? [])]);
      queryClient.invalidateQueries('bidangUrusanInstansi');
      setOpen(false);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateBidangUrusan = useMutation({
    mutationFn: (newBidangUrusan) => updateBidangUrusan(bidangUrusanInstansi.id, newBidangUrusan),
    onSuccess: (newBidangUrusan) => {
      queryClient.invalidateQueries('bidangUrusanInstansi');
      // queryClient.setQueriesData(['bidangUrusanInstansi'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newBidangUrusan.id);
      //   return [newBidangUrusan, ...(filteredOldData ?? [])];
      // });
      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      id: isEdit ? bidangUrusanInstansi.id : '',
      namaBidangUrusan: isEdit ? bidangUrusanInstansi.namaBidangUrusan : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateBidangUrusan.mutateAsync(values) : queryCreateBidangUrusan.mutateAsync(values),
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
              name="kodeBidangUrusan"
              value={bidangUrusanInstansi}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.namaBidangUrusan}
              onChange={(e, value) => {
                formik.setFieldValue('kodeBidangUrusan', value !== null ? value.id : '');
                setBidangUrusan(value);
              }}
              options={dataBidangUrusan || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Bidang Urusan"
                  value={formik.values.kodeBidangUrusan}
                  helperText={formik.touched.kodeBidangUrusan && formik.errors.kodeBidangUrusan}
                  error={formik.touched.kodeBidangUrusan && Boolean(formik.errors.kodeBidangUrusan)}
                  {...params}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={queryCreateBidangUrusan.isLoading || queryUpdateBidangUrusan.isLoading} onClick={handleClose}>
              Batal
            </Button>
            <LoadingButton loading={queryCreateBidangUrusan.isLoading || queryUpdateBidangUrusan.isLoading} type="submit">
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
  bidangUrusanInstansi: PropTypes.any
};

export default FormBidangUrusanInstansi;
