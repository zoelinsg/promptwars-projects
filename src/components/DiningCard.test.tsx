import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DiningCard from './DiningCard';

describe('DiningCard', () => {
  it('shows dining hubs and load queues', () => {
    render(<DiningCard />);
    expect(screen.getByText('Cosmic Burger Hub')).toBeInTheDocument();
  });

  it('triggers mobile order pickup interaction', () => {
    render(<DiningCard />);
    const button = screen.getByText('Order Mobile Pickup');
    fireEvent.click(button);
    expect(screen.getByText(/Order Placed/i)).toBeInTheDocument();
  });
});
