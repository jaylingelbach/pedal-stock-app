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
