import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Tooltip } from '@mui/material';
import { Favorite, ShoppingCart, Home } from '@mui/icons-material';

import './header.css';
import APP_ROUTES from 'api/appRoutes';
import { LOGIN_TOOLTIP_MESSAGE } from 'constants/constants';
import { UserImage } from 'store/user/types';

interface HeaderProps {
  userImage: UserImage;
  onNavigate: (path: string) => void;
  onUserAvatarClick: () => void;
}

function HeaderComponent({
  userImage,
  onNavigate,
  onUserAvatarClick,
}: HeaderProps): JSX.Element {
  return (
    <AppBar position="static" className="header">
      <Toolbar className="toolbar">
        <IconButton
          size="small"
          className="icon-button"
          onClick={() => onNavigate(APP_ROUTES.DASHBOARD)}
        >
          <Home />
        </IconButton>
        <IconButton
          size="small"
          className="icon-button"
          onClick={() => onNavigate(APP_ROUTES.FAVORITES)}
        >
          <Favorite />
        </IconButton>
        <IconButton
          size="small"
          className="icon-button"
          onClick={() => onNavigate(APP_ROUTES.CART)}
        >
          <ShoppingCart />
        </IconButton>
        <Tooltip
          title={!userImage.url ? LOGIN_TOOLTIP_MESSAGE : ''}
          arrow
          disableHoverListener={!!userImage.url}
        >
          <IconButton
            size="small"
            className="icon-button"
            onClick={onUserAvatarClick}
          >
            <Avatar
              src={userImage.url}
              alt={userImage.alt}
              sx={{ width: 24, height: 24 }}
            />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderComponent;
