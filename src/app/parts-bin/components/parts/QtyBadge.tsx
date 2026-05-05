import { Badge } from '@/components/ui/badge';

/**
 * Render a quantity badge styled according to the numeric `qty`.
 *
 * The badge displays the numeric `qty` and changes variant and color:
 * - `qty > 5`: `secondary` variant with green styling
 * - `qty > 1`: `outline` variant with yellow styling
 * - otherwise: `destructive` variant
 *
 * @param qty - The numeric quantity to display; determines the badge variant and styling
 * @returns A `Badge` element containing `qty` as its content
 */
export function QtyBadge({ qty }: { qty: number }) {
  if (qty > 5)
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        {qty}
      </Badge>
    );
  if (qty > 1)
    return (
      <Badge variant="outline" className="border-yellow-400 text-yellow-700">
        {qty}
      </Badge>
    );
  return <Badge variant="destructive">{qty}</Badge>;
}
