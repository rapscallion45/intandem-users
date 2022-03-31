import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Examples from '../components/examples';
import Footer from '../components/footer';
import Logo from '../components/logo';
import { startClock } from '../actions/actions';
import Link from '../components/link';

const Index = function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startClock());
  }, [dispatch]);

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
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Examples />
          <Button variant="contained" component={Link} noLinkStyle href="/show-redux-state">
            Click to see current Redux State
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Index;
