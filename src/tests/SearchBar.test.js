import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar/SearchBar';
import Provider from '../Provider';
import {
  filterByFirstLetter,
  filterByIngredient,
  filterByName,
} from '../service/MealsAPI';

jest.mock('../service/MealsAPI');
jest.mock('../service/DrinksAPI');

const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const INGREDIENT_1 = 'Ingredient 1';

describe('SearchBar component', () => {
  it('renders SearchBar correctly', () => {
    render(
      <Provider value={ { currentTitle: 'Meals' } }>
        <SearchBar />
      </Provider>,
    );

    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(INGREDIENT_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId(EXEC_SEARCH_BTN)).toBeInTheDocument();
  });

  it('handles ingredient search correctly', async () => {
    filterByIngredient.mockResolvedValueOnce([{ id: 1, name: INGREDIENT_1 }]);
    render(
      <Provider value={ { currentTitle: 'Meals' } }>
        <SearchBar />
      </Provider>,
    );

    fireEvent.change(screen.getByTestId(SEARCH_INPUT), {
      target: { value: INGREDIENT_1 },
    });
    fireEvent.click(screen.getByTestId(INGREDIENT_SEARCH_RADIO));
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    await waitFor(() => {
      expect(filterByIngredient).toHaveBeenCalledWith(INGREDIENT_1);
    });
  });

  it('handles name search correctly', async () => {
    filterByName.mockResolvedValueOnce([{ id: 1, name: 'Meal 1' }]);
    render(
      <Provider value={ { currentTitle: 'Meals' } }>
        <SearchBar />
      </Provider>,
    );

    fireEvent.change(screen.getByTestId(SEARCH_INPUT), {
      target: { value: 'Meal 1' },
    });
    fireEvent.click(screen.getByTestId('name-search-radio'));
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    await waitFor(() => {
      expect(filterByName).toHaveBeenCalledWith('Meal 1');
    });
  });

  it('handles first letter search correctly', async () => {
    filterByFirstLetter.mockResolvedValueOnce([{ id: 1, name: 'Meal 1' }]);
    render(
      <Provider value={ { currentTitle: 'Meals' } }>
        <SearchBar />
      </Provider>,
    );

    fireEvent.change(screen.getByTestId(SEARCH_INPUT), {
      target: { value: 'M' },
    });
    fireEvent.click(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO));
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    await waitFor(() => {
      expect(filterByFirstLetter).toHaveBeenCalledWith('M');
    });
  });

  it('shows alert for invalid input length during first letter search', async () => {
    global.alert = jest.fn();

    render(
      <Provider value={ { currentTitle: 'Meals' } }>
        <SearchBar />
      </Provider>,
    );

    fireEvent.change(screen.getByTestId(SEARCH_INPUT), {
      target: { value: 'Meal' },
    });
    fireEvent.click(screen.getByTestId(FIRST_LETTER_SEARCH_RADIO));
    fireEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        'Your search must have only 1 (one) character',
      );
    });
  });
});
