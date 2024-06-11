import {render, fireEvent} from '@testing-library/react';
import Select from '../component/Select';

test('renders select dropdown box with first selection', () => {
  const optionData = {data: [{id: "1", name: "option 1"},{id: "2", name: "option 2"}]};
  const onSelect = jest.fn();
  const {getByTestId} = render(<Select list={optionData} onChangeHandler={onSelect}/>);
  const input = getByTestId('select-input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue(optionData.data[0].id);
});

test('renders select dropdown box with selected option', () => {
  const optionData = {data: [{id: "1", name: "option 1"},{id: "2", name: "option 2"}]};
  const selectedId = optionData.data[1].id;
  const onSelect = jest.fn();
  const {getByTestId} = render(<Select list={optionData} onChangeHandler={onSelect} selectedId={selectedId}/>);
  const input = getByTestId('select-input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue(selectedId);
});

test('renders select dropdown box when an option is selected', () => {
  const optionData = {data: [{id: "1", name: "option 1"},{id: "2", name: "option 2"},{id: "3", name: "option 3"}]};
  const selectedId = optionData.data[1].id;
  const changedId = optionData.data[2].id;
  const onSelect = jest.fn();
  const {getByTestId} = render(<Select list={optionData} onChangeHandler={onSelect} selectedId={selectedId}/>);
  const input = getByTestId('select-input');

  fireEvent.select(input, {target: { value: changedId}})
  expect(input).toHaveValue(changedId);
});
