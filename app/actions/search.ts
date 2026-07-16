"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { fetchPokemon } from "../services/pokemon";

const schema = z.object({
  pokemonName: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
});

type State = {
  error?: string;
};

export async function search(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const pokemonName = formData.get("pokemonName")?.toString() ?? "";
  const validatedFields = schema.safeParse({
    pokemonName,
  });

  if (!validatedFields.success) {
    const validationErrors = validatedFields.error.issues
      .map((issue) => issue.message)
      .join(", ");

    return {
      error: validationErrors,
    };
  }

  const { pokemonName: sanitizedName } = validatedFields.data;
  try {
    const data = await fetchPokemon(sanitizedName);
    const status = data instanceof Response ? data.status : undefined;

    if (status === 404) {
      return {
        error: "Pokemon not found",
      };
    }
  } catch (ex) {
    console.error(ex);

    return {
      error: "Something went wrong",
    };
  }

  redirect(`/pokemon/${encodeURIComponent(sanitizedName)}`);
}
