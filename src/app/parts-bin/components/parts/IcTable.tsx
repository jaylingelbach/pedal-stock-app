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
 * Render a table of IC parts with columns Part #, Category, Package, and Qty.
 *
 * Renders a header row with the four column titles. If `rows` is empty, renders an empty placeholder row spanning the four columns; otherwise renders one table row per `PartRow`, showing part number, category, package, and a quantity badge.
 *
 * @param rows - Array of part rows to display; when empty an <EmptyRow cols={4} /> placeholder is shown
 * @returns A JSX element containing the populated table or the empty-row placeholder
 */
export function IcTable({ rows }: { rows: PartRow[] }) {
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
