import z from 'zod';
import { addPartSchema } from '@/modules/parts-inventory/schemas';
import { UseFormReturn } from 'react-hook-form';

import TextInputField from '@/components/forms/fields/TextInputField';
import TextSelectField from '@/components/forms/fields/TextSelectField';
import { icCategory, icPackage } from '@/modules/parts-inventory/options';

type Props = {
  form: UseFormReturn<z.infer<typeof addPartSchema>>;
};

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
          name="category"
          label="Category"
          options={icCategory}
        />
      </div>
    </div>
  );
}
