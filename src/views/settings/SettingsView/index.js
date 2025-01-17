import React, { useState, useEffect } from 'react';
import {
  Box, Container, Grid, makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Notifications from './Notifications';
import Password from './Password';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { getCurrentUser } from '../../../services/users';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  // const [message, setMessage] = useState([]);

  useEffect(() => {
    getCurrentUser(setUser);
  }, []);

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile user={user} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails user={user} />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box mt={3}>
          <Notifications />
        </Box>
        <Box mt={3}>
          <Password />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
