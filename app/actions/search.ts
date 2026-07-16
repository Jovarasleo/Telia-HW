"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { fetchPokemon } from "../services/pokemon";

type State = {
  error?: string;
};

const schema = z.object({
  pokemonName: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
});

function getPokemonName(formData: FormData): string {
  return formData.get("pokemonName")?.toString() ?? "";
}

function validatePokemonName(
  pokemonName: string,
): { success: true; name: string } | { success: false; error: string } {
  const result = schema.safeParse({ pokemonName });
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  return {
    success: true,
    name: result.data.pokemonName,
  };
}

async function pokemonExists(
  pokemonName: string,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const response = await fetchPokemon(pokemonName);
    if (response instanceof Response && response.status === 404) {
      return {
        success: false,
        error: "Pokemon not found",
      };
    }

    return { success: true };
  } catch (ex) {
    console.error(ex);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function searchPokemon(
  _: State,
  formData: FormData,
): Promise<State> {
  const pokemonName = getPokemonName(formData);

  const validation = validatePokemonName(pokemonName);
  if (!validation.success) {
    return {
      error: validation.error,
    };
  }

  const lookup = await pokemonExists(validation.name);
  if (!lookup.success) {
    return {
      error: lookup.error,
    };
  }

  redirect(`/pokemon/${encodeURIComponent(validation.name)}`);
}
