import { FieldPathByValue, FieldValues, UseFormReturn } from 'react-hook-form';
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
  value: string;
  label: string;
};

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: FieldPathByValue<TFormValues, string | undefined | null>;
  label: string;
  placeholder?: string;
  options: Option[];
};
/**
 * Render a controlled select field wired to a react-hook-form form instance.
 *
 * @param form - The `UseFormReturn` instance managing the form state.
 * @param name - Form field path for a value that may be `string`, `undefined`, or `null`.
 * @param label - Visible label text for the field.
 * @param placeholder - Optional placeholder text shown when no value is selected.
 * @param options - Array of selection options; each option has `{ value: string; label: string }`.
 * @returns The JSX element for a form-bound select control with validation messaging.
 */
export default function TextSelectField<TFormValues extends FieldValues>({
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
          <Select value={field.value ?? ''} onValueChange={field.onChange}>
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
                  value={option.value}
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
