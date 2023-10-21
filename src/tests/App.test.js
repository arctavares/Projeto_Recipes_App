import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import MealsOrDrinks from '../pages/MealsOrDrinks';

import {
  filterByIngredient,
} from '../service/MealsAPI';

import RecipesContext from '../context';
import SearchBar from '../components/SearchBar/SearchBar';
import Provider from '../Provider';

const mockContextValue = {
  currentTitle: 'Meals',
};

const SEARCH_INPUT = 'search-input';

jest.mock('../service/MealsAPI', () => ({
  filterByFirstLetter: jest.fn(),
  filterByIngredient: jest.fn(),
  filterByName: jest.fn(),
}));

jest.mock('../service/DrinksAPI', () => ({
  filterDrinkByFirstLetter: jest.fn(),
  filterDrinkByIngredient: jest.fn(),
  filterDrinkByName: jest.fn(),
}));

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

describe('Test component header', () => {
  it('Test if all elements are rendered', () => {
    render(
      <BrowserRouter>
        <Provider value={ { currentTitle: 'Meals', setCurrentTitle: jest.fn() } }>
          <MealsOrDrinks title="Meals" />
        </Provider>
      </BrowserRouter>,
    );
    const recipesAppIcon = screen.getByAltText('Recipes App');
    expect(recipesAppIcon).toBeInTheDocument();

    const recipesAppTitle = screen.getByAltText('Recipes App Title');
    expect(recipesAppTitle).toBeInTheDocument();

    const searchIcon = screen.getByAltText('searchIcon');
    expect(searchIcon).toBeInTheDocument();

    const profileIcon = screen.getByAltText('Profile');
    expect(profileIcon).toBeInTheDocument();
  });
  it('Test if input shows on search click', () => {
    render(
      <BrowserRouter>
        <Provider value={ { currentTitle: 'Meals', setCurrentTitle: jest.fn() } }>
          <MealsOrDrinks title="Meals" />
        </Provider>
      </BrowserRouter>,
    );

    const searchIcon = screen.getByAltText('searchIcon');
    expect(searchIcon).toBeInTheDocument();

    expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();

    userEvent.click(searchIcon);

    expect(screen.queryByTestId(SEARCH_INPUT)).toBeInTheDocument();
  });
  it('Test if title is rendered as Meals', () => {
    render(
      <BrowserRouter>
        <Provider value={ { currentTitle: 'Meals', setCurrentTitle: jest.fn() } }>
          <MealsOrDrinks title="Meals" />
        </Provider>
      </BrowserRouter>,
    );

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');
  });
  it('Test if title is rendered as Drinks', () => {
    render(
      <BrowserRouter>
        <Provider value={ { currentTitle: 'Drinks', setCurrentTitle: jest.fn() } }>
          <MealsOrDrinks title="Drinks" />
        </Provider>
      </BrowserRouter>,
    );

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Drinks');
  });
});

describe('Test SearchBar component', () => {
  it('renders SearchBar component', () => {
    const { getByTestId } = render(
      <RecipesContext.Provider value={ mockContextValue }>
        <SearchBar />
      </RecipesContext.Provider>,
    );

    const searchInput = getByTestId(SEARCH_INPUT);
    const ingredientRadio = getByTestId('ingredient-search-radio');
    const nameRadio = getByTestId('name-search-radio');
    const firstLetterRadio = getByTestId('first-letter-search-radio');
    const searchButton = getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it('handles search button click with ingredient radio selected', async () => {
    const { getByTestId } = render(
      <RecipesContext.Provider value={ mockContextValue }>
        <SearchBar />
      </RecipesContext.Provider>,
    );

    const input = getByTestId(SEARCH_INPUT);
    const ingredientRadio = getByTestId('ingredient-search-radio');
    const searchButton = getByTestId('exec-search-btn');

    userEvent.type(input, 'chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(filterByIngredient).toHaveBeenCalledWith('chicken');
    });
  });
});
