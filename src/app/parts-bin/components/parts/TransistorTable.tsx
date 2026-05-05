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
 * Render a table of transistor part rows with columns for part number, material, package, polarity, and quantity.
 *
 * Renders an EmptyRow spanning five columns when `rows` is empty; otherwise renders one table row per item with
 * formatted cells and a quantity badge.
 *
 * @param rows - Array of `PartRow` items to display in the table
 * @returns The rendered table element for the provided part rows
 */
export function TransistorTable({ rows }: { rows: PartRow[] }) {
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
