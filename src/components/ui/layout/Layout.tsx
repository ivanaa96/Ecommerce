import React, { ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';

import './layout.css';
import HeaderComponent from 'components/ui/header';
import { useSnackbarContext } from 'hooks/useSnackbar';
import { UserImage } from 'store/user/types';

interface LayoutComponentProps {
  image: UserImage;
  children: ReactNode;
  onNavigate: (path: string) => void;
  onUserAvatarClick: () => void;
}

function LayoutComponent({
  image,
  children,
  onNavigate,
  onUserAvatarClick,
}: LayoutComponentProps): JSX.Element {
  const { snackbar, closeSnackbar } = useSnackbarContext();

  return (
    <div className="layout">
      <HeaderComponent
        userImage={image}
        onNavigate={onNavigate}
        onUserAvatarClick={onUserAvatarClick}
      />
      <main className="main-content">{children}</main>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LayoutComponent;
