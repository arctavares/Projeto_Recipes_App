import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
// const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const INGREDIENT_1 = 'Ingredient 1';

describe('SearchBar component', () => {
  it('renders SearchBar correctly', () => {
    render(
      <BrowserRouter>
        <Provider value={ { currentTitle: 'Meals' } }>
          <SearchBar />
        </Provider>
      </BrowserRouter>,
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
      <BrowserRouter>
        <Provider value={ { currentTitle: 'Meals' } }>
          <SearchBar />
        </Provider>
      </BrowserRouter>,
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
      <BrowserRouter>
        <Provider value={ { currentTitle: 'Meals' } }>
          <SearchBar />
        </Provider>
      </BrowserRouter>,
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
      <BrowserRouter>
        <Provider value={ { currentTitle: 'Meals' } }>
          <SearchBar />
        </Provider>
      </BrowserRouter>,
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
      <BrowserRouter>
        <Provider value={ { currentTitle: 'Meals' } }>
          <SearchBar />
        </Provider>
      </BrowserRouter>,
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

  // it.only('If found only one recipe, should redirect to recipe details', async () => {
  //   filterByIngredient.mockResolvedValueOnce([{ idMeal: 52940, name: INGREDIENT_2 }]);

  //   render(
  //     <BrowserRouter>
  //       <Provider value={{ currentTitle:'Meals' }}>
  //         <SearchBar />
  //       </Provider>
  //     </BrowserRouter>
  //   )

  //   fireEvent.change(screen.getByTestId(SEARCH_INPUT), {
  //     target: { value: INGREDIENT_2 }
  //   });
  //   fireEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
  //   fireEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

  //   await waitFor(() => {
  //     expect(window.location.pathname).toBe('/nova-rota');
  //   })

  // })
});
