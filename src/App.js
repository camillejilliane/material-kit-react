import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import initFirebase from './services';
import { checkAuthenticated } from './services/auth';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const routing = useRoutes(routes(isLoggedIn, setIsLoggedIn));

  useEffect(() => {
    checkAuthenticated(setIsLoggedIn);
  }, []);

  initFirebase();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
