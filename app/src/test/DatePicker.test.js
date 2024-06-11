import {render, fireEvent} from '@testing-library/react';
import DatePicker from '../component/DatePicker';

test('renders datepicker without default date', () => {
  const {getByTestId} = render(<DatePicker id="dob" onChangedHandler={""}/>);
  const input = getByTestId('date-input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('');
});

test('renders datepicker with default date', () => {
  const {getByTestId} = render(<DatePicker id="dob" onChangedHandler={""} defaultDate={'2024-06-11'}/>);
  const input = getByTestId('date-input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('2024-06-11');
});

test('renders datepicker selecting a date', () => {
  const onDateChange = jest.fn();
  const {getByTestId} = render(<DatePicker id="dob" onChangedHandler={onDateChange} defaultDate={'2024-06-11'}/>);
  const input = getByTestId('date-input');
  const newDate = '2024-06-12';
  fireEvent.change(input, { target: { value: newDate } });
  expect(input).toHaveValue(newDate);
});
