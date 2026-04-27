import { type FormValues } from '@/app/parts-inventory/form-schema';
import { UseFormReturn } from 'react-hook-form';

import TextInputField from '@/components/forms/fields/TextInputField';
import TextSelectField from '@/components/forms/fields/TextSelectField';
import { icCategory, icPackage } from '@/modules/parts-inventory/options';

type Props = {
  form: UseFormReturn<FormValues>;
};

/**
 * Render IC-specific form fields for the add-part form.
 *
 * @param form - The `react-hook-form` form instance typed to the `addPartSchema` shape; used to bind field components to `partNumber`, `package`, and `category`.
 * @returns The JSX element containing the IC-related form fields.
 */
export default function IcFields({ form }: Props) {
  return (
    <div className="space-y-6">
      {/* Part number + Unit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        {/* Part Number */}
        <div className="sm:col-span-2">
          <TextInputField
            form={form}
            name="partNumber"
            label="Part Number (TL072, LM308, PT2399 etc.)"
          />
          <TextSelectField
            form={form}
            name="package"
            label="IC Package"
            options={icPackage}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TextSelectField
          form={form}
          name="icCategory"
          label="Category"
          options={icCategory}
        />
      </div>
    </div>
  );
}
