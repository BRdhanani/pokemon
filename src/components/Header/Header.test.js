import 'react-native';
import renderer from 'react-test-renderer';
import Header from './Header';

test('renders correctly', () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});
