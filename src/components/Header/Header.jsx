import React from 'react';
import styles from './Style';
import {View, Text} from 'react-native';

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Pokédex</Text>
      <View style={styles.border} />
      <Text style={styles.description}>
        Search for any Pokémon that exists on the planet
      </Text>
    </View>
  );
}

export default Header;
