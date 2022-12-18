import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, Fab, MenuItem, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';

const FormLokasi = ({ isEdit, lokasi }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isEdit ? (
        <MenuItem onClick={handleClickOpen}> Ubah</MenuItem>
      ) : (
        <Tooltip title="Tambah Lokasi">
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
        <DialogTitle> {isEdit ? 'Ubah Lokasi' : 'Tambah Lokasi'}</DialogTitle>
        <DialogContent>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['Palu', 'Morowali']}
            sx={{ width: 'auto', marginTop: 2 }}
            renderInput={(params) => <TextField {...params} label="Kota/Kabupaten" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['Palu', 'Morowali']}
            sx={{ width: 'auto', marginTop: 2 }}
            renderInput={(params) => <TextField {...params} label="Kecamatan" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['Palu', 'Morowali']}
            sx={{ width: 'auto', marginTop: 2 }}
            renderInput={(params) => <TextField {...params} label="Desa/Keluarahan" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button onClick={handleClose}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

FormLokasi.propTypes = {
  isEdit: PropTypes.bool,
  lokasi: PropTypes.any
};

export default FormLokasi;
