import 'react-native';
import Filter from './Filter';
import {render, fireEvent, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {type} from '../../utils/mock';
import React from 'react';

const stat = [
  {key: 'hp', label: 'HP'},
  {key: 'attack', label: 'Attack'},
  {key: 'defense', label: 'Defense'},
  {key: 'special-attack', label: 'Spl. Attack'},
  {key: 'special-defense', label: 'Spl. Def.'},
  {key: 'speed', label: 'Speed'},
];

const mockStore = createStore((state = {home: {}}, action) => {
  return {home: {type}};
});

const setApply = jest.fn();
const setFilter = jest.fn();
const setGender = jest.fn();
const setLow = jest.fn();
const setHigh = jest.fn();
const setFilterArr = jest.fn();

const handleClick = jest.spyOn(React, 'useState');
handleClick.mockImplementation(apply => [apply, setFilter]);
handleClick.mockImplementation(filter => [filter, setFilter]);
handleClick.mockImplementation(gender => [gender, setGender]);
handleClick.mockImplementation(low => [low, setLow]);
handleClick.mockImplementation(high => [high, setHigh]);
handleClick.mockImplementation(filterArr => [filterArr, setFilterArr]);

const filter = (
  <Provider store={mockStore}>
    <Filter
      stat={stat}
      filterArr={['normal', 'fighting']}
      low={{}}
      high={{}}
      setApply={setApply}
      setFilter={setFilter}
      setGender={setGender}
      setLow={setLow}
      setHigh={setHigh}
      setFilterArr={setFilterArr}
    />
  </Provider>
);

test('render Filter component', () => {
  const {getByText} = render(filter);
  expect(getByText('Type')).toBeTruthy();
  expect(getByText('Gender')).toBeTruthy();
  expect(getByText('Stat')).toBeTruthy();
});

it('should apply filter on click', () => {
  render(filter);
  fireEvent.press(screen.getByTestId('apply'));
  expect(setApply).toHaveBeenCalledTimes(1);
  expect(setFilter).toHaveBeenCalledTimes(1);
});

it('should reset filter on click', () => {
  render(filter);
  fireEvent.press(screen.getByTestId('reset'));
  expect(setFilterArr).toHaveBeenCalledTimes(1);
  expect(setGender).toHaveBeenCalledTimes(1);
  expect(setLow).toHaveBeenCalledTimes(1);
  expect(setHigh).toHaveBeenCalledTimes(1);
  expect(setFilter).toHaveBeenCalledTimes(2);
});
