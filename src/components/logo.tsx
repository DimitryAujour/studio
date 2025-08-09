import { BookHeart } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <BookHeart className="h-6 w-6 text-primary" />
      <span className="text-lg font-bold font-headline text-primary">
        Hidayah Steps
      </span>
    </Link>
  );
}
