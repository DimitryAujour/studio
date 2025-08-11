
'use client';
import { useEffect } from 'react'; // Import useEffect
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
import { auth } from '@/lib/firebase/config';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth'; // Import redirect methods
import { useRouter } from 'next/navigation'; // To handle redirection after login

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.828 12.18C34.001 7.77 28.521 4 23 4C12.438 4 4 12.438 4 23s8.438 19 19 19s19-8.438 19-19c0-1.341-.138-2.65-.389-3.917"
      ></path>
      <path
        fill="#FF3D00"
        d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039L38.828 12.18C34.001 7.77 28.521 4 23 4C16.318 4 10.252 7.22 6.306 11.691"
      ></path>
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025A19.92 19.92 0 0 0 24 44"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l6.19 5.238C42.022 35.138 44 30.026 44 24c0-1.341-.138-2.65-.389-3.917"
      ></path>
    </svg>
  );
}

export default function AuthenticationPage() {
  const router = useRouter();

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // User successfully signed in.
          const user = result.user;
          console.log("Signed in user:", user);
          // Redirect to a different page after successful sign-in
          router.push('/'); 
        }
      } catch (error) {
        console.error("Error getting redirect result", error);
      }
    };

    checkRedirectResult();
  }, [router]);

  const handleGoogleSignInRedirect = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Tabs defaultValue="sign-in" className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
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
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full">Sign In</Button>
               <Button variant="outline" className="w-full" onClick={handleGoogleSignInRedirect}>
                <GoogleIcon className="mr-2 h-4 w-4"/>
                Continue with Google
              </Button>
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
                <Input id="new-email" type="email" placeholder="m@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Password</Label>
                <Input id="new-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full">Create Account</Button>
               <Button variant="outline" className="w-full" onClick={handleGoogleSignInRedirect}>
                <GoogleIcon className="mr-2 h-4 w-4"/>
                Continue with Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}