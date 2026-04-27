import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: FieldPath<TFormValues>;
  label: string;
};
/**
 * Renders a labeled text input bound to a react-hook-form field, displaying validation messages.
 *
 * @param form - The react-hook-form `UseFormReturn` instance that provides control and field state.
 * @param name - The field path within the form values to bind this input to.
 * @param label - The text label displayed above the input.
 * @returns The React element for a text input bound to the specified form field.
 */
export default function TextInputField<TFormValues extends FieldValues>({
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
              {...field}
              className="text-base w-full"
              type="text"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
