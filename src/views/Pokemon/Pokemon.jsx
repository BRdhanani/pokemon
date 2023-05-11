import React, {useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './Style';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPokemonEgggroup,
  getPokemonSpecies,
} from '../../redux/actions/detail';
import {getPokemonColour} from '../../utils';
import ProgressBar from 'react-native-progress/Bar';
import {getPokemons} from '../../redux/actions/home';

function Pokemon({navigation}) {
  const params = navigation.state.params;
  const pokemon = params.pokemon;
  const dispatch = useDispatch();
  const pokemonDetail = useSelector(state => state.detail.pokemonDetail);
  const gender = useSelector(state => state.home.gender);
  const egg = useSelector(state => state.detail.egg);
  const pokemons = useSelector(state => state.home.pokemons);

  useEffect(() => {
    dispatch(getPokemonSpecies(pokemon.name));
    dispatch(getPokemonEgggroup(pokemon.id));
  }, []);

  useEffect(() => {
    if (pokemon.id === pokemons.length - 10) {
      dispatch(getPokemons(pokemons.length));
    }
  }, [pokemon]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.number}>
              {pokemon.id.toString().padStart(3, '0')}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../../assets/multiply.png')}
              style={{
                height: 20,
                width: 20,
                borderColor: '#2E3156',
                borderRadius: 10,
                borderWidth: 1,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#2E3156',
              borderRadius: 8,
              margin: 10,
            }}>
            <LinearGradient
              colors={
                params.gradients.length == 1
                  ? [...params.gradients, ...params.gradients]
                  : params.gradients
              }>
              <Image
                source={{
                  uri: `https://img.pokemondb.net/sprites/home/normal/1x/${pokemon.name}.png`,
                }}
                style={styles.image}
              />
            </LinearGradient>
          </View>
          <Text numberOfLines={10}>{pokemonDetail}</Text>
        </View>
        <View style={styles.line}>
          <View>
            <Text style={styles.label}>Height</Text>
            <Text>{pokemon.height}</Text>
          </View>
          <View style={{marginLeft: 'auto'}}>
            <Text style={styles.label}>Weight</Text>
            <Text>{pokemon.weight} kg</Text>
          </View>
        </View>
        <View style={styles.line}>
          <View>
            <Text style={styles.label}>Gender(s)</Text>
            <Text>
              {gender.male.includes(pokemon.name) &&
              gender.female.includes(pokemon.name)
                ? 'Male, Female'
                : gender.male.includes(pokemon.name)
                ? 'Male'
                : gender.female.includes(pokemon.name)
                ? 'Female'
                : 'Genderless'}
            </Text>
          </View>
          <View style={{marginLeft: 'auto'}}>
            <Text style={styles.label}>Egg Groups</Text>
            <Text>{egg}</Text>
          </View>
        </View>
        <View style={styles.line}>
          <View>
            <Text style={styles.label}>Abilities</Text>
            <Text>
              {pokemon.abilities
                .map(ability => ability.ability.name)
                .join(', ')}
            </Text>
          </View>
          <View style={{marginLeft: 'auto'}}>
            <Text style={styles.label}>Types</Text>
            <Text>{pokemon.weight} kg</Text>
          </View>
        </View>
        <View style={{backgroundColor: '#B0D2D2', padding: 10}}>
          <Text style={{fontWeight: '700', fontSize: 20, color: '#2E3156'}}>
            Stat
          </Text>
          {pokemon.stats.map((stat, index) => (
            <View style={styles.stat} key={index}>
              <Text>
                {stat.stat.name} {stat.base_stat}
              </Text>
              <ProgressBar
                progress={stat.base_stat / 100}
                height={10}
                style={{marginLeft: 'auto'}}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {params.pokemons[params.index - 1]?.name ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Pokemon', {
                  pokemon: params.pokemons[params.index - 1],
                  from: 'card',
                  pokemons: params.pokemons,
                  gradients: params.pokemons[params.index - 1].types.map(
                    type => getPokemonColour[type.type.name],
                  ),
                  index: params.index - 1,
                })
              }
              style={styles.button}>
              <Text style={{color: '#FFFFFF'}}>
                {params.pokemons[params.index - 1]?.name}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Pokemon', {
                pokemon: params.pokemons[params.index + 1],
                from: 'card',
                pokemons:
                  pokemons.length !== params.pokemons.length
                    ? pokemons
                    : params.pokemons,
                gradients: params.pokemons[params.index + 1].types.map(
                  type => getPokemonColour[type.type.name],
                ),
                index: params.index + 1,
              })
            }
            style={styles.button}>
            <Text style={{color: '#FFFFFF'}}>
              {params.pokemons[params.index + 1].name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Pokemon;
