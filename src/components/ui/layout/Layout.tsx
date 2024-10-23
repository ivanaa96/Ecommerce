import React, { ReactNode } from 'react';

import './layout.css';
import HeaderComponent from 'components/ui/header';
import { UserImage } from 'store/user/types';

interface LayoutComponentProps {
  image: UserImage;
  children: ReactNode;
}

function LayoutComponent({
  image,
  children,
}: LayoutComponentProps): JSX.Element {
  return (
    <div className="layout">
      <HeaderComponent userImage={image} />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default LayoutComponent;
