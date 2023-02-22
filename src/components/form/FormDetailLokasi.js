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
import { useRouter } from 'next/router';
import { createDetailLokasi, getDesaKelurahan, getKecamatan, updateDetailLokasi } from 'store/slices/detail-lokasi';
import { EditOutlined, EditTwoTone } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const validationSchema = yup.object({
  detailSubKegiatanId: yup.number().required('Detail Sub Kegiatan wajib diisi'),
  kabupatenKotaId: yup.number().required('Kabupaten wajib diisi'),
  kecamatanId: yup.number().nullable().optional(),
  kelurahanId: yup.number().nullable().optional()
});

const FormDetailLokasi = ({ isEdit, detailLokasi, dataKabupatenKota }) => {
  const [open, setOpen] = useState(false);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);
  const [keyKecamatan, setKeyKecamatan] = useState(false);
  const [keyKelurahan, setKeyKelurahan] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [kabupatenKotaValue, setKabupatenKotaValue] = useState(isEdit ? detailLokasi.kabupatenKota : null);
  const [kecamatanValue, setKecamatanValue] = useState(isEdit ? detailLokasi.kecamatan : null);
  const [desaKelurahanValue, setDesaKelurahanValue] = useState(isEdit ? detailLokasi.kelurahan : null);

  const queryCreateDetailLokasi = useMutation({
    mutationFn: (newDetailLokasi) => createDetailLokasi(newDetailLokasi),

    onSuccess: (newDetailLokasi) => {
      queryClient.invalidateQueries(['detailLokasi']);
      // queryClient.setQueriesData(['detailLokasi'], (oldData) => [newDetailLokasi, ...(oldData ?? [])]);
      setOpen(false);
      setKabupatenKotaValue(null);
      setKecamatanValue(null);
      setDesaKelurahanValue(null);
      // eslint-disable-next-line no-use-before-define
      formik.resetForm();
    }
  });

  const queryUpdateDetailLokasi = useMutation({
    mutationFn: (newDetailLokasi) => updateDetailLokasi(detailLokasi.id, newDetailLokasi),
    onSuccess: (newDetailLokasi) => {
      queryClient.invalidateQueries(['detailLokasi']);
      // queryClient.setQueriesData(['detailLokasi'], (oldData) => {
      //   const filteredOldData = oldData.filter((values) => values.id !== newDetailLokasi.id);
      //   return [newDetailLokasi, ...(filteredOldData ?? [])];
      // });

      setOpen(false);
    }
  });

  const formik = useFormik({
    initialValues: {
      detailSubKegiatanId: Number(router.query.detailSubKegiatanId),
      kabupatenKotaId: '',
      kecamatanId: '',
      kelurahanId: ''
    },
    validationSchema,
    onSubmit: (val) => {
      const values = { ...val, kecamatanId: val.kecamatanId || '-', kelurahanId: val.kelurahanId || '-' };
      toast.promise(
        isEdit ? queryUpdateDetailLokasi.mutateAsync(values) : queryCreateDetailLokasi.mutateAsync(values),
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
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle> {isEdit ? 'Ubah Detail Lokasi' : 'Tambah Detail Lokasi'}</DialogTitle>
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
            <Button type="submit">Simpan</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FormDetailLokasi.propTypes = {
  isEdit: PropTypes.bool,
  detailLokasi: PropTypes.any,
  dataKabupatenKota: PropTypes.array
};

export default FormDetailLokasi;
