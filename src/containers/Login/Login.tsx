import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import LoginComponent from 'components/login';
import { useLogin, useUser } from 'store/user/selectors';

type LoginError = AxiosError | Error | { message: string };

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const login = useLogin();
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError('Username and password cannot be empty.');
      return;
    }

    try {
      await login(trimmedUsername, trimmedPassword);
    } catch (err: unknown) {
      const error = err as LoginError;
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred');
      } else if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error.message === 'string') {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <LoginComponent
      handleSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      error={error}
    />
  );
}

export default Login;
