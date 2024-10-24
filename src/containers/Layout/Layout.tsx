import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import APP_ROUTES from 'api/appRoutes';
import LayoutComponent from 'components/ui/layout';
import { SnackbarProvider } from 'hooks/useSnackbar';
import { useUser } from 'store/user/selectors';
import { User, UserImage } from 'store/user/types';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  const user: User | null = useUser();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleUserAvatarClick = () => {
    if (!user) {
      handleNavigation(APP_ROUTES.LOGIN);
    }
  };

  const imageAlt = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

  const imageProps: UserImage = {
    url: user?.image || '',
    alt: imageAlt || 'User profile',
  };

  return (
    <SnackbarProvider>
      <LayoutComponent
        image={imageProps}
        onNavigate={handleNavigation}
        onUserAvatarClick={handleUserAvatarClick}
      >
        {children}
      </LayoutComponent>
    </SnackbarProvider>
  );
}

export default Layout;
