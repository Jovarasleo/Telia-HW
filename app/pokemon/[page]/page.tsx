import { PokemonDetails } from "@/app/components/pokemonDetails";
import { fetchPokemon } from "@/app/services/pokemon";
import { notFound } from "next/navigation";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const response = await fetchPokemon(page);

  if (!response.ok) {
    notFound();
  }

  const pokemon = await response.json();

  return <PokemonDetails pokemon={pokemon} />;
}
