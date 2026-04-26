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
              min={0}
              step={1}
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
