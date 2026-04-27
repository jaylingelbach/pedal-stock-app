import { type FormValues } from '@/app/parts-inventory/form-schema';
import { UseFormReturn } from 'react-hook-form';

import NumberInputField from '@/components/forms/fields/NumberInputField';
import UnitSelectField from '@/components/forms/fields/UnitSelectField';
import NumberSelectField from '@/components/forms/fields/NumberSelectField';
import {
  mlccLeadSpacing,
  mlccVoltage
} from '@/modules/parts-inventory/options';

type Props = {
  form: UseFormReturn<FormValues>;
};
/**
 * Renders MLCC-specific form controls bound to the provided React Hook Form instance.
 *
 * Renders grouped fields for capacitance (with unit), DC voltage, and lead spacing,
 * each wired to the `form` prop so values and validation are managed by React Hook Form.
 *
 * @param form - A `UseFormReturn<FormValues>` instance used to register and control the fields
 * @returns The JSX element containing the MLCC form fields
 */
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
          <UnitSelectField form={form} name="capUnit" label="Unit" />
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
