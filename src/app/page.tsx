import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Renders the homepage with navigation buttons linking to Add Parts and Parts Bin.
 *
 * @returns The page's JSX element containing a nav with two link-styled buttons to `/add-parts` and `/parts-bin`.
 */
export default function Home() {
  return (
    <div>
      <nav>
        <div className="flex flex-row gap-2 pl-2">
          <Button variant="link" size="lg" asChild>
            <Link href={'/add-parts'}>Add Parts</Link>
          </Button>
          <Button variant="link" size="lg" asChild>
            <Link href={'/parts-bin'}>Parts Bin</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
