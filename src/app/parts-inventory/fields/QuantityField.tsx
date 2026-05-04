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
  label?: string;
};
/**
 * Render a controlled numeric form field bound to the provided react-hook-form control.
 *
 * Renders a labeled number input that accepts integer values with a minimum of 1 and binds its value to the specified form field; empty input maps to `undefined`.
 *
 * @param form - The `UseFormReturn<TFormValues>` form instance managing field state
 * @param name - The `FieldPath<TFormValues>` identifying the bound form field
 * @param label - Optional label text displayed above the input
 * @returns The rendered quantity input form field element
 */
export default function QuantityField<TFormValues extends FieldValues>({
  form,
  name,
  label
}: Props<TFormValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2 flex flex-col">
          <FormLabel className="text-base text-muted-foreground">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              className="w-full"
              type="number"
              step={1}
              value={field.value ?? ''}
              onBlur={field.onBlur}
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
