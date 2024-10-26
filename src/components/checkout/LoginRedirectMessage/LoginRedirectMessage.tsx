import React from 'react';
import { Button } from '@mui/material';

import './login-redirect-message.css';
import { CHECKOUT_NOT_LOGGED_IN_ERROR } from 'constants/constants';
import InfoMessage from 'components/ui/info-message';

interface LoginRedirectMessageProps {
  onRedirectToLogin: () => void;
}

function LoginRedirectMessage({
  onRedirectToLogin,
}: LoginRedirectMessageProps): JSX.Element {
  return (
    <div className="login-redirect-container">
      <InfoMessage message={CHECKOUT_NOT_LOGGED_IN_ERROR} />
      <Button
        className="redirection-button"
        variant="contained"
        onClick={onRedirectToLogin}
      >
        Click to go to the login page.
      </Button>
    </div>
  );
}

export default LoginRedirectMessage;
