import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';

const DeleteDialog = ({ id, deleteFunc, mutationKey }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteQuery = useMutation({
    mutationFn: () => deleteFunc(id),
    onSuccess: () => {
      queryClient.setQueriesData([mutationKey], (oldData) => oldData.filter((values) => values.id !== id));
      setOpen(false);
    }
  });

  const handleDelete = () => {
    toast.promise(
      deleteQuery.mutateAsync(),
      {
        loading: 'Sedang menghapus...',
        success: 'Data berhasil dihapus',
        error: (err) => `${err.message}`
      },
      { id: 'toast' }
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Hapus">
        <IconButton color="error" size="medium" aria-label="Hapus" onClick={handleClickOpen}>
          <DeleteTwoTone fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Hapus data?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Data yang telah dihapus tidak dapat dikembalikan.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={deleteQuery.isLoading} onClick={handleClose}>
            Batal
          </Button>
          <LoadingButton color="error" loading={deleteQuery.isLoading} onClick={handleDelete} autoFocus>
            Hapus
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteDialog.propTypes = {
  id: PropTypes.any,
  deleteFunc: PropTypes.func,
  mutationKey: PropTypes.string
};

export default DeleteDialog;
