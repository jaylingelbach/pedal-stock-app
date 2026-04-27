import { type FormValues } from '@/app/parts-inventory/form-schema';
import { UseFormReturn } from 'react-hook-form';

import NumberSelectField from '@/components/forms/fields/NumberSelectField';
import NumberInputField from '@/components/forms/fields/NumberInputField';

import {
  filmBoxLeadSpacing,
  filmBoxThickness,
  filmBoxVoltage
} from '@/modules/parts-inventory/options';
import UnitSelectField from '@/components/forms/fields/UnitSelectField';

type Props = {
  form: UseFormReturn<FormValues>;
};

export default function FilmBoxFields({ form }: Props) {
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
          options={filmBoxVoltage}
        />

        <NumberSelectField
          form={form}
          name="thicknessMm"
          label="Thickness (mm)"
          options={filmBoxThickness}
        />

        <NumberSelectField
          form={form}
          name="leadSpacingMm"
          label="Spacing (mm)"
          options={filmBoxLeadSpacing}
        />
      </div>
    </div>
  );
}
