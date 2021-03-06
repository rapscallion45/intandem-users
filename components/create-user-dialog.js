import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ProfileForm from './profile-form';
import actions from '../redux/actions/actions';

const CreateUserDialog = function CreateUserDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const { creating } = useSelector((state) => state.users);

  const handleSave = (userId, fields) => {
    dispatch(actions.createUser(fields));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create New User</DialogTitle>
        <DialogContent>
          <ProfileForm
            handleCancel={handleClose}
            handleSave={handleSave}
            saving={creating}
            showCancel
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

CreateUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreateUserDialog;
