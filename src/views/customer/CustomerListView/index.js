import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
// import data from './data';
import { getCustomers, deleteCustomers } from '../../../services/customers';

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
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    getCustomers(setCustomers);
  }, []);

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  const handleDelete = (event) => {
    event.preventDefault();
    deleteCustomers(selectedCustomers, (m) => setMessage(m));
  };

  useEffect(() => {
    const lowercaseQuery = query.toLowerCase();
    setFilteredCustomers(
      customers.filter(
        (customer) => (`${customer.firstName} ${customer.lastName}`
            && `${customer.firstName} ${customer.lastName}`
              .toLowerCase()
              .includes(lowercaseQuery))
          || (customer.address
            && customer.address.toLowerCase().includes(lowercaseQuery))
      )
    );
  }, [query]);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        {message}
        <Toolbar setFilter={setQuery} handleDelete={handleDelete} />
        <Box mt={3}>
          <Results
            customers={filteredCustomers}
            setSelectedCustomers={setSelectedCustomers}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
