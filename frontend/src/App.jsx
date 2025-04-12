import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import theme from './theme';
import store from './store';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OwnerDashboard from './pages/owner/Dashboard';
import ResidentDashboard from './pages/resident/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/PGatEase" element={<Home />} />
              <Route path="/PGatEase/#/login" element={<Login />} />
              <Route path="/PGatEase/#/register" element={<Register />} />
              <Route path="/PGatEase/#/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/PGatEase/#/resident/dashboard" element={<ResidentDashboard />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
