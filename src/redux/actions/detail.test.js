import ApiRequestService from '../../services/api.service';
import {getPokemonEgggroup, getPokemonSpecies} from './detail';

jest.mock('../../services/api.service');

describe('detail actions', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should get PokemonSpecies', () => {
    const dispatcher = getPokemonSpecies('bulbasaur');

    dispatcher(jest.fn());

    expect(ApiRequestService).toMatchSnapshot();
  });

  it('should get PokemonEgggroup', () => {
    const dispatcher = getPokemonEgggroup('bulbasaur');

    dispatcher(jest.fn());

    expect(ApiRequestService).toMatchSnapshot();
  });
});
