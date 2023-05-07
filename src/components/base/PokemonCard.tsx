import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { twMerge } from "tailwind-merge";
import { PokemonDetails } from "../../types/pokemon";
import { Typography } from "./Typography";

export interface PokemonCardProps extends ComponentPropsWithoutRef<"div"> {
  pokemon: PokemonDetails;
}

export const PokemonCard: FC<PokemonCardProps> = (props) => {
  const { pokemon, className, ...rest } = props;

  const gridItems = useMemo<{ label: string; value: string }[]>(
    () => [
      {
        label: "Height",
        value: pokemon.height.toString(),
      },
      {
        label: "Base Experience",
        value: pokemon.base_experience.toString(),
      },
      {
        label: "Weight",
        value: pokemon.weight.toString(),
      },
      {
        label: "Ability",
        value: pokemon.abilities[0].ability.name,
      },
    ],
    []
  );

  return (
    <article {...rest} className={twMerge(className)}>
      <div className="grid grid-cols-1 justify-items-center">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <img src={pokemon.sprites.back_default} alt={pokemon.name} />
      </div>

      <Typography
        as="h2"
        styling="h5"
        text={pokemon.name}
        className="mt-5 text-center"
      />

      <ul className="mt-5 grid grid-cols-2 gap-2">
        {gridItems.map((item) => (
          <li key={item.label} className="text-center grid grid-cols-1">
            <Typography as="h3" styling="h6" text={item.label} />
            <Typography
              as="span"
              styling="p"
              text={item.value}
              className="-order-1 opacity-40"
            />
          </li>
        ))}
      </ul>
    </article>
  );
};
