import z from 'zod';
import { addPartSchema } from '@/modules/parts-inventory/schemas';
import { UseFormReturn } from 'react-hook-form';

import NumberInputField from '@/components/forms/fields/NumberInputField';
import UnitSelectField from '@/components/forms/fields/UnitSelectField';
import NumberSelectField from '@/components/forms/fields/NumberSelectField';
import {
  mlccLeadSpacing,
  mlccVoltage
} from '@/modules/parts-inventory/options';

type Props = {
  form: UseFormReturn<z.infer<typeof addPartSchema>>;
};
export default function MlccFields({ form }: Props) {
  return (
    <div className="space-y-6">
      {/* Capacitance + Unit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        {/* Capacitance */}
        <div className="sm:col-span-2">
          <NumberInputField
            form={form}
            name="capacitance"
            label="Capacitance"
          />
        </div>

        {/* Unit */}
        <div>
          <UnitSelectField form={form} name="unit" label="Unit" />
        </div>
      </div>

      {/* Physical Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NumberSelectField
          form={form}
          name="voltageDc"
          label="Voltage (DC)"
          options={mlccVoltage}
        />

        <NumberSelectField
          form={form}
          name="leadSpacingMm"
          label="Spacing (mm)"
          options={mlccLeadSpacing}
        />
      </div>
    </div>
  );
}
