import { useQueries } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { POKEMON_PER_PAGE } from "../const";
import { BasePokemonData } from "../types/pokemon";
import { useAllPokemonQuery } from "./query/useAllPokemon";
import { getPokemonDetailsQueryOptions } from "./query/usePokemonDetail";
import { useDebouncedState } from "./useDebauncedState";

export const useHomePage = () => {
  const [page, setPage] = useState(1);
  const [debouncedSearchString, setSearchString, searchString] =
    useDebouncedState("", 2000);

  const { data: allPokemonData, isLoading: isAllPokemonLoading } =
    useAllPokemonQuery();

  const filteredPokemon = useMemo(() => {
    return !debouncedSearchString
      ? allPokemonData
      : allPokemonData?.filter((pokemon) =>
          pokemon.name.includes(debouncedSearchString)
        );
  }, [allPokemonData, debouncedSearchString]);

  const currentPageQueries = useMemo(() => {
    const startIndex = (page - 1) * POKEMON_PER_PAGE;
    const endIndex = startIndex + POKEMON_PER_PAGE;

    const currentPagePokemonData =
      (filteredPokemon?.slice(startIndex, endIndex) as BasePokemonData[]) || [];

    return currentPagePokemonData.map((pokemon) =>
      getPokemonDetailsQueryOptions(pokemon.url)
    );
  }, [page, filteredPokemon]);

  const queries = useQueries({ queries: currentPageQueries });

  const pokemonData = queries.map((q) => q.data).filter(Boolean) || [];
  const isLoading = isAllPokemonLoading || queries.some((q) => q.isLoading);
  const totalItemsCount = filteredPokemon?.length || 0;

  return {
    // pagination
    page,
    setPage,
    totalPagesCount: Math.ceil(totalItemsCount / POKEMON_PER_PAGE),

    // search
    searchString,
    setSearchString,

    isLoading,
    pokemonData,
  };
};
