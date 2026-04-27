'use client';

import z from 'zod';
import { addPartSchema } from '@/modules/parts-inventory/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import ResistorFields from '@/app/parts-inventory/fields/ResistorFields';
import CapacitorFields from '@/app/parts-inventory/fields/CapacitorFields';
import QuantityField from '@/app/parts-inventory/fields/QuantityField';
import TransistorFields from '@/app/parts-inventory/fields/TransistorFields';
import DiodeFields from '@/app/parts-inventory/fields/DiodeFields';
import IcFields from '@/app/parts-inventory/fields/IcFields';
import PotentiometerFields from '@/app/parts-inventory/fields/PotentiometerFields';

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });

/**
 * Render the "Add Part" form for the parts inventory, displaying dynamic field groups and resetting type-specific defaults when the part type changes.
 *
 * @returns A React element representing the Add Part form UI.
 */
export function PartsInventoryForm() {
  const form = useForm<z.infer<typeof addPartSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(addPartSchema),
    defaultValues: {
      type: 'resistor',
      resistance: 0,
      watts: 0.25,
      unit: 'K',
      qtyToAdjust: 1
    }
  });

  const onSubmit = (_values: z.infer<typeof addPartSchema>) => {
    console.log('submitted form');
    console.log('errors', form.formState.errors);
  };

  const type = form.watch('type');

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex justify-center">
      <div className="w-full max-w-3xl px-4 py-8 lg:py-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link href="/">
                <span
                  className={cn('text-2xl font-semibold', poppins.className)}
                >
                  Brown Bear Parts Inventory
                </span>
              </Link>
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl border p-6 space-y-6 shadow-sm">
              {/* Part Type Section */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-muted-foreground">
                        Part Type
                      </FormLabel>
                      <Select
                        value={field.value ?? ''}
                        onValueChange={(value) => {
                          field.onChange(value);

                          if (value === 'resistor') {
                            form.reset({
                              type: 'resistor',
                              resistance: undefined,
                              unit: 'K',
                              watts: 0.25
                            });
                          }

                          if (value === 'capacitor') {
                            form.reset({
                              type: 'capacitor',
                              capacitorType: 'film',
                              capacitance: undefined,
                              voltageDc: 50,
                              thicknessMm: 4.5,
                              leadSpacingMm: 5,
                              unit: 'nF'
                            });
                          }

                          if (value === 'transistor') {
                            form.reset({
                              type: 'transistor',
                              partNumber: undefined,
                              material: 'silicon',
                              package: 'to-92',
                              polarity: undefined
                            });
                          }

                          if (value === 'diode') {
                            form.reset({
                              type: 'diode',
                              partNumber: undefined,
                              diodeType: undefined,
                              material: 'silicon',
                              package: 'do-41'
                            });
                          }

                          if (value === 'ic') {
                            form.reset({
                              type: 'ic',
                              partNumber: undefined,
                              package: 'dip-8',
                              category: 'opamp'
                            });
                          }

                          if (value === 'potentiometer') {
                            form.reset({
                              type: 'potentiometer',
                              category: 'rotary',
                              resistance: undefined,
                              taper: undefined,
                              shaftType: 'round',
                              shaftDiameter: 6.35,
                              terminalType: 'solder-lugs'
                            });
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a part type" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="resistor">Resistor</SelectItem>
                          <SelectItem value="capacitor">Capacitor</SelectItem>
                          <SelectItem value="transistor">Transistor</SelectItem>
                          <SelectItem value="diode">Diode</SelectItem>
                          <SelectItem value="ic">
                            Integrated Circuits
                          </SelectItem>
                          <SelectItem value="potentiometer">
                            Potentiometer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Divider */}
              <div className="border-t" />
              {/* Dynamic Fields */}
              <div className="space-y-6">
                {type === 'resistor' && <ResistorFields form={form} />}
                {type === 'capacitor' && <CapacitorFields form={form} />}
                {type === 'transistor' && <TransistorFields form={form} />}
                {type === 'diode' && <DiodeFields form={form} />}
                {type === 'ic' && <IcFields form={form} />}
                {type === 'potentiometer' && (
                  <PotentiometerFields form={form} />
                )}
              </div>
              <div className="border-t" />
              {/* QTY */}
              <QuantityField
                form={form}
                name="qtyToAdjust"
                label="Quantity To Add"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="text-base w-full bg-black text-white hover:bg-pink-400 hover:text-primary"
            >
              Add Part
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
