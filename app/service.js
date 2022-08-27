// TO BE DELETED
import {pokemonApi} from './api';

const sampleApi = pokemonApi.injectEndpoints({
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: name => `pokemon/${name}`,
    }),
  }),
});

export const {useGetPokemonByNameQuery} = sampleApi;
