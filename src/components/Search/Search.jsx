import React from 'react';
import styles from './Style';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';

function Search({searchfield, setSearchfield, setFilter}) {
  return (
    <View style={styles.searchCont}>
      <TextInput
        style={styles.searchfield}
        placeholder="Name or Number"
        onChangeText={value => {
          setSearchfield(value);
        }}
        value={searchfield}
      />
      <TouchableOpacity onPress={() => setFilter(true)}>
        <Image
          style={styles.image}
          source={require('../../assets/filter.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Search;
