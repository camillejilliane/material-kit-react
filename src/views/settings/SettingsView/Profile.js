import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, user, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.avatarUrl}>
            {getInitials(`${user.firstName} ${user.lastName}`)}
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h3">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {user.address}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {user.contactNumber}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
};

Profile.defaultProps = {
  className: '',
  user: {
    firstName: '',
    lastName: '',
    address: '',
    avatarUrl: null,
  }
};

export default Profile;
