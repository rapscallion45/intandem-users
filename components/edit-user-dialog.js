import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ProfileForm from './profile-form';

const EditUserDialog = function EditUserDialog({ userData, open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <ProfileForm userData={userData} handleCancel={handleClose} showCancel />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUserDialog;
