import { type FormValues } from '@/app/add-parts/form-schema';
import { UseFormReturn } from 'react-hook-form';

import UnitSelectField from '@/components/forms/fields/UnitSelectField';
import NumberInputField from '@/components/forms/fields/NumberInputField';
import NumberSelectField from '@/components/forms/fields/NumberSelectField';
import { ceramicLeadSpacing } from '@/modules/parts-inventory/options';

type Props = {
  form: UseFormReturn<FormValues>;
};
/**
 * Renders ceramic part fields (capacitance, unit, and lead spacing) wired to the provided form controller.
 *
 * @param form - The react-hook-form controller used by the field components.
 * @returns The JSX element containing the arranged ceramic fields.
 */
export default function CeramicFields({ form }: Props) {
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

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        <NumberSelectField
          form={form}
          name="leadSpacingMm"
          label="Lead Spacing"
          placeholder="Select Lead Spacing"
          options={ceramicLeadSpacing}
        />
      </div>
    </div>
  );
}
