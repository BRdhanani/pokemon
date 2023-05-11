import React, {useState, useEffect, useMemo} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import styles from './Style';
import {
  getPokemonGender,
  getPokemonType,
  getPokemons,
} from '../../redux/actions/home';
import {useDispatch, useSelector} from 'react-redux';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Filter from '../../components/Filter/Filter';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import {loaderEnd, loaderStart} from '../../redux/actions/loader';

function Home({navigation}) {
  const [searchfield, setSearchfield] = useState('');
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.home.pokemons);
  const loader = useSelector(state => state.loader.loading);
  const stat = [
    {key: 'hp', label: 'HP'},
    {key: 'attack', label: 'Attack'},
    {key: 'defense', label: 'Defense'},
    {key: 'special-attack', label: 'Spl. Attack'},
    {key: 'special-defense', label: 'Spl. Def.'},
    {key: 'speed', label: 'Speed'},
  ];
  const genders = useSelector(state => state.home.gender);
  const [filter, setFilter] = useState(false);
  const [filterArr, setFilterArr] = useState([]);
  const [apply, setApply] = useState(false);
  const [low, setLow] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    'special-attack': 0,
    'special-defense': 0,
    speed: 0,
  });
  const [high, setHigh] = useState({
    hp: 100,
    attack: 100,
    defense: 100,
    'special-attack': 100,
    'special-defense': 100,
    speed: 100,
  });
  const [gender, setGender] = useState();

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    await dispatch(loaderStart());
    await dispatch(getPokemons());
    await dispatch(getPokemonType());
    await dispatch(getPokemonGender());
    await dispatch(loaderEnd());
  };

  const fetchPokemons = limit => {
    dispatch(getPokemons(limit));
    setOffset(limit);
  };

  const uniquePokemon = useMemo(() => {
    let filterPokemons =
      searchfield.length > 0
        ? pokemons.filter(
            pokemon =>
              pokemon.name.includes(searchfield.toLowerCase()) ||
              pokemon.id.toString().padStart(3, '0') === searchfield,
          )
        : pokemons;
    if (apply) {
      if (filterArr.length > 0) {
        filterPokemons = filterPokemons
          .map(pokemon =>
            filterArr
              .map(filter =>
                pokemon.types.map(type => type.type.name).includes(filter),
              )
              .includes(false)
              ? {}
              : pokemon,
          )
          .filter(filter => filter?.id > 0);
      }

      filterPokemons = filterPokemons
        .map(pokemon =>
          pokemon.stats
            .map(
              stat =>
                Object.keys(low).includes(stat.stat.name) &&
                stat.base_stat > low[stat.stat.name] &&
                stat.base_stat < high[stat.stat.name],
            )
            .includes(false)
            ? {}
            : pokemon,
        )
        .filter(filter => filter?.id > 0);

      return gender?.length > 0
        ? filterPokemons.filter(pokemon =>
            genders[gender].includes(pokemon.name),
          )
        : filterPokemons;
    }
    return filterPokemons;
  }, [pokemons, searchfield, filterArr, apply, low, gender]);

  if (loader && offset == 0) {
    return (
      <View style={styles.container}>
        <Header />
        <Search
          searchfield={searchfield}
          setSearchfield={val => setSearchfield(val)}
          setFilter={val => setFilter(val)}
        />
        <ActivityIndicator />
      </View>
    );
  }
  return filter ? (
    <Filter
      setFilter={val => setFilter(val)}
      setFilterArr={val => setFilterArr(val)}
      filterArr={filterArr}
      setGender={val => setGender(val)}
      gender={gender}
      stat={stat}
      setLow={val => setLow(val)}
      setHigh={val => setHigh(val)}
      setApply={val => setApply(val)}
      low={low}
      high={high}
    />
  ) : (
    <View style={styles.container}>
      <Header />
      <Search
        searchfield={searchfield}
        setSearchfield={val => setSearchfield(val)}
        setFilter={val => setFilter(val)}
      />
      {uniquePokemon.length > 0 ? (
        <FlatList
          data={uniquePokemon}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 24, paddingHorizontal: 24}}
          onEndReached={() => {
            !apply &&
              searchfield.length == 0 &&
              uniquePokemon.length > 0 &&
              fetchPokemons(offset + 20);
          }}
          onEndReachedThreshold={0.1}
          onRefresh={() => fetchPokemons(offset * 2)}
          refreshing={loader}
          keyExtractor={pokemon => String(pokemon.id)}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <PokemonCard
                pokemon={item}
                number={index}
                navigation={navigation}
                pokemons={uniquePokemon}
              />
            );
          }}
          style={styles.list}
          ListFooterComponent={loader ? <ActivityIndicator /> : <View></View>}
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            verticalAlign: 'middle',
            lineHeight: 90,
          }}>
          Pokemon not found
        </Text>
      )}
    </View>
  );
}

export default Home;
