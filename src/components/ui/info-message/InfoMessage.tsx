import React from 'react';
import { Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import './info-message.css';

interface InfoMessageProps {
  message: string;
}

function InfoMessage({ message }: InfoMessageProps): JSX.Element {
  return (
    <div className="info-message-container">
      <InfoIcon className="info-icon" />
      <Typography variant="body1" className="info-message">
        {message}
      </Typography>
    </div>
  );
}

export default InfoMessage;
