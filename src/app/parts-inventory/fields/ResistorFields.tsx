import { type FormValues } from '@/app/parts-inventory/form-schema';
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
 * Renders form inputs for resistor properties: resistance value, unit multiplier, and wattage.
 *
 * @param form - The react-hook-form controller bound to the `addPartSchema`, used to wire the resistor fields
 * @returns A JSX element containing the three form fields for resistance, unit, and watts
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
