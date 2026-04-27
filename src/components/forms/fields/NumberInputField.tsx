import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: FieldPath<TFormValues>;
  label: string;
};
/**
 * Renders a labeled numeric input bound to a react-hook-form field.
 *
 * Binds to `form.control` at `name`, displays `label`, keeps the input value empty when the field is `null`/`undefined`, and converts user input to a number (or `undefined` for empty input). Validation messages are shown via `FormMessage`.
 *
 * @param form - The react-hook-form `UseFormReturn` instance that manages form state
 * @param name - The field path within the form to bind this input to
 * @param label - Text label displayed for the input
 * @returns A React element containing the controlled number input and its label/message
 */
export default function NumberInputField<TFormValues extends FieldValues>({
  form,
  name,
  label
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
          <FormControl>
            <Input
              className="text-base w-full"
              type="number"
              value={field.value ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === '' ? undefined : Number(value));
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
