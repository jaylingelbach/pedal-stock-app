import { type FormValues } from '@/app/parts-inventory/form-schema';
import { UseFormReturn } from 'react-hook-form';

import TextInputField from '@/components/forms/fields/TextInputField';
import TextSelectField from '@/components/forms/fields/TextSelectField';
import {
  transistorMaterial,
  transistorPackage,
  transistorPolarity
} from '@/modules/parts-inventory/options';

type Props = {
  form: UseFormReturn<FormValues>;
};

/**
 * Render form fields for entering transistor part details.
 *
 * `@param` form - The `react-hook-form` instance (bound to `FormValues`) used to register and control the rendered fields
 * @returns A JSX element containing inputs for `partNumber`, `material`, `polarity`, and `package`
 */
export default function TransistorFields({ form }: Props) {
  return (
    <div className="space-y-6">
      {/* Part number + Unit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        {/* Part Number */}
        <div className="sm:col-span-2">
          <TextInputField
            form={form}
            name="partNumber"
            label="Part Number (AC128, 2N2222, J201 etc.)"
          />
          <TextSelectField
            form={form}
            name="material"
            label="Material"
            options={transistorMaterial}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TextSelectField
          form={form}
          name="polarity"
          label="Polarity"
          options={transistorPolarity}
        />
        <TextSelectField
          form={form}
          name="package"
          label="Package"
          options={transistorPackage}
        />
      </div>
    </div>
  );
}
