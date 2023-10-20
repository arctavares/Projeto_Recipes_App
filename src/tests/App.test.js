import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Test Login Page', () => {
  it('Test if the form is render', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const loginInput = screen.getByTestId('email-input');
    expect(loginInput).toBeInTheDocument();
    const emailInput = screen.getByTestId('password-input');
    expect(emailInput).toBeInTheDocument();
    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeInTheDocument();
  });
});
