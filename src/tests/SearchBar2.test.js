import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import RecipesContext from '../context';
import SearchBar from '../components/SearchBar/SearchBar';
import {
  filterByFirstLetter,
  filterByIngredient,
  filterByName,
} from '../service/MealsAPI';

const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

jest.mock('../service/MealsAPI', () => ({
  filterByFirstLetter: jest.fn(),
  filterByIngredient: jest.fn(),
  filterByName: jest.fn(),
}));

const data = [{ idMeal: 1, name: 'Recipe 1' }];
const setData = jest.fn();

const renderComponent = () => render(
  <BrowserRouter>
    <RecipesContext.Provider value={ { currentTitle: 'Meals', setData } }>
      <SearchBar />
    </RecipesContext.Provider>
  </BrowserRouter>,
);

describe('Rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders search input and buttons correctly', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId(SEARCH_INPUT)).toBeInTheDocument();
    expect(getByTestId(INGREDIENT_SEARCH_RADIO)).toBeInTheDocument();
    expect(getByTestId(NAME_SEARCH_RADIO)).toBeInTheDocument();
    expect(getByTestId(FIRST_LETTER_SEARCH_RADIO)).toBeInTheDocument();
    expect(getByTestId(EXEC_SEARCH_BTN)).toBeInTheDocument();
  });
});

describe('Search functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('performs ingredient search correctly', async () => {
    filterByIngredient.mockResolvedValueOnce(data);

    const { getByTestId } = renderComponent();
    userEvent.type(getByTestId(SEARCH_INPUT), 'Chicken');
    fireEvent.click(getByTestId(INGREDIENT_SEARCH_RADIO));
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

    await waitFor(() => {
      expect(filterByIngredient).toHaveBeenCalledWith('Chicken');
      expect(setData).toHaveBeenCalledWith(data);
    });
  });

  it('performs name search correctly', async () => {
    filterByName.mockResolvedValueOnce(data);

    const { getByTestId } = renderComponent();
    userEvent.type(getByTestId(SEARCH_INPUT), 'Recipe Name');
    fireEvent.click(getByTestId(NAME_SEARCH_RADIO));
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

    await waitFor(() => {
      expect(filterByName).toHaveBeenCalledWith('Recipe Name');
      expect(setData).toHaveBeenCalledWith(data);
    });
  });

  it('performs first letter search correctly', async () => {
    filterByFirstLetter.mockResolvedValueOnce(data);

    const { getByTestId } = renderComponent();
    userEvent.type(getByTestId(SEARCH_INPUT), 'A');
    fireEvent.click(getByTestId(FIRST_LETTER_SEARCH_RADIO));
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

    await waitFor(() => {
      expect(filterByFirstLetter).toHaveBeenCalledWith('A');
      expect(setData).toHaveBeenCalledWith(data);
    });
  });
});

describe('Error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('shows alert when search input has more than one character', async () => {
    const originalAlert = global.alert;
    global.alert = jest.fn();

    const { getByTestId } = renderComponent();
    userEvent.type(getByTestId(SEARCH_INPUT), 'Chicken');
    fireEvent.click(getByTestId(FIRST_LETTER_SEARCH_RADIO));
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });

    global.alert = originalAlert;
  });
});
