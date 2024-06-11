import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';
import BackToPreviousPage from '../component/BackToPreviousPage';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('Back to previous page', () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  const { getByTestId } = render(<BackToPreviousPage />);
  const button = getByTestId('cancel-button');

  fireEvent.click(button);
  expect(button).toBeInTheDocument();
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
