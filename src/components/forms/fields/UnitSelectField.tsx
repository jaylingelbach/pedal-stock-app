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
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: FieldPath<TFormValues>;
  label: string;
};

export default function UnitSelectField<TFormValues extends FieldValues>({
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
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectItem value="nF">nF</SelectItem>
              <SelectItem value="uF">uF</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
