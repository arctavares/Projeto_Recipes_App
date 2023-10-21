import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (...args) => mockGetItem(...args),
    setItem: (...args) => mockSetItem(...args),
    removeItem: (...args) => mockRemoveItem(...args),
  },
});

describe('Test Login Page', () => {
  beforeEach(() => {
    mockSetItem.mockClear();
    mockSetItem.mockClear();
  });

  it('Test if the form is rendered', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeInTheDocument();
  });
  it('Test if forms is working properly', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(loginBtn).toBeDisabled();
    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);

    expect(mockSetItem).toHaveBeenCalledTimes(3);
    expect(mockSetItem).toHaveBeenNthCalledWith(1, 'user', '{"email":"email@email.com"}');
    expect(mockSetItem).toHaveBeenNthCalledWith(2, 'mealsToken', 1);
    expect(mockSetItem).toHaveBeenNthCalledWith(3, 'drinksToken', 1);
  });
});
