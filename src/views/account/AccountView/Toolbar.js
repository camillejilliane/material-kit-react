import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const { setFilter, handleApprove } = rest;

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Typography className={classes.name} color="textPrimary" variant="h2">
        Manage Vendors
      </Typography>
      <Box mt={1}>
        <Typography
          className={classes.name}
          color="textSecondary"
          variant="subtitle2"
        >
          Accounts &gt; Vendors
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box>
          <Box minWidth={500}>
            <TextField
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search vendors"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box>
          <Button className={classes.exportButton}>Export CSV</Button>
          <Button color="primary" variant="contained" onClick={handleApprove}>
            Approve Vendors
          </Button>
        </Box>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
