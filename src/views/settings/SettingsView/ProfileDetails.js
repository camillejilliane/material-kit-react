import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { updateUserProfile } from '../../../services/users';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNumber: user.contactNumber,
        address: user.address
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        contactNumber: Yup.string().required('Contact number is required'),
        address: Yup.string()
      })}
      onSubmit={(values) => {
        updateUserProfile(values, (m) => setMessage(m));
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          autoComplete="off"
          noValidate
          className={clsx(classes.root, className)}
          {...rest}
          onSubmit={handleSubmit}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            {message}
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    name="firstName"
                    error={Boolean(touched.firstName && errors.firstName)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    error={Boolean(touched.lastName && errors.lastName)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    error={Boolean(touched.email && errors.email)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="contactNumber"
                    error={Boolean(
                      touched.contactNumber && errors.contactNumber
                    )}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contactNumber}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    error={Boolean(touched.address && errors.address)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                type="submit"
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
};

ProfileDetails.defaultProps = {
  className: '',
  user: {
    firstName: '',
    lastName: '',
    address: '',
    avatarUrl: null
  }
};

export default ProfileDetails;
