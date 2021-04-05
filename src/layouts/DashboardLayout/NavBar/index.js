import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    shownWhenLoggedIn: true
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers',
    shownWhenLoggedIn: true
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Vendors',
    shownWhenLoggedIn: true
  },
  {
    href: '/app/transactions',
    icon: ShoppingBagIcon,
    title: 'Transactions',
    shownWhenLoggedIn: true
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
    shownWhenLoggedIn: true
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login',
    shownWhenLoggedIn: false
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register',
    shownWhenLoggedIn: false
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({
  onMobileClose, openMobile, user, isLoggedIn
}) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatarUrl}
          to="/app/account"
        >
          {getInitials(`${user.firstName} ${user.lastName}`)}
        </Avatar>
        <Box flexDirection="column">
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.address || ''}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items
            .filter((item) => item.shownWhenLoggedIn === isLoggedIn)
            .map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
  user: {}
};

export default NavBar;
