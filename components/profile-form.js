import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import actions from '../redux/actions/actions';

const ProfileForm = function ProfileForm({ userData, handleCancel, showCancel }) {
  const dispatch = useDispatch();
  const { updating } = useSelector((state) => state.users);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: userData.email || '',
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
    },
    validationSchema,
    onSubmit: (fields) => {
      dispatch(actions.editUser(userData.id, fields));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="first_name"
            name="first_name"
            label="First Name"
            type="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="last_name"
            name="last_name"
            label="Last Name"
            type="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="end" spacing={2} mt={1}>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="success" disabled={updating}>
              {!updating && 'Save'}
              {updating && <CircularProgress size={25} color="inherit" />}
            </Button>
          </Grid>
          {showCancel && (
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;
