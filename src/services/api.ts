import axios from "axios";
import { BasePokemonData, PokemonDetails } from "../types/pokemon";

export const getAllPokemon = async (): Promise<BasePokemonData[]> => {
  return axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=10000")
    .then((res) => res.data.results);
};

export const getPokemonDetails = async (
  url: string
): Promise<PokemonDetails> => {
  return axios.get(url).then((res) => res.data);
};
