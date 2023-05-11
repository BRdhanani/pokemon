import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2E3156',
    borderRadius: 8,
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
    color: '#2E3156',
    textAlign: 'center',
    marginTop: 10,
  },
  number: {
    fontWeight: '400',
    fontSize: 20,
    color: '#2E3156',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default styles;
