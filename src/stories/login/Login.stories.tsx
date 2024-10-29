import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import LoginComponent from 'components/login';

const meta: Meta<typeof LoginComponent> = {
  title: 'Components/LoginComponent',
  component: LoginComponent,
  args: {
    username: '',
    password: '',
    error: null,
    setUsername: (value: string) => console.log(`Username set to: ${value}`),
    setPassword: (value: string) => console.log(`Password set to: ${value}`),
    handleSubmit: (e) => {
      e.preventDefault();
      console.log('Login submitted');
    },
  },
  argTypes: {
    username: { control: 'text', description: 'Username input' },
    password: { control: 'text', description: 'Password input' },
    error: { control: 'text', description: 'Error message for login' },
    setUsername: { action: 'setUsername', table: { disable: true } },
    setPassword: { action: 'setPassword', table: { disable: true } },
    handleSubmit: { action: 'form submitted', table: { disable: true } },
  },
};

export default meta;

const Template: StoryFn<{
  username: string;
  password: string;
  error: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}> = (args) => <LoginComponent {...args} />;

export const Default = Template.bind({});

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: 'Invalid username or password',
};

export const WithPreFilledValues = Template.bind({});
WithPreFilledValues.args = {
  ...Default.args,
  username: 'testuser',
  password: 'password123',
};

export const LoginSuccessfully = Template.bind({});
LoginSuccessfully.args = {
  ...Default.args,
  username: 'emilys',
  password: 'emilyspass',
  handleSubmit: (e) => {
    e.preventDefault();
    console.log('Login successfully submitted with:', {
      username: 'emilys',
      password: 'emilyspass',
    });
  },
};

export const LoginFailed = Template.bind({});
LoginFailed.args = {
  username: 'incorrect-user',
  password: 'incorrect-password',
  error: 'Invalid credentials',
  handleSubmit: (e) => {
    e.preventDefault();
    console.log('Failed login attempt with:', {
      username: 'incorrect-user',
      password: 'incorrect-password',
    });
  },
};
