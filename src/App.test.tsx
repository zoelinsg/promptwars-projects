import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the main dashboard heading', () => {
    render(<App />);
    expect(screen.getByText('OmniPark')).toBeInTheDocument();
    expect(screen.getByText(/Good Afternoon/i)).toBeInTheDocument();
  });
});
