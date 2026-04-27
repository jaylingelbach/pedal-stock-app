import { type FormValues } from '@/app/parts-inventory/form-schema';
import { UseFormReturn } from 'react-hook-form';

import TextInputField from '@/components/forms/fields/TextInputField';
import TextSelectField from '@/components/forms/fields/TextSelectField';
import {
  diodeMaterial,
  diodePackage,
  diodeType
} from '@/modules/parts-inventory/options';

type Props = {
  form: UseFormReturn<FormValues>;
};

/**
 * Render form fields for diode part properties.
 *
 * Renders inputs/selects bound to the provided form for `partNumber`, `diodeType`, `material`, and `package`.
 *
 * @param form - The react-hook-form `UseFormReturn` instance for the `UseFormReturn<FormValues>` shape that manages field state and validation.
 * @returns A JSX element containing inputs and select controls for diode part entry.
 */
export default function DiodeFields({ form }: Props) {
  return (
    <div className="space-y-6">
      {/* Part number + Unit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        {/* Part Number */}
        <div className="sm:col-span-2">
          <TextInputField
            form={form}
            name="partNumber"
            label="Part Number (1N4001, 1N34A, BAT41 etc.)"
          />
          <TextSelectField
            form={form}
            name="diodeType"
            label="Diode Type (Zener, Schottky etc.)"
            options={diodeType}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TextSelectField
          form={form}
          name="material"
          label="Material"
          options={diodeMaterial}
        />
        <TextSelectField
          form={form}
          name="package"
          label="Package"
          options={diodePackage}
        />
      </div>
    </div>
  );
}
