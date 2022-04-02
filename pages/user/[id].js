import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Link from '../../components/link';
import Page from '../../components/page';
import UserProfile from '../../components/user-profile';
import Layout from '../../layouts/Layout/layout';

const User = function User() {
  return (
    <Page title="Intandem | User Profile">
      <Container maxWidth="lg">
        <Box mt={5} mb={4}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5, pt: '5px' }} fontSize="inherit" />
              User List
            </Link>
            <Typography color="text.primary">User Profile</Typography>
          </Breadcrumbs>
        </Box>
        <Box mt={5} mb={4}>
          <UserProfile />
        </Box>
      </Container>
    </Page>
  );
};

User.Layout = Layout;

export default User;
