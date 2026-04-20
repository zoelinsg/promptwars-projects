import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RideWaitTimes from './RideWaitTimes';

describe('RideWaitTimes', () => {
  it('renders ride wait times realistically', () => {
    render(<RideWaitTimes />);
    expect(screen.getByText('Quantum Coaster')).toBeInTheDocument();
    expect(screen.getByText('Nebula Splash')).toBeInTheDocument();
  });

  it('expands all rides when button is clicked', () => {
    render(<RideWaitTimes />);
    const button = screen.getByText(/View All Attractions/i);
    fireEvent.click(button);
    expect(screen.getByText(/Show Les/i)).toBeInTheDocument();
  });
});
