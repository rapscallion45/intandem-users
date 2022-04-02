import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import EditUserDialog from './edit-user-dialog';
import DeleteUserDialog from './delete-user-dialog';
import Link from './link';
import actions from '../redux/actions/actions';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const UserItem = function UserItem({ userData }) {
  const dispatch = useDispatch();
  const { updating, updated } = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const deleteUser = () => {
    dispatch(actions.deleteUser(userData.id));
  };

  useEffect(() => {
    if (updated && !updating) setOpenEdit(false);
  }, [updated, updating]);

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase
            component={Link}
            href={`/user/${userData.id}`}
            sx={{ width: 128, height: 128 }}
          >
            <Img alt="user" src={userData.avatar} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {userData.first_name} {userData.last_name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Email: {userData.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {userData.id}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button color="primary" variant="contained" onClick={handleClickOpenEdit} fullWidth>
                Edit User
              </Button>
            </Grid>
            <Grid item>
              <Button color="error" variant="contained" onClick={handleClickOpen} fullWidth>
                Delete User
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <EditUserDialog userData={userData} open={openEdit} handleClose={handleCloseEdit} />
      <DeleteUserDialog
        userData={userData}
        open={open}
        handleClose={handleClose}
        confirm={deleteUser}
      />
    </Paper>
  );
};

export default UserItem;
