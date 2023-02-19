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
import { createSubKegiatan, updateSubKegiatan } from 'store/slices/sub-kegiatan';
import { toast } from 'react-hot-toast';

const validationSchema = yup.object({
  kegiatanId: yup.string().required('Kegiatan wajib diisi'),
  namaSubKegiatan: yup.string().required('Nama Sub Kegiatan wajib diisi'),
  indikatorKinerjaSubKegiatan: yup.string().required('Indikator Kinerja Program wajib diisi')
});

const FormIndikatorSubKegiatan = ({ isEdit, subKegiatan, dataKegiatan }) => {
  const [open, setOpen] = useState(false);
  // const [dataKegiatan, setDataKegiatan] = useState([]);
  const [keyBool, setKeyBool] = useState(false);

  const [kegiatanId, setKegiatanId] = useState(isEdit ? subKegiatan.kegiatan : null);

  const queryClient = useQueryClient();

  const queryCreateSubKegiatan = useMutation({
    mutationFn: (newSubKegiatan) => createSubKegiatan(newSubKegiatan),

    onSuccess: (newSubKegiatan) => {
      queryClient.invalidateQueries(['subKegiatan']);
      // queryClient.setQueriesData(['subKegiatan'], (oldData) => [newSubKegiatan, ...(oldData ?? [])]);
      setOpen(false);
      setKegiatanId(null);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateSubKegiatan = useMutation({
    mutationFn: (newSubKegiatan) => updateSubKegiatan(subKegiatan.id, newSubKegiatan),
    onSuccess: (newSubKegiatan) => {
      queryClient.invalidateQueries(['subKegiatan']);
      // queryClient.setQueriesData(['subKegiatan'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newSubKegiatan.id);
      //   return [newSubKegiatan, ...(filteredOldData ?? [])];
      // });

      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      kegiatanId: isEdit ? subKegiatan.kegiatanId : '',
      namaSubKegiatan: isEdit ? subKegiatan.namaSubKegiatan : '',
      indikatorKinerjaSubKegiatan: isEdit ? subKegiatan.indikatorKinerjaSubKegiatan : ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit
          ? queryUpdateSubKegiatan.mutateAsync({ ...values, paguSubKegiatan: subKegiatan.paguSubKegiatan })
          : queryCreateSubKegiatan.mutateAsync({ ...values, paguSubKegiatan: 1 }),
        {
          loading: 'Sedang menyimpan...',
          success: `Data sub kegiatan berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
        <Tooltip title="Tambah Sub Kegiatan">
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
          <DialogTitle> {isEdit ? 'Ubah Sub Kegiatan' : 'Tambah Sub Kegiatan'}</DialogTitle>
          <DialogContent>
            {/* <Autocomplete
              disablePortal
              name="programId"
              value={programId}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.namaProgram}
              onChange={async (e, value) => {
                if (value !== null) {
                  const response = await axiosService.get(`/kegiatan`, {
                    params: { programId: value.id }
                  });
                  setDataKegiatan(response.data);
                  formik.setFieldValue('kegiatanId', '');
                  setKeyBool(!keyBool);
                } else {
                  setDataKegiatan([]);
                }
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
            /> */}
            <Autocomplete
              key={keyBool}
              disablePortal
              name="kegiatanId"
              value={kegiatanId}
              // disabled={!(dataKegiatan.length > 0)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.namaKegiatan}
              onChange={async (e, value) => {
                // if (value !== null) {
                //   formik.setFieldValue('kegiatanId', value.id);
                // } else {
                //   formik.setFieldValue('kegiatanId', '');
                // }
                formik.setFieldValue('kegiatanId', value !== null ? value.id : '');
                setKegiatanId(value);
              }}
              options={dataKegiatan || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Kegiatan"
                  value={formik.values.kegiatanId}
                  helperText={formik.touched.kegiatanId && formik.errors.kegiatanId}
                  error={formik.touched.kegiatanId && Boolean(formik.errors.kegiatanId)}
                  {...params}
                />
              )}
            />
            <TextField
              name="namaSubKegiatan"
              label="Nama Sub Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.namaSubKegiatan}
              onChange={formik.handleChange}
              error={formik.touched.namaSubKegiatan && Boolean(formik.errors.namaSubKegiatan)}
              helperText={formik.touched.namaSubKegiatan && formik.errors.namaSubKegiatan}
            />
            <TextField
              name="indikatorKinerjaSubKegiatan"
              label="Indikator Kinerja Kegiatan"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={formik.values.indikatorKinerjaSubKegiatan}
              onChange={formik.handleChange}
              error={formik.touched.indikatorKinerjaSubKegiatan && Boolean(formik.errors.indikatorKinerjaSubKegiatan)}
              helperText={formik.touched.indikatorKinerjaSubKegiatan && formik.errors.indikatorKinerjaSubKegiatan}
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

FormIndikatorSubKegiatan.propTypes = {
  isEdit: PropTypes.bool,
  subKegiatan: PropTypes.any,
  dataKegiatan: PropTypes.array
};

export default FormIndikatorSubKegiatan;
