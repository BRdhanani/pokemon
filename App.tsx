import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/views/Home/Home';
import Pokemon from './src/views/Pokemon/Pokemon';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Pokemon: {
      screen: Pokemon,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(stackNavigator);

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
