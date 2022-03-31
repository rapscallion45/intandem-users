import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UserItem from './user-item';
import PaginationButtons from './pagination-buttons';

const data = [
  {
    id: 7,
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg',
  },
  {
    id: 8,
    email: 'lindsay.ferguson@reqres.in',
    first_name: 'Lindsay',
    last_name: 'Ferguson',
    avatar: 'https://reqres.in/img/faces/8-image.jpg',
  },
  {
    id: 9,
    email: 'tobias.funke@reqres.in',
    first_name: 'Tobias',
    last_name: 'Funke',
    avatar: 'https://reqres.in/img/faces/9-image.jpg',
  },
  {
    id: 10,
    email: 'byron.fields@reqres.in',
    first_name: 'Byron',
    last_name: 'Fields',
    avatar: 'https://reqres.in/img/faces/10-image.jpg',
  },
  {
    id: 11,
    email: 'george.edwards@reqres.in',
    first_name: 'George',
    last_name: 'Edwards',
    avatar: 'https://reqres.in/img/faces/11-image.jpg',
  },
  {
    id: 12,
    email: 'rachel.howell@reqres.in',
    first_name: 'Rachel',
    last_name: 'Howell',
    avatar: 'https://reqres.in/img/faces/12-image.jpg',
  },
];

const Users = function Users() {
  const pageChange = (event, page) => {
    // set page num
    console.log('update ' + page);
  };

  return (
    <Box mb={4}>
      <Typography variant="h4" align="center" mt={5} mb={3}>
        Users List
      </Typography>
      <Grid container spacing={3}>
        {data.map((user) => (
          <Grid key={user.id} item xs={12} sm={4}>
            <UserItem userData={user} />
          </Grid>
        ))}
      </Grid>

      <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
        <PaginationButtons numPages={2} onChange={pageChange} />
      </Box>
    </Box>
  );
};

export default Users;
