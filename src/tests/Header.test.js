import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Provider from '../Provider';
import MealsOrDrinks from '../pages/MealsOrDrinks';

const SEARCH_INPUT = 'search-input';

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
