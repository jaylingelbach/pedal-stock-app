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
 * Render a table of potentiometer parts.
 *
 * Renders a table with columns for Category, Resistance, Taper, Shaft, Terminal, and Qty.
 * If `rows` is empty, a single empty row spanning all columns is rendered. Otherwise each
 * `PartRow` is rendered as a table row with formatted resistance (`{value}kΩ`) and shaft
 * diameter (`{value}mm`) when present and capitalized category/taper/terminal cells.
 *
 * @param rows - The array of potentiometer `PartRow` objects to display in the table
 * @returns A table element representing the provided potentiometer rows
 */
export function PotentiometerTable({ rows }: { rows: PartRow[] }) {
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
              <TableCell>{r.resistance != null ? `${r.resistance}kΩ` : '-'}</TableCell>
              <TableCell className="capitalize">{r.taper}</TableCell>
              <TableCell className="capitalize">
                {r.shaftType} {r.shaftDiameter != null ? `${r.shaftDiameter}mm` : '-'}
              </TableCell>
              <TableCell className="capitalize">{r.terminalType}</TableCell>
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
