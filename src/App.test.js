import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(async () => {
    await waitFor(() => render(<App />));
  });

  test('renders purchase form', () => {
    const purchaseFormElement = screen.getByTestId('purchase-form');
    expect(purchaseFormElement).toBeInTheDocument();
  });

  test('renders sell form', () => {
    const purchaseFormElement = screen.getByTestId('sell-form');
    expect(purchaseFormElement).toBeInTheDocument();
  });
});
