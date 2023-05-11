import 'react-native';
import Pokemon from './Pokemon';
import {render, fireEvent, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {pokemon, pokemons, gender} from '../../utils/mock';
import React from 'react';
import thunk from 'redux-thunk';

const mockStore = createStore((state = {}, action) => {
  return {
    home: {
      pokemons,
      gender,
    },
    detail: {
      pokemonDetail: 'A strange seed was planted on its back at birth',
      egg: 'monster',
    },
  };
}, applyMiddleware(thunk));

const pokemonCard = (
  <Provider store={mockStore}>
    <Pokemon
      navigation={{
        state: {params: {pokemon, gradients: ['#DDCBD0'], index: 1, pokemons}},
      }}
    />
  </Provider>
);

test('render Pokemon component', () => {
  render(pokemonCard);
});
