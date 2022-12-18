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

const FormDetailSubKegiatan = ({ isEdit, detailSubKegiatan }) => {
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
        <Tooltip title="Tambah Detail Sub Kegiatan">
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
        <DialogTitle> {isEdit ? 'Ubah Detail Sub Kegiatan' : 'Tambah Detail Sub Kegiatan'}</DialogTitle>
        <DialogContent>
          <TextField id="outlined-basic" label="Fokus Belanja" variant="outlined" fullWidth sx={{ marginTop: 2 }} />
          <TextField id="outlined-basic" label="Indikator" variant="outlined" fullWidth sx={{ marginTop: 2 }} />
          <TextField id="outlined-basic" label="Target" variant="outlined" fullWidth sx={{ marginTop: 2 }} />
          <TextField id="outlined-basic" label="Satuan" variant="outlined" fullWidth sx={{ marginTop: 2 }} />
          <TextField id="outlined-basic" label="Pagu" variant="outlined" fullWidth sx={{ marginTop: 2 }} />
          <TextField id="outlined-basic" label="Keterangan" variant="outlined" fullWidth sx={{ marginTop: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button onClick={handleClose}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

FormDetailSubKegiatan.propTypes = {
  isEdit: PropTypes.bool,
  detailSubKegiatan: PropTypes.any
};

export default FormDetailSubKegiatan;
