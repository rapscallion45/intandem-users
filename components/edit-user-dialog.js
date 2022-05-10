import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ProfileForm from './profile-form';
import actions from '../redux/actions/actions';

const EditUserDialog = function EditUserDialog({ userData, open, handleClose }) {
  const dispatch = useDispatch();
  const { updating } = useSelector((state) => state.users);

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
            saving={updating}
            showCancel
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

EditUserDialog.propTypes = {
  userData: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditUserDialog;
