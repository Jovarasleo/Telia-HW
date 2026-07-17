export interface Pokemon {
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

export async function fetchPokemon(name: string): Promise<Response> {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`,
    {
      cache: "no-store",
    },
  );
}
