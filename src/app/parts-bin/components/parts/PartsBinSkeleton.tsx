import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });

const TAB_LABELS = [
  'All',
  'Resistors',
  'Capacitors',
  'Transistors',
  'Diodes',
  'ICs',
  'Pots'
];

/**
 * Render a page-level skeleton UI for the inventory parts bin.
 *
 * Displays a header with the business name, three statistic placeholders, and a tabbed parts list populated with skeleton rows to indicate loading.
 *
 * @returns A JSX element that renders the parts bin loading skeleton.
 */
export function PartsBinSkeleton() {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Parts';
  return (
    <div className="min-h-screen bg-[#F4F4F0] flex justify-center">
      <div className="w-full max-w-4xl px-4 py-8 lg:py-12 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className={cn('text-2xl font-semibold', poppins.className)}>
              {businessName} Inventory
            </span>
          </Link>
          <Button
            asChild
            className="bg-black text-white [a]:hover:bg-pink-400 [a]:hover:text-primary"
          >
            <Link href="/add-parts">+ Add Part</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {['Unique Parts', 'Part Types', 'Units in Stock'].map((label) => (
            <div
              key={label}
              className="bg-white rounded-xl border shadow-sm p-4 text-center"
            >
              <Skeleton className="h-8 w-12 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Parts bin */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <Tabs defaultValue="all">
            <div className="border-b overflow-x-auto">
              <TabsList
                variant="line"
                className="w-full rounded-none p-0 h-auto gap-0"
              >
                {TAB_LABELS.map((label) => (
                  <TabsTrigger key={label} value={label.toLowerCase()} disabled>
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="p-4 space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
