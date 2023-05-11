import HomeActionTypes from '../types/home';

const initialState = {
  pokemons: [],
  type: [],
  gender: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HomeActionTypes.GET_POKEMONS:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
      };
    case HomeActionTypes.GET_POKEMON_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case HomeActionTypes.GET_POKEMON_GENDER:
      return {
        ...state,
        gender: action.payload,
      };
    default:
      return state;
  }
};
