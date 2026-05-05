'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema, type FormValues } from '@/app/add-parts/form-schema';
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

import ResistorFields from '@/app/add-parts/fields/ResistorFields';
import CapacitorFields from '@/app/add-parts/fields/CapacitorFields';
import QuantityField from '@/app/add-parts/fields/QuantityField';
import TransistorFields from '@/app/add-parts/fields/TransistorFields';
import DiodeFields from '@/app/add-parts/fields/DiodeFields';
import IcFields from '@/app/add-parts/fields/IcFields';
import PotentiometerFields from '@/app/add-parts/fields/PotentiometerFields';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });

/**
 * Renders the Parts Inventory form with fields that change based on the selected part type and handles form submission.
 *
 * The form is validated via a Zod schema, initializes defaults for each part type, and resets type-specific defaults when the part type changes. On submit it separates quantity from part data and sends both to the addPart tRPC mutation.
 *
 * @returns A React element that renders the Parts Inventory form UI.
 */
export function AddPartsForm() {
  const form = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'resistor',
      resistance: undefined,
      watts: 0.25,
      resistorUnit: 'K',
      qtyToAdjust: undefined
    }
  });

  const onSubmit = ({ qtyToAdjust, ...partValues }: FormValues) => {
    addPartMutation.mutate({
      part: partValues,
      quantity: qtyToAdjust
    });
  };

  const type = form.watch('type');

  const addPartMutation = trpc.parts.addPart.useMutation({
    onSuccess: () => {
      toast.success('Part added successfully');
    },
    onError: (err) => {
      toast.error('Could not add part. Please try again.');
      if (process.env.NODE_ENV !== 'production') {
        console.error('addPart failed:', err);
      }
    }
  });

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
                  {process.env.NEXT_PUBLIC_BUSINESS_NAME}
                </span>
              </Link>
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl border p-6 space-y-6 shadow-sm">
              {/* Part Type */}
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
                              resistorUnit: 'K',
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
                              capUnit: 'nF'
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
                              icCategory: 'opamp'
                            });
                          }

                          if (value === 'potentiometer') {
                            form.reset({
                              type: 'potentiometer',
                              potCategory: 'rotary',
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

              {/* Quantity */}
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
              className="bg-black text-white [a]:hover:bg-pink-400 [a]:hover:text-primary"
              disabled={addPartMutation.isPending}
            >
              {addPartMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Part'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
