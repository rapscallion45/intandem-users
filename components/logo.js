import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: '7px',
  width: 200,
  height: 40,
  maxWidth: 400,
  [theme.breakpoints.up('sm')]: {
    width: 300,
    height: 60,
  },
}));

const Logo = function Logo({ sx }) {
  return <BoxStyle alt="logo-image" component="img" src="/static/logo.webp" sx={{ ...sx }} />;
};

Logo.propTypes = {
  sx: PropTypes.objectOf(PropTypes.object),
};

export default Logo;
