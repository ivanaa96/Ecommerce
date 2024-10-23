import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';

import './header.css';
import APP_ROUTES from 'api/appRoutes';
import { UserImage } from 'store/user/types';

interface HeaderProps {
  userImage: UserImage;
}

function HeaderComponent({ userImage }: HeaderProps): JSX.Element {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar className="toolbar">
        <IconButton
          size="small"
          className="icon-button"
          onClick={() => handleNavigation(APP_ROUTES.FAVORITES)}
        >
          <Favorite />
        </IconButton>
        <IconButton
          size="small"
          className="icon-button"
          onClick={() => handleNavigation(APP_ROUTES.CART)}
        >
          <ShoppingCart />
        </IconButton>
        <IconButton size="small" className="icon-button">
          <Avatar
            src={userImage.url}
            alt={userImage.alt}
            sx={{ width: 24, height: 24 }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderComponent;
