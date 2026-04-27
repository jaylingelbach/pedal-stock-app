import z from 'zod';

import { addPartSchema } from '@/modules/parts-inventory/schemas';
import { UseFormReturn } from 'react-hook-form';
import TextSelectField from '@/components/forms/fields/TextSelectField';
import {
  potCategory,
  potentiometerResistance,
  potShaftDiameter,
  potShaftType,
  potTaper,
  terminalType
} from '@/modules/parts-inventory/options';
import NumberSelectField from '@/components/forms/fields/NumberSelectField';

type Props = {
  form: UseFormReturn<z.infer<typeof addPartSchema>>;
};

export default function PotentiometerFields({ form }: Props) {
  return (
    <div className="space-y-6">
      {/* Part number */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        {/* Part Number */}
        <div className="sm:col-span-2">
          <TextSelectField
            form={form}
            name="category"
            label="Category"
            options={potCategory}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Resistance */}
        <NumberSelectField
          form={form}
          name="resistance"
          label="Resistance"
          options={potentiometerResistance}
        />
        {/* Taper */}
        <TextSelectField
          form={form}
          name="taper"
          label="Taper"
          options={potTaper}
        />
      </div>
      {/* Shaft Type */}
      <TextSelectField
        form={form}
        name="shaftType"
        label="Shaft Type"
        options={potShaftType}
      />
      {/* Shaft Diameter */}
      <NumberSelectField
        form={form}
        name="shaftDiameter"
        label="Shaft Diameter"
        options={potShaftDiameter}
      />
      {/* Terminal Type */}
      <TextSelectField
        form={form}
        name="terminalType"
        label="Terminal Type"
        options={terminalType}
      />
    </div>
  );
}
