import ApiRequestService from '../../services/api.service';
import {
  getPokemonDetail,
  getPokemonGender,
  getPokemonType,
  getPokemons,
} from './home';

jest.mock('../../services/api.service');

describe('home actions', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should get PokemonDetail', () => {
    const dispatcher = getPokemonDetail('bulbasaur');

    dispatcher(jest.fn());

    expect(ApiRequestService).toMatchSnapshot();
  });

  it('should get Pokemons', () => {
    const dispatcher = getPokemons();

    dispatcher(jest.fn());

    expect(ApiRequestService).toMatchSnapshot();
  });

  it('should get PokemonType', () => {
    const dispatcher = getPokemonType();

    dispatcher(jest.fn());

    expect(ApiRequestService).toMatchSnapshot();
  });

  it('should get PokemonGender', () => {
    const dispatcher = getPokemonGender();

    dispatcher(jest.fn());

    expect(ApiRequestService).toMatchSnapshot();
  });
});
