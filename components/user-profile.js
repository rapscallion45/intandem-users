import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import WarningIcon from '@mui/icons-material/Warning';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import ProfileForm from './profile-form';
import userActions from '../redux/actions/actions';

const UserProfile = function UserProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { deleting } = useSelector((state) => state.users);
  const { user, loading, loaded, error } = useSelector((state) => state.userProfile);
  const { id } = router.query;

  useEffect(() => {
    dispatch(userActions.getUserById(id));
  }, []);

  const deleteUser = () => {
    dispatch(userActions.deleteUser(user.data.id));
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={0} md={3} />
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '50px 20px',
            }}
          >
            {loading && (
              <>
                <Skeleton variant="circular" width={100} height={100} />
                <Box mt={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress color="error" />
                </Box>
                <Typography variant="h6" align="center" mt={1}>
                  Loading user profile...
                </Typography>
              </>
            )}
            {error && !loaded && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <WarningIcon color="error" />
                </Box>
                <Typography variant="h6" align="center" mt={1}>
                  Failed to load user profile.
                </Typography>
              </>
            )}
            {loaded && !loading && (
              <>
                <Avatar
                  alt={user.data.last_name}
                  src={user.data.avatar}
                  sx={{ width: '100px', height: '100px' }}
                />
                <Divider />
                <Box
                  sx={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px',
                  }}
                >
                  <ProfileForm userData={user.data} />
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={deleteUser}
                      disabled={deleting}
                      sx={{ minWidth: 150 }}
                    >
                      {!deleting && 'Delete User'}
                      {deleting && <CircularProgress size={25} color="inherit" />}
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
