import {loaderEnd, loaderStart} from './loader';

describe('loader actions', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should create LOADER_START action', () => {
    const results = loaderStart();

    expect(results).toMatchSnapshot();
  });

  it('should create loaderEnd action', () => {
    const results = loaderEnd();

    expect(results).toMatchSnapshot();
  });
});
