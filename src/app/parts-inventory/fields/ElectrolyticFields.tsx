import z from 'zod';
import { addPartSchema } from '@/modules/parts-inventory/schemas';
import { UseFormReturn } from 'react-hook-form';

import NumberInputField from '@/components/forms/fields/NumberInputField';
import NumberSelectField from '@/components/forms/fields/NumberSelectField';
import {
  electrolyticDiameterOptions,
  electrolyticVoltageOptions
} from '@/modules/parts-inventory/options';
import UnitSelectField from '@/components/forms/fields/UnitSelectField';

type Props = {
  form: UseFormReturn<z.infer<typeof addPartSchema>>;
};

export default function ElectrolyticFields({ form }: Props) {
  return (
    <div className="space-y-6">
      {/* Capacitance + Unit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        <NumberInputField form={form} name="capacitance" label="Capacitance" />

        {/* Unit (nF/uF) */}
        <UnitSelectField form={form} name="unit" label="Unit" />
      </div>
      {/* Physical Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        {/* Voltage DC */}
        <NumberSelectField
          form={form}
          name="voltageDc"
          label="Voltage (DC)"
          placeholder="Select Voltage Rating"
          options={electrolyticVoltageOptions}
        />
        {/* Diameter (mm) */}
        <NumberSelectField
          form={form}
          name="diameterMm"
          label="Diameter (mm)"
          placeholder="Select Diameter"
          options={electrolyticDiameterOptions}
        />

        {/* Lead Spacing */}
        <NumberInputField
          form={form}
          name="leadSpacingMm"
          label="Lead Spacing (mm)"
        />
      </div>
    </div>
  );
}
