import { PokemonDetails } from "@/app/components/pokemonDetails";
import { SearchForm } from "@/app/components/searchForm";
import { fetchPokemon } from "@/app/api/pokemon";
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

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <PokemonDetails pokemon={pokemon} />
      <SearchForm />
    </div>
  );
}
