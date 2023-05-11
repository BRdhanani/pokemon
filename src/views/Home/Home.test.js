import 'react-native';
import Home from './Home';
import {render, fireEvent, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {pokemons} from '../../utils/mock';
import React from 'react';

const mockStore = createStore(
  (state = {pokemons: [], loading: false, gender: []}, action) => {
    return {home: {pokemons}, loader: state.loading};
  },
);

const home = (
  <Provider store={mockStore}>
    <Home />
  </Provider>
);

test('render Home component', () => {
  render(home);
});
