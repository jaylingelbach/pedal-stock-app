import { type FormValues } from '@/app/add-parts/form-schema';
import { UseFormReturn } from 'react-hook-form';

import NumberSelectField from '@/components/forms/fields/NumberSelectField';
import NumberInputField from '@/components/forms/fields/NumberInputField';
import TextSelectField from '@/components/forms/fields/TextSelectField';
import {
  resistanceOptions,
  resistorWattOptions
} from '@/modules/parts-inventory/options';

type Props = {
  form: UseFormReturn<FormValues>;
};

/**
 * Render three controlled form fields for a resistor's properties.
 *
 * @param form - The react-hook-form controller used to register and control the resistor fields
 * @returns A JSX element with controlled inputs for resistance value, ohms unit multiplier, and wattage
 */
export default function ResistorFields({ form }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* RESISTANCE VALUE */}

      <NumberInputField form={form} name="resistance" label="Resistance" />

      {/* OHMS MULTIPLIER */}

      <TextSelectField
        form={form}
        name="resistorUnit"
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
