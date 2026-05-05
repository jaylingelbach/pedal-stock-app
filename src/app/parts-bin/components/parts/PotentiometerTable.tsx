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
              <TableCell>{r.resistance}kΩ</TableCell>
              <TableCell className="capitalize">{r.taper}</TableCell>
              <TableCell className="capitalize">
                {r.shaftType} {r.shaftDiameter}mm
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
