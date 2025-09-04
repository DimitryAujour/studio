'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';
import { auth, db } from '@/lib/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function AuthenticationPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [domainMessage, setDomainMessage] = useState<string | null>(null);

  useState(() => {
    if (typeof window !== 'undefined') {
      const currentDomain = window.location.hostname;
      if (currentDomain === 'localhost' || currentDomain.includes('127.0.0.1')) {
         setDomainMessage(`To enable email/password sign-in, please add your local development domain to the authorized domains list in the Firebase Console. The domain to add is: ${currentDomain}`);
      }
    }
  });


  const handleSignUp = async () => {
    setError(null);
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create a user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        aboutMe: 'I am a new Muslim eager to learn and grow in my faith.',
        islamicBranch: 'sunni',
        language: 'en',
        values: 'Knowledge, Prayer, Community',
        avatarUrl: '/avatars/01.png',
      });

      router.push('/'); // Redirect to homepage after successful sign-up
    } catch (e) {
      const error = e as AuthError;
      console.error('Error signing up:', error.code, error.message);
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('The password is too weak. Please choose a stronger password.');
      }
      else {
        setError(error.message);
      }
    }
  };
  
  const handleSignIn = async () => {
    setError(null);
    if (!email || !password) {
        setError("Please enter both email and password.");
        return;
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        router.push('/'); // Redirect to homepage after successful sign-in
    } catch (e) {
        const error = e as AuthError;
        console.error('Error signing in:', error.code, error.message);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            setError('Invalid email or password. Please try again.');
        } else {
            setError(error.message);
        }
    }
  };

  // Function to clear state when switching tabs
  const handleTabChange = () => {
    setEmail('');
    setPassword('');
    setError(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Tabs defaultValue="sign-in" className="w-full max-w-md" onValueChange={handleTabChange}>
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        
        {domainMessage && <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-md text-center text-sm mb-4" role="alert">{domainMessage}</div>}
        {error && <div className="bg-destructive/20 text-destructive p-3 rounded-md text-center text-sm mb-4">{error}</div>}

        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="sign-in">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to continue your learning journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={handleSignIn}>Sign In</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Create an Account</CardTitle>
              <CardDescription>
                Join Hidayah Steps to start your path of knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-email">Email</Label>
                <Input id="new-email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Password</Label>
                <Input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={handleSignUp}>Create Account</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
