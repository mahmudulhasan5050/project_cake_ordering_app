import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../features/auth/authSlice';

//.../Header.tsx
const DrawerRes = ({ pages }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isLoggedStatus = useAppSelector((state) => state.auth.authInfo);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {pages.map((page: any) => (
            <ListItemButton
              key={page.name}
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemIcon>
                <ListItemText onClick={() => navigate(page.nav)}>
                  {page.name}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          {!isLoggedStatus.isLoggedIn ? (
            <Button
              sx={{ marginLeft: '1em' }}
              variant='contained'
              onClick={() => {
                navigate('/auth');
                setOpenDrawer(false);
              }}
            >
              Sign In
            </Button>
          ) : (
            <Button
              sx={{ marginLeft: '1em' }}
              variant='contained'
              onClick={() => {
                dispatch(logout());
                setOpenDrawer(false)
              }}
            >
              Logout
            </Button>
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: 'white', marginLeft: 'auto' }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerRes;
