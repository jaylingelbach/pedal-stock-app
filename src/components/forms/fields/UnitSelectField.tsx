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

/**
 * Render a form field wired to react-hook-form that provides a unit selector with options `nF` and `uF`.
 *
 * The component connects the select's value, change, and blur events to the provided form control and
 * displays a label and validation message for the field.
 *
 * @param form - The react-hook-form instance controlling the field
 * @param name - The field path within the form values
 * @param label - Text displayed above the select control
 * @returns The rendered form field element
 */
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
              <SelectTrigger className="w-full h-10" onBlur={field.onBlur}>
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
