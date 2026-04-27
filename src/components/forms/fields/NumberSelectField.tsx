import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type Option = {
  value: number;
  label: string;
};

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: FieldPath<TFormValues>;
  label: string;
  placeholder?: string;
  options: Option[];
};
/**
 * Renders a number-select field wired to a react-hook-form form instance.
 *
 * The component displays a label, a select trigger with an optional placeholder, and a list of options.
 * Selected values are converted from the select's string representation to numbers before updating the form value,
 * and blur events are forwarded to the form's onBlur handler so validation/touched state behave correctly.
 *
 * @param form - The react-hook-form form instance that controls this field.
 * @param name - The field path/name within the form state.
 * @param label - The label text displayed for the field.
 * @param placeholder - Optional placeholder text shown when no option is selected.
 * @param options - Options to render; each option has a numeric `value` and a display `label`.
 * @returns The JSX element for a numeric select field connected to the provided form.
 */
export default function NumberSelectField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options
}: Props<TFormValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base text-muted-foreground">
            {label}
          </FormLabel>
          <Select
            value={field.value?.toString() ?? ''}
            onValueChange={(value) => field.onChange(Number(value))}
          >
            <FormControl>
              <SelectTrigger className="w-full" onBlur={field.onBlur}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  className="text-base"
                  key={option.value}
                  value={option.value.toString()}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
