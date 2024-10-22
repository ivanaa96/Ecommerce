import React, { ReactNode } from 'react';

import LayoutComponent from 'components/ui/layout';
import { useUser } from 'store/user/selectors';
import { User, UserImage } from 'store/user/types';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  const user = useUser() as User;

  const imageAlt = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

  const imageProps: UserImage = {
    url: user?.image || '',
    alt: imageAlt || 'User profile',
  };

  return <LayoutComponent image={imageProps}>{children}</LayoutComponent>;
}

export default Layout;
