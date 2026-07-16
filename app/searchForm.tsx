import { useActionState } from "react";
import { Button, Form } from "react-aria-components";
import { searchPokemon } from "./actions/search";
import { TextField } from "./components/textField";

export default function SearchForm() {
  const initialState = { error: undefined };
  const [state, formAction, pending] = useActionState(
    searchPokemon,
    initialState,
  );

  return (
    <Form action={formAction}>
      <TextField
        name="pokemonName"
        label="Enter Pokemon name:"
        className="flex-col flex"
        loading={pending}
        error={state.error}
      />
      <Button
        type="submit"
        isDisabled={pending}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2
          text-sm font-medium text-white
          transition
          hover:bg-blue-700
          active:bg-blue-800
          disabled:cursor-not-allowed
          disabled:opacity-50"
      >
        Search
      </Button>
    </Form>
  );
}
