'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { TypeSection } from './parts/TypeSection';
import { ResistorTable } from './parts/ResistorTable';
import { CapacitorTable } from './parts/CapacitorTable';
import { TransistorTable } from './parts/TransistorTable';
import { DiodeTable } from './parts/DiodeTable';
import { IcTable } from './parts/IcTable';
import { PotentiometerTable } from './parts/PotentiometerTable';
import { Loader2 } from 'lucide-react';

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });

export function PartsBin() {
  const getAllPartsQuery = trpc.parts.getAllParts.useQuery();
  if (!getAllPartsQuery.data) {
    return (
      <>
        <Loader2 className="animate-spin" />
        Adding...
      </>
    );
  }

  const parts = getAllPartsQuery.data.map((item) => {
    const partField = item.parts;
    const quantity = item.inventory_items?.quantity ?? 0;
    return { ...partField, quantity };
  });

  const byType = {
    resistor: parts.filter((p) => p.type === 'resistor'),
    capacitor: parts.filter((p) => p.type === 'capacitor'),
    transistor: parts.filter((p) => p.type === 'transistor'),
    diode: parts.filter((p) => p.type === 'diode'),
    ic: parts.filter((p) => p.type === 'ic'),
    potentiometer: parts.filter((p) => p.type === 'potentiometer')
  };

  const totalQty = parts.reduce((sum, p) => sum + p.quantity, 0);

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
            className="bg-black text-white hover:bg-pink-400 hover:text-primary"
          >
            <Link href="/parts-inventory">+ Add Part</Link>
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
                  <Link href="/parts-inventory" className="underline">
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
