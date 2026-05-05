import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { EmptyRow } from './EmptyRow';
import { QtyBadge } from './QtyBadge';
import type { PartRow } from './types';

export function CapacitorTable({ rows }: { rows: PartRow[] }) {
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
              <TableCell>
                {r.capacitance}
                {r.capUnit}
              </TableCell>
              <TableCell>{r.voltageDc}V</TableCell>
              <TableCell>{r.leadSpacingMm}mm</TableCell>
              <TableCell>
                <QtyBadge qty={r.quantity} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
