import { TableCell, TableRow } from '@/components/ui/table';

/**
 * Render a table row that displays a centered, muted "No parts yet" message spanning the specified number of columns.
 *
 * @param cols - Number of table columns the message cell should span
 * @returns A JSX table row containing a single centered, muted table cell with the text "No parts yet"
 */
export function EmptyRow({ cols }: { cols: number }) {
  return (
    <TableRow>
      <TableCell colSpan={cols} className="text-center text-muted-foreground py-8">
        No parts yet
      </TableCell>
    </TableRow>
  );
}
