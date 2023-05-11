import LoaderTypes from '../types/loader';

export const loaderStart = () => async dispatch => {
  dispatch({
    type: LoaderTypes.LOADER_START,
  });
};

export const loaderEnd = () => async dispatch => {
  dispatch({
    type: LoaderTypes.LOADER_END,
  });
};
