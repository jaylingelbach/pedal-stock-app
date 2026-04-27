import { type FormValues } from '@/app/parts-inventory/form-schema';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import ElectrolyticFields from '@/app/parts-inventory/fields/ElectrolyticFields';
import FilmBoxFields from '@/app/parts-inventory/fields/FilmBoxFields';
import MlccFields from '@/app/parts-inventory/fields/MlccFields';
import CeramicFields from '@/app/parts-inventory/fields/CeramicFields';

type Props = {
  form: UseFormReturn<FormValues>;
};

/**
 * Renders the capacitor-type selector and the corresponding type-specific form fields.
 *
 * Uses the provided `form` to watch the current `capacitorType` and to update/reset capacitor-related defaults when the user selects a different type.
 *
 * @param form - The `react-hook-form` form object used to read `capacitorType`, update its value, and reset capacitor-specific defaults when the selection changes.
 * @returns The JSX layout containing the capacitor type select control and the dynamically rendered fields for the selected capacitor type.
 */
export default function CapacitorFields({ form }: Props) {
  const capacitorType = form.watch('capacitorType');

  return (
    <div className="space-y-6">
      {/* Top Section: Capacitor Type */}
      <div className="max-w-sm">
        <FormField
          control={form.control}
          name="capacitorType"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-base text-muted-foreground">
                Capacitor Type
              </FormLabel>
              <Select
                value={field.value ?? ''}
                onValueChange={(value) => {
                  field.onChange(value);

                  if (value === 'electrolytic') {
                    form.reset({
                      type: 'capacitor',
                      capacitorType: 'electrolytic',
                      capacitance: undefined,
                      voltageDc: 5.5,
                      diameterMm: 5,
                      leadSpacingMm: 5,
                      capUnit: 'uF',
                      qtyToAdjust: form.getValues('qtyToAdjust')
                    });
                  }

                  if (value === 'film') {
                    form.reset({
                      type: 'capacitor',
                      capacitorType: 'film',
                      capacitance: undefined,
                      voltageDc: 63,
                      thicknessMm: 4.5,
                      leadSpacingMm: 5,
                      capUnit: 'nF',
                      qtyToAdjust: form.getValues('qtyToAdjust')
                    });
                  }

                  if (value === 'mlcc') {
                    form.reset({
                      type: 'capacitor',
                      capacitorType: 'mlcc',
                      capacitance: undefined,
                      voltageDc: 0,
                      leadSpacingMm: 2.5,
                      capUnit: 'pF',
                      qtyToAdjust: form.getValues('qtyToAdjust')
                    });
                  }

                  if (value === 'ceramic') {
                    form.reset({
                      type: 'capacitor',
                      capacitorType: 'ceramic',
                      capacitance: undefined,
                      leadSpacingMm: 2.5,
                      capUnit: 'pF',
                      qtyToAdjust: form.getValues('qtyToAdjust')
                    });
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="film">Film box</SelectItem>
                  <SelectItem value="electrolytic">Electrolytic</SelectItem>
                  <SelectItem value="mlcc">MLCC</SelectItem>
                  <SelectItem value="ceramic">Ceramic</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Dynamic Fields Section */}
      <div>
        {capacitorType === 'electrolytic' && <ElectrolyticFields form={form} />}
        {capacitorType === 'film' && <FilmBoxFields form={form} />}
        {capacitorType === 'mlcc' && <MlccFields form={form} />}
        {capacitorType === 'ceramic' && <CeramicFields form={form} />}
      </div>
    </div>
  );
}
