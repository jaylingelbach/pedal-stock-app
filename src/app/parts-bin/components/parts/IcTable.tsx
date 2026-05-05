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
