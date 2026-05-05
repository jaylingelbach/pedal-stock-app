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
 * Render a table displaying diode parts from an array of PartRow.
 *
 * @param rows - Array of diode part rows to display; each item is rendered as a table row
 * @returns The table element containing header columns (Part #, Type, Material, Package, Qty) and either an EmptyRow when `rows` is empty or one row per `PartRow`.
 */
export function DiodeTable({ rows }: { rows: PartRow[] }) {
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
