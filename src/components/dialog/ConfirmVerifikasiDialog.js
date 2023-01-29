import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox, Fab, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import { IconBookmark } from '@tabler/icons';

const ConfirmVerifikasiDialog = ({ handleFunc, title, description }) => {
  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCheck(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleClickOpen} fullWidth>
          Verifikasi
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <FormControlLabel
                control={<Checkbox checked={isCheck} onChange={() => setIsCheck(!isCheck)} name="checked" color="primary" />}
                label="Dengan ini saya menyatakan bahwa data dan informasi yang saya isi adalah benar dan sesuai, serta saya bertanggung jawab penuh atas data informasi tersebut"
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose} sx={{ color: 'gray' }}>
            Batal
          </Button>
          <LoadingButton color="primary" disabled={!isCheck} onClick={handleFunc} autoFocus>
            Proses
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

ConfirmVerifikasiDialog.propTypes = {
  handleFunc: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ConfirmVerifikasiDialog;
