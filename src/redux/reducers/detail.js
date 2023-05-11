import DetailActionTypes from '../types/detail';

const initialState = {
  pokemonDetail: '',
  egg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DetailActionTypes.GET_POKEMON_SPECIES:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case DetailActionTypes.GET_POKEMON_EGGGROUP:
      return {
        ...state,
        egg: action.payload,
      };
    default:
      return state;
  }
};
