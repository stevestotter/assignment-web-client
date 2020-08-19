import React from 'react';
import {
  render, fireEvent, screen, act, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form', () => {
  let fn;

  beforeEach(async () => {
    fn = jest.fn();
    await waitFor(() => render(<Form type="a-type" onSubmit={fn} />));
  });

  it('renders price field', async () => {
    const priceInput = screen.getByTestId('price-input');
    expect(priceInput).toHaveAttribute('type', 'text');
    expect(priceInput).toBeInTheDocument();
  });

  it('renders quantity field', () => {
    const qtyInput = screen.getByTestId('quantity-input');
    expect(qtyInput).toHaveAttribute('type', 'text');
    expect(qtyInput).toBeInTheDocument();
  });

  it('renders submit button', () => {
    const submitBtn = screen.getByText('Submit');
    expect(submitBtn).toHaveAttribute('type', 'submit');
    expect(submitBtn).toBeInTheDocument();
  });

  it('allows submission of valid data and resets form', async () => {
    const price = '0.12';
    const quantity = '0.34';
    const priceInput = screen.getByTestId('price-input');
    const quantityInput = screen.getByTestId('quantity-input');

    userEvent.type(priceInput, price);
    userEvent.type(quantityInput, quantity);

    await act(async () => {
      fireEvent.submit(screen.getByText('Submit'));
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith({ price, quantity });
    expect(screen.getByTestId('price-input').value).toBe('');
    expect(screen.getByTestId('quantity-input').value).toBe('');
  });

  it('does not allow submission of negative price', async () => {
    const price = '-0.12';
    const quantity = '0.34';
    const priceInput = screen.getByTestId('price-input');
    const quantityInput = screen.getByTestId('quantity-input');

    userEvent.type(priceInput, price);
    userEvent.type(quantityInput, quantity);

    await act(async () => {
      fireEvent.submit(screen.getByText('Submit'));
    });

    expect(fn).toHaveBeenCalledTimes(0);
    expect(screen.getByText('Submit')).toHaveAttribute('disabled');
  });

  it('does not allow submission of non-numeric price', async () => {
    const price = '0.a2';
    const quantity = '0.34';
    const priceInput = screen.getByTestId('price-input');
    const quantityInput = screen.getByTestId('quantity-input');

    userEvent.type(priceInput, price);
    userEvent.type(quantityInput, quantity);

    await act(async () => {
      fireEvent.submit(screen.getByText('Submit'));
    });

    expect(fn).toHaveBeenCalledTimes(0);
    expect(screen.getByText('Submit')).toHaveAttribute('disabled');
  });

  it('does not allow submission of negative quantity', async () => {
    const price = '0.12';
    const quantity = '-0.34';
    const priceInput = screen.getByTestId('price-input');
    const quantityInput = screen.getByTestId('quantity-input');

    userEvent.type(priceInput, price);
    userEvent.type(quantityInput, quantity);

    await act(async () => {
      fireEvent.submit(screen.getByText('Submit'));
    });

    expect(fn).toHaveBeenCalledTimes(0);
    expect(screen.getByText('Submit')).toHaveAttribute('disabled');
  });

  it('does not allow submission of non-numeric quantity', async () => {
    const price = '0.12';
    const quantity = '0.3p';
    const priceInput = screen.getByTestId('price-input');
    const quantityInput = screen.getByTestId('quantity-input');

    userEvent.type(priceInput, price);
    userEvent.type(quantityInput, quantity);

    await act(async () => {
      fireEvent.submit(screen.getByText('Submit'));
    });

    expect(fn).toHaveBeenCalledTimes(0);
    expect(screen.getByText('Submit')).toHaveAttribute('disabled');
  });
});
