import { type FormValues } from '@/app/parts-inventory/form-schema';
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
  form: UseFormReturn<FormValues>;
};

/**
 * Render form fields for adding a potentiometer, wired to the provided react-hook-form instance.
 *
 * @param form - A `UseFormReturn` instance whose form values conform to `UseFormReturn<FormValues>`; each rendered field is registered under its `name` for that form.
 * @returns A JSX element containing labeled select/number-select inputs for potentiometer attributes (category, resistance, taper, shaft type, shaft diameter, and terminal type).
 */
export default function PotentiometerFields({ form }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
        <div className="sm:col-span-2">
          <TextSelectField
            form={form}
            name="potCategory"
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
