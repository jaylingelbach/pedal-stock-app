'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { TypeSection } from './parts/TypeSection';
import { ResistorTable } from './parts/ResistorTable';
import { CapacitorTable } from './parts/CapacitorTable';
import { TransistorTable } from './parts/TransistorTable';
import { DiodeTable } from './parts/DiodeTable';
import { IcTable } from './parts/IcTable';
import { PotentiometerTable } from './parts/PotentiometerTable';
import { PartsBinSkeleton } from './parts/PartsBinSkeleton';

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });

/**
 * Render the parts inventory page with aggregated stats and tabbed tables by part type.
 *
 * Displays a header with branding and an "Add Part" action, a stats grid (unique parts, part types, units in stock),
 * and a tabbed container that shows all parts grouped by type or individual type tables.
 *
 * The component shows a loading skeleton while the parts query is pending and surfaces a toast error if loading fails.
 *
 * @returns A React element rendering the parts inventory UI with summary stats, tabs, and per-type tables.
 */
export function PartsBin() {
  const getAllPartsQuery = trpc.parts.getAllParts.useQuery();

  useEffect(() => {
    if (getAllPartsQuery.isError) {
      toast.error('Failed to load parts. Please try again.');
    }
  }, [getAllPartsQuery.isError]);

  if (getAllPartsQuery.isPending || getAllPartsQuery.isError) {
    return <PartsBinSkeleton />;
  }

  const parts = getAllPartsQuery.data.map((item) => {
    const partField = item.parts;
    const quantity = item.inventory_items?.quantity ?? 0;
    return { ...partField, quantity };
  });

  const byType = {
    resistor: parts.filter((part) => part.type === 'resistor'),
    capacitor: parts.filter((part) => part.type === 'capacitor'),
    transistor: parts.filter((part) => part.type === 'transistor'),
    diode: parts.filter((part) => part.type === 'diode'),
    ic: parts.filter((part) => part.type === 'ic'),
    potentiometer: parts.filter((part) => part.type === 'potentiometer')
  };

  const totalQty = parts.reduce((sum, part) => sum + part.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex justify-center">
      <div className="w-full max-w-4xl px-4 py-8 lg:py-12 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className={cn('text-2xl font-semibold', poppins.className)}>
              {process.env.NEXT_PUBLIC_BUSINESS_NAME} Inventory
            </span>
          </Link>
          <Button
            asChild
            className="bg-black text-white [a]:hover:bg-pink-500 [a]:hover:text-primary"
          >
            <Link href="/add-parts">+ Add Part</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Unique Parts', value: parts.length },
            {
              label: 'Part Types',
              value: Object.values(byType).filter((g) => g.length > 0).length
            },
            { label: 'Units in Stock', value: totalQty }
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white rounded-xl border shadow-sm p-4 text-center"
            >
              <p className="text-2xl font-semibold">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Parts bin */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <Tabs defaultValue="all">
            <div className="border-b overflow-x-auto">
              <TabsList
                variant="line"
                className="w-full rounded-none p-0 h-auto gap-0 "
              >
                <TabsTrigger className="cursor-pointer" value="all">
                  All ({parts.length})
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="resistor">
                  Resistors ({byType.resistor.length})
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="capacitor">
                  Capacitors ({byType.capacitor.length})
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="transistor">
                  Transistors ({byType.transistor.length})
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="diode">
                  Diodes ({byType.diode.length})
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="ic">
                  ICs ({byType.ic.length})
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="potentiometer">
                  Pots ({byType.potentiometer.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              {parts.length === 0 ? (
                <p className="text-center text-muted-foreground py-16">
                  No parts in stock yet.{' '}
                  <Link href="/add-parts" className="underline">
                    Add your first part.
                  </Link>
                </p>
              ) : (
                <div className="divide-y">
                  <TypeSection title="Resistors" count={byType.resistor.length}>
                    <ResistorTable rows={byType.resistor} />
                  </TypeSection>
                  <TypeSection
                    title="Capacitors"
                    count={byType.capacitor.length}
                  >
                    <CapacitorTable rows={byType.capacitor} />
                  </TypeSection>
                  <TypeSection
                    title="Transistors"
                    count={byType.transistor.length}
                  >
                    <TransistorTable rows={byType.transistor} />
                  </TypeSection>
                  <TypeSection title="Diodes" count={byType.diode.length}>
                    <DiodeTable rows={byType.diode} />
                  </TypeSection>
                  <TypeSection title="ICs" count={byType.ic.length}>
                    <IcTable rows={byType.ic} />
                  </TypeSection>
                  <TypeSection
                    title="Potentiometers"
                    count={byType.potentiometer.length}
                  >
                    <PotentiometerTable rows={byType.potentiometer} />
                  </TypeSection>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resistor">
              <div className="p-2">
                <ResistorTable rows={byType.resistor} />
              </div>
            </TabsContent>
            <TabsContent value="capacitor">
              <div className="p-2">
                <CapacitorTable rows={byType.capacitor} />
              </div>
            </TabsContent>
            <TabsContent value="transistor">
              <div className="p-2">
                <TransistorTable rows={byType.transistor} />
              </div>
            </TabsContent>
            <TabsContent value="diode">
              <div className="p-2">
                <DiodeTable rows={byType.diode} />
              </div>
            </TabsContent>
            <TabsContent value="ic">
              <div className="p-2">
                <IcTable rows={byType.ic} />
              </div>
            </TabsContent>
            <TabsContent value="potentiometer">
              <div className="p-2">
                <PotentiometerTable rows={byType.potentiometer} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
