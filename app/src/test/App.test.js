import { render, screen } from '@testing-library/react';
import App from './style/App.css';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Clinical Trial Patient Recruitment System/i);
  expect(linkElement).toBeInTheDocument();
});
