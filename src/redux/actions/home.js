import ApiRequestService from '../../services/api.service';
import HomeActionTypes from '../types/home';
import {loaderEnd, loaderStart} from './loader';

export const getPokemonDetail = name => async dispatch => {
  try {
    await dispatch(loaderStart());
    const res = await ApiRequestService.getApi(`/pokemon/${name}`);
    await dispatch(loaderEnd());
    return res.data.results;
  } catch (error) {
    dispatch(loaderEnd());
  }
};

export const getPokemons =
  (offset = 0) =>
  async dispatch => {
    try {
      await dispatch(loaderStart());
      const res = await ApiRequestService.getApi('/pokemon', {
        limit: 20,
        offset,
      });
      const pokemons = res.data.results.map(async pokemon => {
        const results = await ApiRequestService.getApi(
          `/pokemon/${pokemon.name}`,
        );
        return results.data;
      });
      dispatch({
        type: HomeActionTypes.GET_POKEMONS,
        payload: await Promise.all(pokemons),
      });
      await dispatch(loaderEnd());
    } catch (error) {
      dispatch(loaderEnd());
    }
  };

export const getPokemonType = () => async dispatch => {
  try {
    await dispatch(loaderStart());
    const res = await ApiRequestService.getApi(`/type`);
    dispatch({
      type: HomeActionTypes.GET_POKEMON_TYPE,
      payload: res.data.results,
    });
    await dispatch(loaderEnd());
  } catch (error) {
    console.log(error);
    dispatch(loaderEnd());
  }
};

export const getPokemonGender = () => async dispatch => {
  try {
    await dispatch(loaderStart());
    const resFemale = await ApiRequestService.getApi(`/gender/1`);
    const resMale = await ApiRequestService.getApi(`/gender/2`);
    const resGenderless = await ApiRequestService.getApi(`/gender/3`);

    const female = resFemale.data.pokemon_species_details.map(
      res => res.pokemon_species.name,
    );

    const male = resMale.data.pokemon_species_details.map(
      res => res.pokemon_species.name,
    );

    const genderless = resGenderless.data.pokemon_species_details.map(
      res => res.pokemon_species.name,
    );

    dispatch({
      type: HomeActionTypes.GET_POKEMON_GENDER,
      payload: {
        female,
        male,
        genderless,
      },
    });
    await dispatch(loaderEnd());
  } catch (error) {
    dispatch(loaderEnd());
  }
};
