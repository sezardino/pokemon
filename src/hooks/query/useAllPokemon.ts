import { useQuery } from "@tanstack/react-query";
import { getAllPokemon } from "../../services/api";

const GET_ALL_POKEMON_QUERY_KEY = "get-all-pokemon";
export const getAllPokemonQueryOptions = () => ({
  queryKey: [GET_ALL_POKEMON_QUERY_KEY],
  queryFn: getAllPokemon,
  staleTime: Infinity,
});

export const useAllPokemonQuery = () =>
  useQuery({ ...getAllPokemonQueryOptions() });
