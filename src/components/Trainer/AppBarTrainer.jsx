import {
  AccountCircle,
  FactCheck,
  Menu,
  PeopleAlt,
  ShoppingBag,
} from '@mui/icons-material';

import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
  Menu as Men,
} from '@mui/material';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../Context/UserAuthContext';
import { db } from '../../../src/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';

const AppBarTrainer = ({ trainerName }) => {
  const navigate = useNavigate();
  const { LogOut, user } = useUserAuth();
  const trainerRef = doc(db, 'users', '5qO5w7dwRvzo3YeCoppe');
  const [name, setName] = useState();

  const handleLogout = async () => {
    try {
      await LogOut();
      navigate('/signin');
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getDoc(trainerRef).then((doc) => {
      setName(doc.data().name);
    });
  }, []);

  const [state, setState] = useState({
    left: false,
  });

  // Handles drawer toggling
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Handles items in the menu
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' ? 'auto' : 250,
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/trainer/clients')}>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText>Clients</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/trainer/orders')}>
            <ListItemIcon>
              <ShoppingBag />
            </ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/trainer/packages')}>
            <ListItemIcon>
              <FactCheck />
            </ListItemIcon>
            <ListItemText>Packages</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // Stores profile menu state
  const [MenuStatus, setMenuStatus] = useState(false);

  return (
    <Box>
      <AppBar position='sticky' sx={{ backgroundColor: '#2A3036' }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {trainerName}
          </Typography>

          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={() => setMenuStatus(true)}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}

      <Men
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        open={MenuStatus}
        onClose={() => setMenuStatus(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => navigate('/trainer/profile')}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Men>
    </Box>
  );
};

export default AppBarTrainer;
