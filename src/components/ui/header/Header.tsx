import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Avatar } from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';

import './header.css';
import { UserImage } from 'store/user/types';
import APP_ROUTES from 'api/appRoutes';

interface HeaderProps {
  userImage: UserImage;
}

const HeaderComponent: React.FC<HeaderProps> = ({ userImage }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar className="toolbar">
        <Box className="icon-container">
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
