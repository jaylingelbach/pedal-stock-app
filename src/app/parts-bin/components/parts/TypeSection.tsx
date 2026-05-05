import { Badge } from '@/components/ui/badge';

type Props = { title: string; count: number; children: React.ReactNode };

export function TypeSection({ title, count, children }: Props) {
  if (count === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2 px-6 py-3 border-b bg-muted/30">
        <span className="font-medium text-sm">{title}</span>
        <Badge variant="outline" className="text-xs">
          {count}
        </Badge>
      </div>
      <div className="px-2 py-1">{children}</div>
    </div>
  );
}
