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
        <FormItem className="text-muted-foreground">
          <FormLabel className="text-base">{label}</FormLabel>
          <Select
            value={field.value?.toString() ?? ''}
            onValueChange={(value) => field.onChange(Number(value))}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
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
