import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
// import data from './data';
import { getVendors, approveVendors } from '../../../services/vendors';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [vendors, setVendors] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    getVendors(setVendors);
  }, []);

  useEffect(() => {
    setFilteredVendors(vendors);
  }, [vendors]);

  const handleApprove = (event) => {
    event.preventDefault();
    approveVendors(selectedVendors, (m) => setMessage(m));
  };

  useEffect(() => {
    const lowercaseQuery = query.toLowerCase();
    setFilteredVendors(
      vendors.filter(
        (vendor) => vendor.shop
          && ((vendor.shop.location && vendor.shop.location.toLowerCase().includes(lowercaseQuery))
            || (vendor.shop.owner && vendor.shop.owner.toLowerCase().includes(lowercaseQuery))
            || (vendor.shop.name && vendor.shop.name.toLowerCase().includes(lowercaseQuery))
            || (vendor.shop.email && vendor.shop.email.toLowerCase().includes(lowercaseQuery)))
      )
    );
  }, [query]);

  return (
    <Page className={classes.root} title="Vendors">
      <Container maxWidth={false}>
        {message}
        <Toolbar setFilter={setQuery} handleApprove={handleApprove} />
        <Box mt={3}>
          <Results
            vendors={filteredVendors}
            setSelectedVendors={setSelectedVendors}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
