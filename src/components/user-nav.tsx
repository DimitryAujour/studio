
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User as AuthUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/firebase/config';
import { LogIn, LogOut, User, Settings } from 'lucide-react';

export function UserNav() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUsername = (email: string | null | undefined) => {
    if (!email) return 'User';
    return email.split('@')[0];
  };

  if (!user) {
    return (
      <Button asChild>
        <Link href="/auth">
          <LogIn className="mr-2" />
          Login
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <p className="hidden sm:block text-sm text-foreground">
        Salam alaykum,{' '}
        <span className="font-semibold">{getUsername(user.email)}</span>
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="User avatar" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {getUsername(user.email)}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
             <DropdownMenuItem asChild>
                <Link href="/settings">
                    <Settings className="mr-2" />
                    <span>Profile</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
