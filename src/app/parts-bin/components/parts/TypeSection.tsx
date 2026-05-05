import { Badge } from '@/components/ui/badge';

type Props = { title: string; count: number; children: React.ReactNode };

/**
 * Render a titled section with an outline count badge and its children; renders nothing when `count` is zero.
 *
 * @param title - The section heading text
 * @param count - The numeric value displayed in the badge; when `0` the component returns `null`
 * @param children - Content to display below the header
 * @returns The section element containing the header (title and badge) and children, or `null` if `count` is zero
 */
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
