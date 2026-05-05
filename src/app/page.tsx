import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
