import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function UserNav() {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/auth">
        <User className="h-5 w-5" />
        <span className="sr-only">Go to login page</span>
      </Link>
    </Button>
  );
}
