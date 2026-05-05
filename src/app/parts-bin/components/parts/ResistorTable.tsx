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
import { Button } from '@/components/ui/button';

/**
 * Render a table of resistor parts with columns for Value, Unit, Wattage, and Qty.
 *
 * Displays one row per `PartRow` in `rows`; when `rows` is empty, renders an `EmptyRow` spanning the four columns.
 *
 * @param rows - Array of resistor part rows to display. Each item is rendered as a table row showing `resistance`, `resistorUnit`, `watts` (formatted with `W` when present), and a `QtyBadge` for `quantity`.
 * @returns The table element containing the header and either the mapped part rows or an empty placeholder row.
 */
export function ResistorTable({ rows }: { rows: PartRow[] }) {
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
              <TableCell>{r.resistance ?? '-'}</TableCell>
              <TableCell>{r.resistorUnit ?? '-'}</TableCell>
              <TableCell>{r.watts != null ? `${r.watts}W` : '-'}</TableCell>
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
