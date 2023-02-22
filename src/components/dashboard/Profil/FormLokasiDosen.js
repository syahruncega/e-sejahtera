import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  TextField,
  Tooltip
} from '@mui/material';

// project imports
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createLokasiDosen, updateLokasiDosen } from 'store/slices/lokasi-dosen';
import { EditTwoTone } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { getDesaKelurahan, getKecamatan } from 'store/slices/wilayah';
import { LoadingButton } from '@mui/lab';
import useAuth from 'hooks/useAuth';

// ==============================|| PROFILE 1 - CHANGE PASSWORD ||============================== //

const validationSchema = yup.object({
  dosenId: yup.number().required('Detail Sub Kegiatan wajib diisi'),
  kabupatenKotaId: yup.number().required('Kabupaten/Kota wajib diisi'),
  kecamatanId: yup.number().required('Kecamatan wajib diisi'),
  kelurahanId: yup.number().required('Desa/Kelurahan wajib diisi')
});

const FormLokasiDosen = ({ isEdit, lokasiDosen, dataKabupatenKota }) => {
  const theme = useTheme();
  const { profil } = useAuth();
  const [open, setOpen] = useState(false);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);
  const [keyKecamatan, setKeyKecamatan] = useState(false);
  const [keyKelurahan, setKeyKelurahan] = useState(false);
  const queryClient = useQueryClient();

  const [kabupatenKotaValue, setKabupatenKotaValue] = useState(isEdit ? lokasiDosen.kabupatenKota : null);
  const [kecamatanValue, setKecamatanValue] = useState(isEdit ? lokasiDosen.kecamatan : null);
  const [desaKelurahanValue, setDesaKelurahanValue] = useState(isEdit ? lokasiDosen.kelurahan : null);

  const queryCreateLokasiDosen = useMutation({
    mutationFn: (newLokasiDosen) => createLokasiDosen(newLokasiDosen),

    onSuccess: (newLokasiDosen) => {
      queryClient.invalidateQueries(['lokasiDosen']);
      // queryClient.setQueriesData(['lokasiDosen'], (oldData) => [newLokasiDosen, ...(oldData ?? [])]);
      setOpen(false);
      setKabupatenKotaValue(null);
      setKecamatanValue(null);
      setDesaKelurahanValue(null);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateLokasiDosen = useMutation({
    mutationFn: (newLokasiDosen) => updateLokasiDosen(lokasiDosen.id, newLokasiDosen),
    onSuccess: (newLokasiDosen) => {
      queryClient.invalidateQueries(['lokasiDosen']);
      // queryClient.setQueriesData(['lokasiDosen'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newLokasiDosen.id);
      //   return [newLokasiDosen, ...(filteredOldData ?? [])];
      // });

      setOpen(false);
    }
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dosenId: Number(profil.id),
      kabupatenKotaId: '',
      kecamatanId: '',
      kelurahanId: ''
    },
    validationSchema,
    onSubmit: (values) => {
      toast.promise(
        isEdit ? queryUpdateLokasiDosen.mutateAsync(values) : queryCreateLokasiDosen.mutateAsync(values),
        {
          loading: 'Sedang menyimpan...',
          success: `Data detail lokasi berhasil ${isEdit ? 'diubah' : 'disimpan'} `,
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
        <Tooltip title="Tambah Detail Lokasi">
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
        <DialogTitle> {isEdit ? 'Ubah Detail Lokasi' : 'Tambah Detail Lokasi'}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Autocomplete
              disablePortal
              name="kabupatenKotaId"
              value={kabupatenKotaValue}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama}
              onChange={async (e, value) => {
                if (value !== null) {
                  formik.setFieldValue('kabupatenKotaId', value.id);
                  const kecamatan = await getKecamatan(value.id);
                  setDataKecamatan(kecamatan);
                  formik.setFieldValue('kecamatanId', '');
                  formik.setFieldValue('kelurahanId', '');
                  setKeyKecamatan(!keyKecamatan);
                  setKeyKelurahan(!keyKelurahan);
                } else {
                  formik.setFieldValue('kabupatenKotaId', '');
                  setDataKecamatan([]);
                  setDataKelurahan([]);
                }
                setKabupatenKotaValue(value);
                setKecamatanValue(null);
                setDesaKelurahanValue(null);
              }}
              options={dataKabupatenKota || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Kabupaten/Kota"
                  value={formik.values.kabupatenKotaId}
                  helperText={formik.touched.kabupatenKotaId && formik.errors.kabupatenKotaId}
                  error={formik.touched.kabupatenKotaId && Boolean(formik.errors.kabupatenKotaId)}
                  {...params}
                />
              )}
            />
            <Autocomplete
              disablePortal
              key={`kecamatan${keyKecamatan}`}
              name="kecamatanId"
              value={kecamatanValue}
              disabled={!(dataKecamatan.length > 0) && kecamatanValue === null}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama}
              onChange={async (e, value) => {
                if (value !== null) {
                  formik.setFieldValue('kecamatanId', value.id);
                  const desaKelurahan = await getDesaKelurahan(value.id);
                  setDataKelurahan(desaKelurahan);
                  formik.setFieldValue('kelurahanId', '');
                  setKeyKelurahan(!keyKelurahan);
                } else {
                  formik.setFieldValue('kecamatanId', '');
                  setKeyKelurahan([]);
                }
                setKecamatanValue(value);
                setDesaKelurahanValue(null);
              }}
              options={dataKecamatan || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Kecamatan"
                  value={formik.values.kecamatanId}
                  helperText={formik.touched.kecamatanId && formik.errors.kecamatanId}
                  error={formik.touched.kecamatanId && Boolean(formik.errors.kecamatanId)}
                  {...params}
                />
              )}
            />
            <Autocomplete
              disablePortal
              key={`kelurahan${keyKelurahan}`}
              name="kelurahanId"
              value={desaKelurahanValue}
              disabled={!(dataKelurahan.length > 0) && setDesaKelurahanValue === null}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.nama}
              onChange={async (e, value) => {
                if (value !== null) {
                  formik.setFieldValue('kelurahanId', value.id);
                } else {
                  formik.setFieldValue('kelurahanId', '');
                }
                setDesaKelurahanValue(value);
              }}
              options={dataKelurahan || []}
              sx={{ width: 'auto', marginTop: 2 }}
              renderInput={(params) => (
                <TextField
                  label="Desa/Kelurahan"
                  value={formik.values.kelurahanId}
                  helperText={formik.touched.kelurahanId && formik.errors.kelurahanId}
                  error={formik.touched.kelurahanId && Boolean(formik.errors.kelurahanId)}
                  {...params}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <LoadingButton type="submit" loading={queryCreateLokasiDosen.isLoading || queryUpdateLokasiDosen.isLoading}>
              Simpan
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormLokasiDosen.propTypes = {
  isEdit: PropTypes.bool,
  lokasiDosen: PropTypes.any,
  dataKabupatenKota: PropTypes.array
};

export default FormLokasiDosen;
