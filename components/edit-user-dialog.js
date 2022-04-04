import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ProfileForm from './profile-form';
import actions from '../redux/actions/actions';

const EditUserDialog = function EditUserDialog({ userData, open, handleClose }) {
  const dispatch = useDispatch();

  const handleSave = (userId, fields) => {
    dispatch(actions.editUser(userId, fields));
  };

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
          <ProfileForm
            userData={userData}
            handleCancel={handleClose}
            handleSave={handleSave}
            showCancel
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUserDialog;
