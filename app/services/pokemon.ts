import "server-only";

export async function fetchPokemon(name: string) {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`,
    {
      cache: "no-store",
    },
  );
}
