import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import WarningIcon from '@mui/icons-material/Warning';
import UserItem from './user-item';
import userActions from '../redux/actions/actions';

const Users = function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);

  const pageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(userActions.getUsersByPage(currentPage, 6));
  }, [currentPage]);

  return (
    <Box mt={5} mb={4}>
      <Grid container spacing={3}>
        {users.loading && (
          <Grid item xs={12}>
            <Box mt={5} mb={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color="error" />
              </Box>
              <Typography variant="h6" align="center" mt={1}>
                Loading Users...
              </Typography>
            </Box>
          </Grid>
        )}
        {users.error && !users.loaded && (
          <Grid item xs={12}>
            <Box mt={5} mb={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <WarningIcon color="error" />
              </Box>
              <Typography variant="h6" align="center" mt={1}>
                Failed to load users.
              </Typography>
            </Box>
          </Grid>
        )}
        {users.loaded &&
          users.users.data.map((user) => (
            <Grid key={user.id} item xs={12} sm={4}>
              <UserItem userData={user} />
            </Grid>
          ))}
      </Grid>

      {users.loaded && (
        <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            page={users.users.page}
            onChange={pageChange}
            count={users.users.total_pages}
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default Users;
