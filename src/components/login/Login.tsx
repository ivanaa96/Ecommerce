import React from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

import './login.css';

interface LoginComponentProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
  error,
}) => {
  return (
    <Box className="login-container">
      <Typography variant="h4" component="h2" className="login-title">
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="login-form">
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="login-button"
        >
          Login
        </Button>
      </form>
      {error && (
        <Alert severity="error" className="login-alert">
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default LoginComponent;
