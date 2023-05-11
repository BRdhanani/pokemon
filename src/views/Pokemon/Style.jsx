import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontWeight: '800',
    fontSize: 30,
    color: '#2E3156',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  number: {
    fontWeight: '400',
    fontSize: 30,
    color: '#2E3156',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flexDirection: 'row',
    columnGap: 50,
    margin: 20,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2E3156',
  },
  button: {
    backgroundColor: '#2E3156',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    color: '#FFFFFF',
    margin: 10,
  },
  stat: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    columnGap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
});

export default styles;
