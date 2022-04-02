import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import Page from '../components/page';
import Users from '../components/users';
import Layout from '../layouts/Layout/layout';

const Index = function Index() {
  return (
    <Page title="Intandem | Users List">
      <Container maxWidth="lg">
        <Box mt={5} mb={4}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">
              <HomeIcon sx={{ mr: 0.5, pt: '5px' }} fontSize="inherit" />
              Users List
            </Typography>
          </Breadcrumbs>
        </Box>
        <Users />
      </Container>
    </Page>
  );
};

Index.Layout = Layout;

export default Index;
