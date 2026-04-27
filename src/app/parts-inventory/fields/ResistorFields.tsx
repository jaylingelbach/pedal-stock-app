import z from 'zod';
import { addPartSchema } from '@/modules/parts-inventory/schemas';
import { UseFormReturn } from 'react-hook-form';

import NumberSelectField from '@/components/forms/fields/NumberSelectField';
import NumberInputField from '@/components/forms/fields/NumberInputField';
import TextSelectField from '@/components/forms/fields/TextSelectField';
import {
  resistanceOptions,
  resistorWattOptions
} from '@/modules/parts-inventory/options';

type Props = {
  form: UseFormReturn<z.infer<typeof addPartSchema>>;
};

export default function ResistorFields({ form }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* RESISTANCE VALUE */}

      <NumberInputField form={form} name="resistance" label="Resistance" />

      {/* OHMS MULTIPLIER */}

      <TextSelectField
        form={form}
        name="unit"
        label="Unit"
        options={resistanceOptions}
      />

      {/* Watts */}
      <NumberSelectField
        form={form}
        name="watts"
        label="Watts"
        options={resistorWattOptions}
      />
    </div>
  );
}
