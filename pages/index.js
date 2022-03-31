import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Footer from '../components/footer';
import Logo from '../components/logo';
import Link from '../components/link';
import Users from '../components/users';

const Index = function Index() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Box sx={{ flexGrow: 1, maxHeight: 80 }}>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <Link href="/" sx={{ mr: 5 }}>
              <Logo />
            </Link>
            <Typography variant="h6" color="inherit" component="div">
              Intandem Users
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="lg">
        <Users />
      </Container>
      <Footer />
    </Box>
  );
};

export default Index;
