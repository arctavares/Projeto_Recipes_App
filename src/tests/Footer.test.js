import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

describe('Test Footer', () => {
  const DRINK_IMAGE = 'drinks-bottom-btn';
  const MEAL_IMAGE = 'meals-bottom-btn';

  it('Test if all elements are rendered', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(screen.getByTestId(DRINK_IMAGE)).toBeInTheDocument();
    expect(screen.getByTestId(MEAL_IMAGE)).toBeInTheDocument();
  });
});
