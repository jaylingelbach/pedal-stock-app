import { z } from 'zod';
import { addPartSchema } from '@/modules/parts-inventory/schemas';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type Props = {
  form: UseFormReturn<z.infer<typeof addPartSchema>>;
};

export default function ResistorFields({ form }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* RESISTANCE VALUE */}
      <FormField
        control={form.control}
        name="resistance"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Resistance</FormLabel>
            <FormControl>
              <Input
                type="number"
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === '' ? undefined : e.target.valueAsNumber
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* OHMS MULTIPLIER */}
      <FormField
        control={form.control}
        name="unit"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Unit</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                <SelectItem value="R">Ω</SelectItem>
                <SelectItem value="K">KΩ</SelectItem>
                <SelectItem value="M">MΩ</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="watts"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Watts</FormLabel>
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(Number(value))}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select wattage" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="0.125">1/8 watt</SelectItem>
                <SelectItem value="0.25">1/4 watt</SelectItem>
                <SelectItem value="0.5">1/2 watt</SelectItem>
                <SelectItem value="1">1 watt</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}
