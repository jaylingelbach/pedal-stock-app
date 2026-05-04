'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// TODO: replace with trpc.parts.getParts.useQuery() when the procedure is ready
const MOCK_PARTS: PartRow[] = [];

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });

export type PartRow = {
  id: number;
  type: string;
  quantity: number;
  partNumber: string | null;
  resistance: number | null;
  resistorUnit: string | null;
  watts: number | null;
  capacitorType: string | null;
  capacitance: number | null;
  capUnit: string | null;
  voltageDc: number | null;
  diameterMm: number | null;
  leadSpacingMm: number | null;
  thicknessMm: number | null;
  material: string | null;
  package: string | null;
  polarity: string | null;
  diodeType: string | null;
  icCategory: string | null;
  potCategory: string | null;
  taper: string | null;
  shaftType: string | null;
  shaftDiameter: number | null;
  terminalType: string | null;
};

function QtyBadge({ qty }: { qty: number }) {
  if (qty > 5)
    return <Badge variant="secondary" className="bg-green-100 text-green-800">{qty}</Badge>;
  if (qty > 1)
    return <Badge variant="outline" className="border-yellow-400 text-yellow-700">{qty}</Badge>;
  return <Badge variant="destructive">{qty}</Badge>;
}

function EmptyRow({ cols }: { cols: number }) {
  return (
    <TableRow>
      <TableCell colSpan={cols} className="text-center text-muted-foreground py-8">
        No parts yet
      </TableCell>
    </TableRow>
  );
}

function ResistorTable({ rows }: { rows: PartRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Value</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Wattage</TableHead>
          <TableHead>Qty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <EmptyRow cols={4} />
        ) : (
          rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.resistance}</TableCell>
              <TableCell>{r.resistorUnit}</TableCell>
              <TableCell>{r.watts}W</TableCell>
              <TableCell><QtyBadge qty={r.quantity} /></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function CapacitorTable({ rows }: { rows: PartRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Capacitance</TableHead>
          <TableHead>Voltage</TableHead>
          <TableHead>Lead Spacing</TableHead>
          <TableHead>Qty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <EmptyRow cols={5} />
        ) : (
          rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="capitalize">{r.capacitorType}</TableCell>
              <TableCell>{r.capacitance}{r.capUnit}</TableCell>
              <TableCell>{r.voltageDc}V</TableCell>
              <TableCell>{r.leadSpacingMm}mm</TableCell>
              <TableCell><QtyBadge qty={r.quantity} /></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function TransistorTable({ rows }: { rows: PartRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part #</TableHead>
          <TableHead>Material</TableHead>
          <TableHead>Package</TableHead>
          <TableHead>Polarity</TableHead>
          <TableHead>Qty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <EmptyRow cols={5} />
        ) : (
          rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-mono">{r.partNumber}</TableCell>
              <TableCell className="capitalize">{r.material}</TableCell>
              <TableCell className="uppercase">{r.package}</TableCell>
              <TableCell className="uppercase">{r.polarity}</TableCell>
              <TableCell><QtyBadge qty={r.quantity} /></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function DiodeTable({ rows }: { rows: PartRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part #</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Material</TableHead>
          <TableHead>Package</TableHead>
          <TableHead>Qty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <EmptyRow cols={5} />
        ) : (
          rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-mono">{r.partNumber}</TableCell>
              <TableCell className="capitalize">{r.diodeType}</TableCell>
              <TableCell className="capitalize">{r.material}</TableCell>
              <TableCell className="uppercase">{r.package}</TableCell>
              <TableCell><QtyBadge qty={r.quantity} /></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function IcTable({ rows }: { rows: PartRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Part #</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Package</TableHead>
          <TableHead>Qty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <EmptyRow cols={4} />
        ) : (
          rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-mono">{r.partNumber}</TableCell>
              <TableCell className="capitalize">{r.icCategory}</TableCell>
              <TableCell className="uppercase">{r.package}</TableCell>
              <TableCell><QtyBadge qty={r.quantity} /></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function PotentiometerTable({ rows }: { rows: PartRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Resistance</TableHead>
          <TableHead>Taper</TableHead>
          <TableHead>Shaft</TableHead>
          <TableHead>Terminal</TableHead>
          <TableHead>Qty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <EmptyRow cols={6} />
        ) : (
          rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="capitalize">{r.potCategory}</TableCell>
              <TableCell>{r.resistance}kΩ</TableCell>
              <TableCell className="capitalize">{r.taper}</TableCell>
              <TableCell className="capitalize">{r.shaftType} {r.shaftDiameter}mm</TableCell>
              <TableCell className="capitalize">{r.terminalType}</TableCell>
              <TableCell><QtyBadge qty={r.quantity} /></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

type SectionProps = { title: string; count: number; children: React.ReactNode };

function TypeSection({ title, count, children }: SectionProps) {
  if (count === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2 px-6 py-3 border-b bg-muted/30">
        <span className="font-medium text-sm">{title}</span>
        <Badge variant="outline" className="text-xs">{count}</Badge>
      </div>
      <div className="px-2 py-1">{children}</div>
    </div>
  );
}

export function PartsBin() {
  const parts = MOCK_PARTS;

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
              Brown Bear Parts Inventory
            </span>
          </Link>
          <Button asChild className="bg-black text-white hover:bg-pink-400 hover:text-primary">
            <Link href="/parts-inventory">+ Add Part</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Unique Parts', value: parts.length },
            { label: 'Part Types', value: Object.values(byType).filter((g) => g.length > 0).length },
            { label: 'Units in Stock', value: totalQty }
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl border shadow-sm p-4 text-center">
              <p className="text-2xl font-semibold">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Parts bin */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <Tabs defaultValue="all">
            <div className="px-4 pt-4 border-b overflow-x-auto">
              <TabsList>
                <TabsTrigger value="all">All ({parts.length})</TabsTrigger>
                <TabsTrigger value="resistor">Resistors ({byType.resistor.length})</TabsTrigger>
                <TabsTrigger value="capacitor">Capacitors ({byType.capacitor.length})</TabsTrigger>
                <TabsTrigger value="transistor">Transistors ({byType.transistor.length})</TabsTrigger>
                <TabsTrigger value="diode">Diodes ({byType.diode.length})</TabsTrigger>
                <TabsTrigger value="ic">ICs ({byType.ic.length})</TabsTrigger>
                <TabsTrigger value="potentiometer">Pots ({byType.potentiometer.length})</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              {parts.length === 0 ? (
                <p className="text-center text-muted-foreground py-16">
                  No parts in stock yet.{' '}
                  <Link href="/parts-inventory" className="underline">Add your first part.</Link>
                </p>
              ) : (
                <div className="divide-y">
                  <TypeSection title="Resistors" count={byType.resistor.length}>
                    <ResistorTable rows={byType.resistor} />
                  </TypeSection>
                  <TypeSection title="Capacitors" count={byType.capacitor.length}>
                    <CapacitorTable rows={byType.capacitor} />
                  </TypeSection>
                  <TypeSection title="Transistors" count={byType.transistor.length}>
                    <TransistorTable rows={byType.transistor} />
                  </TypeSection>
                  <TypeSection title="Diodes" count={byType.diode.length}>
                    <DiodeTable rows={byType.diode} />
                  </TypeSection>
                  <TypeSection title="ICs" count={byType.ic.length}>
                    <IcTable rows={byType.ic} />
                  </TypeSection>
                  <TypeSection title="Potentiometers" count={byType.potentiometer.length}>
                    <PotentiometerTable rows={byType.potentiometer} />
                  </TypeSection>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resistor">
              <div className="p-2"><ResistorTable rows={byType.resistor} /></div>
            </TabsContent>
            <TabsContent value="capacitor">
              <div className="p-2"><CapacitorTable rows={byType.capacitor} /></div>
            </TabsContent>
            <TabsContent value="transistor">
              <div className="p-2"><TransistorTable rows={byType.transistor} /></div>
            </TabsContent>
            <TabsContent value="diode">
              <div className="p-2"><DiodeTable rows={byType.diode} /></div>
            </TabsContent>
            <TabsContent value="ic">
              <div className="p-2"><IcTable rows={byType.ic} /></div>
            </TabsContent>
            <TabsContent value="potentiometer">
              <div className="p-2"><PotentiometerTable rows={byType.potentiometer} /></div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
