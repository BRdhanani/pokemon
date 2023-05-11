import 'react-native';
import PokemonCard from './PokemonCard';
import {render} from '@testing-library/react-native';
import {pokemon, pokemons} from '../../utils/mock';

const pokemonCard = render(
  <PokemonCard pokemon={pokemon} pokemons={pokemons} />,
);

test('render PokemonCard component', () => {
  const {getByTestId} = pokemonCard;
  expect(getByTestId('name').props.children).toMatch('bulbasaur');
  expect(getByTestId('number').props.children).toMatch('001');
});
