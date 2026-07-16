import Image from "next/image";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

type PokemonDetailsProps = {
  pokemon: Pokemon;
};

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <section className="space-y-6 mx-auto">
      <header className="text-center">
        <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
        <p className="text-muted-foreground">#{pokemon.id}</p>
      </header>
      {pokemon.sprites.front_default && (
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          loading="eager"
          width={160}
          height={160}
        />
      )}
      <div>
        <p className="font-medium">Height</p>
        <p>{pokemon.height}</p>
      </div>

      <div>
        <p className="font-medium">Weight</p>
        <p>{pokemon.weight}</p>
      </div>

      <div>
        <p className="font-medium">Height</p>
        <p>{pokemon.height}</p>
      </div>

      <div className="col-span-2">
        <dt className="font-medium">Types</dt>
        <dd className="flex gap-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className="rounded bg-slate-200 px-2 py-1 capitalize"
            >
              {type.name}
            </span>
          ))}
        </dd>
      </div>
    </section>
  );
}
