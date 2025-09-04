
'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile } from '@/lib/types';
import { Loader2, User } from 'lucide-react';
import { updateUserProfile } from './actions';
import { Skeleton } from '@/components/ui/skeleton';
import { onAuthStateChanged, User as AuthUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Update Profile
    </Button>
  );
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const initialState = { message: null, error: null };
  const [state, formAction] = useActionState(updateUserProfile, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
            const docRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data() as UserProfile);
            } else {
                console.log("No such document!");
                setProfile(null);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
    if (state.message) {
      toast({
        title: 'Success!',
        description: state.message,
      });
    }
  }, [state, toast]);

  if (loading) {
    return (
       <div className="flex flex-col gap-6">
         <div>
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </CardHeader>
            <CardContent className="space-y-8">
               <div className="flex items-center gap-4">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-20 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-48" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-1/2" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
       </div>
    )
  }

  if (!user) {
     return (
        <div className="flex flex-col gap-6 items-center text-center">
             <h1 className="text-3xl font-bold font-headline tracking-tight">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Please log in to view your settings.
            </p>
            <Button asChild>
                <Link href="/auth">Login</Link>
            </Button>
        </div>
     )
  }

  if (!profile) {
    return (
      <div className="flex flex-col gap-6 items-center text-center">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Could not load your profile. Please try again later.
        </p>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and profile settings.
        </p>
      </div>
      <form action={formAction}>
        <Input type="hidden" name="uid" value={user!.uid} />
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This information will be displayed publicly so be careful what you
              share.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatarUrl} alt="User avatar" />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <Button>Change Photo</Button>
                <p className="text-xs text-muted-foreground">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="aboutMe">About Me</Label>
              <Textarea
                id="aboutMe"
                name="aboutMe"
                placeholder="Tell us a little bit about yourself"
                defaultValue={profile.aboutMe}
              />
            </div>

            <div className="grid gap-2">
              <Label>Islamic Branch</Label>
              <RadioGroup name="islamicBranch" defaultValue={profile.islamicBranch} className="flex gap-4">
                <div>
                  <RadioGroupItem value="sunni" id="sunni" className="peer sr-only" />
                  <Label htmlFor="sunni" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Sunni
                  </Label>
                </div>
                 <div>
                  <RadioGroupItem value="shia" id="shia" className="peer sr-only" />
                  <Label htmlFor="shia" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Shia
                  </Label>
                </div>
                 <div>
                  <RadioGroupItem value="other" id="other" className="peer sr-only" />
                  <Label htmlFor="other" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                   <Select name="language" defaultValue={profile.language}>
                      <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">Arabic (العربية)</SelectItem>
                          <SelectItem value="ur">Urdu (اردو)</SelectItem>
                          <SelectItem value="fr">French (Français)</SelectItem>
                          <SelectItem value="es">Spanish (Español)</SelectItem>
                      </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="values">My Values</Label>
              <Input name="values" id="values" placeholder="e.g. Compassion, Family, Knowledge" defaultValue={profile.values}/>
               <p className="text-xs text-muted-foreground">
                  Enter a few values that are important to you, separated by commas.
                </p>
            </div>

            <SubmitButton />
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
