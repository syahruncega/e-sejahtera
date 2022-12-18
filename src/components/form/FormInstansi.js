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

const FormInstansi = ({ isEdit, instansi }) => {
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
        <DialogTitle> {isEdit ? 'Ubah Instansi' : 'Tambah Instansi'}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Nama Instansi"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 2 }}
            defaultValue={instansi ? instansi.nama_instansi : ''}
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

FormInstansi.propTypes = {
  isEdit: PropTypes.bool,
  instansi: PropTypes.any
};

export default FormInstansi;
