import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import { IconBookmark } from '@tabler/icons';

const ConfirmDialog = ({ handleFunc, title, description }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Hapus">
        <Fab
          color="secondary"
          size="small"
          sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
          onClick={handleClickOpen}
        >
          <IconBookmark size={20} />
        </Fab>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose} sx={{ color: 'gray' }}>
            Batal
          </Button>
          <LoadingButton color="primary" onClick={handleFunc} autoFocus>
            Proses
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

ConfirmDialog.propTypes = {
  handleFunc: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ConfirmDialog;
