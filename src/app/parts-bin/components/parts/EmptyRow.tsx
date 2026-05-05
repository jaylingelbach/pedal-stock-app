import { TableCell, TableRow } from '@/components/ui/table';

export function EmptyRow({ cols }: { cols: number }) {
  return (
    <TableRow>
      <TableCell colSpan={cols} className="text-center text-muted-foreground py-8">
        No parts yet
      </TableCell>
    </TableRow>
  );
}
