import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  checkboxContainer: {
    width: '50%',
    marginBottom: 10,
    padding: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  rootLow: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#aaaaaa',
  },
  rootHigh: {
    width: 20,
    height: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
  filterContainer: {
    flex: 1,
    padding: 20,
  },
  collapse: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E3156',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
  },
  list: {
    flex: 1,
    marginTop: 8,
  },
});

export default styles;
