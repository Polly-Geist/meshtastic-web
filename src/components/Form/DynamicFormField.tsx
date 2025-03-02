import {
  type MultiSelectFieldProps,
  MultiSelectInput,
} from "./FormMultiSelect.tsx";
import {
  GenericInput,
  type InputFieldProps,
} from "@components/Form/FormInput.tsx";
import {
  PasswordGenerator,
  type PasswordGeneratorProps,
} from "@components/Form/FormPasswordGenerator.tsx";
import {
  type SelectFieldProps,
  SelectInput,
} from "@components/Form/FormSelect.tsx";
import {
  type ToggleFieldProps,
  ToggleInput,
} from "@components/Form/FormToggle.tsx";
import type { Control, FieldValues } from "react-hook-form";

export type FieldProps<T> =
  | InputFieldProps<T>
  | SelectFieldProps<T>
  | MultiSelectFieldProps<T>
  | ToggleFieldProps<T>
  | PasswordGeneratorProps<T>;

export interface DynamicFormFieldProps<T extends FieldValues> {
  field: FieldProps<T>;
  control: Control<T>;
  disabled?: boolean;
}

export function DynamicFormField<T extends FieldValues>({
  field,
  control,
  disabled,
}: DynamicFormFieldProps<T>) {
  switch (field.type) {
    case "text":
    case "password":
    case "number":
      return (
        <GenericInput field={field} control={control} disabled={disabled} />
      );

    case "toggle":
      return (
        <ToggleInput
          field={field}
          control={control}
          disabled={disabled}
        />
      );
    case "select":
      return (
        <SelectInput
          field={field}
          control={control}
          disabled={disabled}
        />
      );
    case "passwordGenerator":
      return (
        <PasswordGenerator
          field={field}
          control={control}
          disabled={disabled}
        />
      );
    case "multiSelect":
      return (
        <MultiSelectInput field={field} control={control} disabled={disabled} />
      );
  }
}
