import DetailActionTypes from '../types/detail';
import detail from './detail';

jest.mock('../../services/api.service');

describe('detail reducer', () => {
  it('should handle GET_POKEMON_SPECIES', () => {
    const successAction = {
      type: DetailActionTypes.GET_POKEMON_SPECIES,
      payload: 'A strange seed was planted on its back at birth',
    };
    expect(detail({}, successAction)).toEqual({
      pokemonDetail: 'A strange seed was planted on its back at birth',
    });
  });

  it('should handle GET_POKEMON_EGGGROUP', () => {
    const successAction = {
      type: DetailActionTypes.GET_POKEMON_EGGGROUP,
      payload: 'monster',
    };
    expect(detail({}, successAction)).toEqual({
      egg: 'monster',
    });
  });
});
