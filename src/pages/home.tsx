import { Pagination } from "../components/base/Pagination";
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
          <li key={pokemon?.id} className="border rounded-lg p-5">
            {pokemon?.name}
            {pokemon?.sprites?.front_default && (
              <img src={pokemon?.sprites?.front_default} />
            )}
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={totalPagesCount}
      />

      {/* <ul className="flex flex-wrap gap-2 items-center mt-10">
        {new Array(totalPages).fill(true).map((_, page) => (
          <li key={page}>
            <button
              className="p-2 bg-slate-400 rounded-lg min-w-[2.5rem] min-h-[2.5rem]"
              onClick={() => setPage(page + 1)}
            >
              {page + 1}
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};
