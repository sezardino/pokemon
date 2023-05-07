import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../../services/api";

export const getPokemonDetailsQueryOptions = (url: string) => ({
  queryKey: [url],
  queryFn: () => getPokemonDetails(url),
});

export const usePokemonDetails = (url: string) =>
  useQuery({ ...getPokemonDetailsQueryOptions(url) });
