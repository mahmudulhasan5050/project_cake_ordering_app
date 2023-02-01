import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';

import DrawerRes from './DrawerRes';
import { logout } from '../../features/auth/authSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

const pagesForAdmin = [
  { name: 'Cakes', nav: '/' },
  { name: 'Orders', nav: '/' },
  { name: 'Cakes Details', nav: '/createproduct' },
  { name: 'Users Details', nav: '/users' },
  { name: 'Single Product', nav: '/singleproduct' },
];

const Header = () => {
  const [tabIndicator, setTabIndicator] = useState(0);
  const isLoggedStatus = useAppSelector((state) => state.auth.authInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>
      <AppBar sx={{ background: '#455a64' }}>
        <Toolbar>
          <CakeIcon sx={{ fontSize: '2.5em' }} />
          {mdDown ? (
            <DrawerRes pages={pagesForAdmin} />
          ) : (
            <>
              <Tabs
                textColor='inherit'
                value={tabIndicator}
                onChange={(e, tabIndicator) => setTabIndicator(tabIndicator)}
                indicatorColor='primary'
                sx={{ marginLeft: 'auto' }}
              >
                <Tab label='Home' onClick={() => navigate('/')} />

                {isLoggedStatus.isLoggedIn && (
                  <Tab
                    label='My Orders'
                    onClick={() => navigate('/myorders')}
                  />
                )}

                {isLoggedStatus.admin && (
                  <Tab
                    label='Cake Details'
                    onClick={() => navigate('/cakedetails')}
                  />
                )}
                {isLoggedStatus.admin && (
                  <Tab
                    label='User Details'
                    onClick={() => navigate('/userdetails')}
                  />
                )}
                {isLoggedStatus.admin && (
                  <Tab
                    label='Order Details'
                    onClick={() => navigate('/orderdetails')}
                  />
                )}
              </Tabs>
              {!isLoggedStatus.isLoggedIn ? (
                <Button
                  sx={{ marginLeft: '1em' }}
                  variant='contained'
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  sx={{ marginLeft: '1em' }}
                  variant='contained'
                  onClick={() => {
                    dispatch(logout());
                    setTabIndicator(0);
                    navigate('/');
                  }}
                >
                  Logout
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Grid sx={{ ...theme.mixins.toolbar, marginBottom: '1em' }}></Grid>
    </React.Fragment>
  );
};

export default Header;
