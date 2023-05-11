import ApiRequestService from '../../services/api.service';
import DetailActionTypes from '../types/detail';
import {loaderEnd, loaderStart} from './loader';

export const getPokemonSpecies = name => async dispatch => {
  try {
    await dispatch(loaderStart());
    const res = await ApiRequestService.getApi(`/pokemon-species/${name}`);
    let str = '';
    res.data.flavor_text_entries.map(flavor => {
      str = str + flavor.flavor_text;
    });
    dispatch({
      type: DetailActionTypes.GET_POKEMON_SPECIES,
      payload: str,
    });
    await dispatch(loaderEnd());
  } catch (error) {
    dispatch(loaderEnd());
  }
};

export const getPokemonEgggroup = name => async dispatch => {
  try {
    await dispatch(loaderStart());
    const res = await ApiRequestService.getApi(`/egg-group/${name}`);
    dispatch({
      type: DetailActionTypes.GET_POKEMON_EGGGROUP,
      payload: res.data.name,
    });
    await dispatch(loaderEnd());
  } catch (error) {
    dispatch(loaderEnd());
  }
};
