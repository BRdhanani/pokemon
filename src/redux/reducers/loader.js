import LoaderTypes from '../types/loader';

const INITIAL_STATE = {
  loading: false,
};

const loaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoaderTypes.LOADER_START:
      return {
        ...state,
        loading: true,
      };
    case LoaderTypes.LOADER_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default loaderReducer;
