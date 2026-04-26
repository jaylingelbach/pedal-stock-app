import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href={'/parts-inventory'}>Parts inventory</Link>
    </div>
  );
}
