import React, {useMemo} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import styles from './Style';
import {getPokemonColour} from '../../utils';

function PokemonCard({pokemon, number, navigation, pokemons}) {
  const gradients = useMemo(
    () => pokemon.types.map(type => getPokemonColour[type.type.name]),
    [pokemon],
  );

  const handleNavigate = () => {
    navigation.navigate('Pokemon', {
      pokemon,
      from: 'card',
      gradients,
      pokemons,
      index: number,
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={{...styles.container, backgroundColor: gradients[0]}}>
        <Image
          source={{
            uri: `https://img.pokemondb.net/sprites/home/normal/1x/${pokemon.name}.png`,
          }}
          style={styles.image}
        />
        <Text style={styles.name} testID="name">
          {pokemon.name}
        </Text>
        <Text style={styles.number} testID="number">
          {pokemon.id.toString().padStart(3, '0')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default PokemonCard;
