import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Page from '../components/page';
import Users from '../components/users';
import Layout from '../layouts/Layout/layout';
import CreateUserDialog from '../components/create-user-dialog';

const Index = function Index() {
  const { creating, created } = useSelector((state) => state.users);
  const [createUserOpen, setCreateUserOpen] = useState(false);

  useEffect(() => {
    if (created && !creating) setCreateUserOpen(false);
  }, [created, creating]);

  const handleCreateUserOpen = () => {
    setCreateUserOpen(true);
  };

  const handleCreateUserClose = () => {
    setCreateUserOpen(false);
  };

  return (
    <Page title="Intandem | Users List">
      <Container maxWidth="lg">
        <Box
          mt={5}
          mb={4}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">
              <HomeIcon sx={{ mr: 0.5, pt: '5px' }} fontSize="inherit" />
              Users List
            </Typography>
          </Breadcrumbs>
          <Button
            onClick={handleCreateUserOpen}
            variant="contained"
            color="success"
            endIcon={<AddCircleIcon />}
            sx={{ marginLeft: 'auto' }}
          >
            Create User
          </Button>
        </Box>
        <Users />
      </Container>
      <CreateUserDialog open={createUserOpen} handleClose={handleCreateUserClose} />
    </Page>
  );
};

Index.Layout = Layout;

export default Index;
