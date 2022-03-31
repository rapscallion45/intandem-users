import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../components/link';

const codeStyle = {
  background: '#ebebeb',
  width: 400,
  padding: 10,
  border: '1px solid grey',
  marginBottom: 10,
};

const ShowReduxState = function ShowReduxState() {
  const reduxState = useSelector((state) => state);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <pre style={codeStyle}>
          <code>{JSON.stringify(reduxState, null, 4)}</code>
        </pre>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default ShowReduxState;
