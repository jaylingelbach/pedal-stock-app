import { Badge } from '@/components/ui/badge';

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
