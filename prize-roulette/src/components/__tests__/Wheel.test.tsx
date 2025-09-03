import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Wheel } from '../Wheel';

const mockPrizes = [
  { id: 1, name: 'Prize 1', color: 'bg-red-500' },
  { id: 2, name: 'Prize 2', color: 'bg-blue-500' },
];

describe('Wheel Component', () => {
  const mockOnSpinStart = jest.fn();
  const mockOnSpinEnd = jest.fn();
  const mockSetResult = jest.fn();
  const mockSetPrizeHistory = jest.fn();
  const mockPlayWinSound = jest.fn();
  const mockTriggerConfetti = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders wheel with prizes', () => {
    render(
      <Wheel
        spinning={false}
        onSpinStart={mockOnSpinStart}
        onSpinEnd={mockOnSpinEnd}
        prizes={mockPrizes}
        setResult={mockSetResult}
        setPrizeHistory={mockSetPrizeHistory}
        playWinSound={mockPlayWinSound}
        triggerConfetti={mockTriggerConfetti}
      />
    );

    // Check if the wheel and center button are rendered
    expect(screen.getByText('GIRAR')).toBeInTheDocument();
  });

  it('calls onSpinStart when spin button is clicked', () => {
    render(
      <Wheel
        spinning={false}
        onSpinStart={mockOnSpinStart}
        onSpinEnd={mockOnSpinEnd}
        prizes={mockPrizes}
        setResult={mockSetResult}
        setPrizeHistory={mockSetPrizeHistory}
        playWinSound={mockPlayWinSound}
        triggerConfetti={mockTriggerConfetti}
      />
    );

    // Click the spin button
    const spinButton = screen.getByText('GIRAR');
    fireEvent.click(spinButton);

    // Check if onSpinStart was called
    expect(mockOnSpinStart).toHaveBeenCalled();
  });

  it('does not allow spinning when already spinning', () => {
    render(
      <Wheel
        spinning={true}
        onSpinStart={mockOnSpinStart}
        onSpinEnd={mockOnSpinEnd}
        prizes={mockPrizes}
        setResult={mockSetResult}
        setPrizeHistory={mockSetPrizeHistory}
        playWinSound={mockPlayWinSound}
        triggerConfetti={mockTriggerConfetti}
      />
    );

    // Try to click the disabled spin button
    const spinButton = screen.getByRole('button', { name: /girar/i }).closest('div');
    if (spinButton) {
      fireEvent.click(spinButton);
    }

    // onSpinStart should not be called when already spinning
    expect(mockOnSpinStart).not.toHaveBeenCalled();
  });
});
