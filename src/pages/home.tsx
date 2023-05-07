import { Fragment } from "react";
import { Pagination } from "../components/base/Pagination";
import { PokemonCard } from "../components/base/PokemonCard";
import { useHomePage } from "../hooks/useHomePageData";

export const HomePage = () => {
  const {
    isLoading,
    page,
    pokemonData,
    searchString,
    setPage,
    setSearchString,
    totalPagesCount,
  } = useHomePage();

  return (
    <div className="container mx-auto py-10 text-white grid grid-cols-1 gap-5">
      <input
        type="search"
        className="justify-self-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="search"
        value={searchString}
        onChange={(evt) => setSearchString(evt.currentTarget.value)}
      />

      <ul className="grid grid-cols-3 gap-5">
        {pokemonData.map((pokemon) => (
          <Fragment key={pokemon?.id}>
            {pokemon && (
              <li className="border rounded-lg p-5">
                <PokemonCard pokemon={pokemon} />
              </li>
            )}
          </Fragment>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={totalPagesCount}
      />
    </div>
  );
};
