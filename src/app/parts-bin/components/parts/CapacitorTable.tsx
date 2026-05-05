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

/**
 * Renders a table of capacitor parts with columns for Type, Capacitance, Voltage, Lead Spacing, and Qty.
 *
 * @param rows - Array of capacitor part rows to display. If the array is empty, an empty row spanning all columns is rendered.
 * @returns The table element containing header and body rows for the provided capacitor parts.
 */
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
                {r.capacitance != null ? `${r.capacitance}${r.capUnit ?? ''}` : null}
              </TableCell>
              <TableCell>{r.voltageDc != null ? `${r.voltageDc}V` : null}</TableCell>
              <TableCell>{r.leadSpacingMm != null ? `${r.leadSpacingMm}mm` : null}</TableCell>
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
