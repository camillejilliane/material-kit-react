import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { getCurrentUser } from '../../services/users';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = ({ setIsLoggedIn }) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    getCurrentUser(setUser);
  }, []);

  return (
    <div className={classes.root}>
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        setIsLoggedIn={setIsLoggedIn}
      />
      <NavBar
        user={user}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  setIsLoggedIn: PropTypes.func
};

export default DashboardLayout;
