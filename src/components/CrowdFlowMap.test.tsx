import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CrowdFlowMap from './CrowdFlowMap';

describe('CrowdFlowMap', () => {
  it('renders active live map', () => {
    render(<CrowdFlowMap />);
    expect(screen.getByText(/Live Crowd Flow/i)).toBeInTheDocument();
  });

  it('toggles between satellite and heat map', () => {
    render(<CrowdFlowMap />);
    expect(screen.queryByText(/Satellite view active/i)).not.toBeInTheDocument();
    
    // Toggle to full map
    fireEvent.click(screen.getByText('Full Map'));
    expect(screen.getByText(/Satellite view active/i)).toBeInTheDocument();

    // Toggle back to heat map
    fireEvent.click(screen.getByText('Heat Map'));
    expect(screen.queryByText(/Satellite view active/i)).not.toBeInTheDocument();
  });
});
