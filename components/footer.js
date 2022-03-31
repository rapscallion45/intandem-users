import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Copyright = function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href="https://www.linkedin.com/in/carlscrivener/">
        Carl Scrivener
      </Link>
      {' tested on 31-02-22'}.
    </Typography>
  );
};

const Footer = function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          This test application was built for Intandem Solutions by Carl Scrivener.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
