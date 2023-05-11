import {gender, pokemons, type} from '../../utils/mock';
import HomeActionTypes from '../types/home';
import home from './home';

jest.mock('../../services/api.service');

describe('home reducer', () => {
  it('should handle GET_POKEMONS', () => {
    const successAction = {
      type: HomeActionTypes.GET_POKEMONS,
      payload: pokemons,
    };
    expect(home({pokemons: []}, successAction)).toEqual({
      pokemons,
    });
  });

  it('should handle GET_POKEMON_TYPE', () => {
    const successAction = {
      type: HomeActionTypes.GET_POKEMON_TYPE,
      payload: type,
    };
    expect(home({}, successAction)).toEqual({
      type,
    });
  });

  it('should handle GET_POKEMON_GENDER', () => {
    const successAction = {
      type: HomeActionTypes.GET_POKEMON_GENDER,
      payload: gender,
    };
    expect(home({}, successAction)).toEqual({
      gender,
    });
  });
});
