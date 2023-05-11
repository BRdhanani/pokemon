import 'react-native';
import Search from './Search';
import {render} from '@testing-library/react-native';
import React from 'react';

const search = <Search />;

test('render Search component', () => {
  render(search);
});
