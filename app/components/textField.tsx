import {
  Input,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components/TextField";
import { Label } from "react-aria-components";

export interface TextFieldProps<
  T = HTMLInputElement,
> extends AriaTextFieldProps {
  label?: string;
  error?: string;
  placeholder?: string;
  defaultValue?: string;
  inputRef?: React.Ref<T>;
  loading?: boolean;
}

export const TextField = ({
  label,
  error,
  placeholder,
  inputRef,
  loading,
  ...props
}: TextFieldProps) => {
  const errorId = `${props.name}-error`;
  const hasErrors = Boolean(error);

  return (
    <AriaTextField {...props}>
      {label && <Label>{label}</Label>}
      <Input
        ref={inputRef}
        aria-invalid={hasErrors}
        disabled={loading}
        type="text"
        className="w-80 rounded-md border border-gray-300
            px-3 py-2 text-sm
            shadow-sm
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:bg-gray-100"
        placeholder={placeholder}
        aria-describedby={error ? errorId : undefined}
      />
      {hasErrors && (
        <span id={errorId} className="text-red-800">
          {error}
        </span>
      )}
    </AriaTextField>
  );
};
