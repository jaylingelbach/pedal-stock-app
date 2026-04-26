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
              className="w-full"
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
