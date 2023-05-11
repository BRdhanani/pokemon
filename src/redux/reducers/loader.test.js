import LoaderTypes from '../types/loader';
import loader from './loader';

jest.mock('../../services/api.service');

describe('loader reducer', () => {
  it('should handle LOADER_START', () => {
    const successAction = {
      type: LoaderTypes.LOADER_START,
    };
    expect(loader({}, successAction)).toEqual({
      loading: true,
    });
  });

  it('should handle LOADER_END', () => {
    const successAction = {
      type: LoaderTypes.LOADER_END,
    };
    expect(loader({}, successAction)).toEqual({
      loading: false,
    });
  });
});
