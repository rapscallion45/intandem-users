import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

const DeleteUserDialog = function DeleteUserDialog({ userData, open, handleClose, confirm }) {
  const { deleting } = useSelector((state) => state.users);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete ${userData.first_name} ${userData.last_name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to permanently delete this user. This process cannot be undone. Are you
            sure you wish to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button color="secondary" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirm}
            disabled={deleting}
            sx={{ minWidth: 150 }}
          >
            {!deleting && 'Delete User'}
            {deleting && <CircularProgress size={25} color="inherit" />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUserDialog;
