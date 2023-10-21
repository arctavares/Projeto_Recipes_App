import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  filterByIngredient,
} from '../service/MealsAPI';

import RecipesContext from '../context';
import SearchBar from '../components/SearchBar/SearchBar';

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
