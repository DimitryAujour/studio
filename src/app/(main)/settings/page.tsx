
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';

export default function SettingsPage() {
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
              <AvatarImage src="/avatars/01.png" alt="User avatar" />
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
            <Label htmlFor="description">About Me</Label>
            <Textarea
              id="description"
              placeholder="Tell us a little bit about yourself"
              defaultValue="I am a new Muslim eager to learn and grow in my faith."
            />
          </div>

          <div className="grid gap-2">
            <Label>Islamic Branch</Label>
            <RadioGroup defaultValue="sunni" className="flex gap-4">
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
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
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
            <Input id="values" placeholder="e.g. Compassion, Family, Knowledge" defaultValue="Knowledge, Prayer, Community"/>
             <p className="text-xs text-muted-foreground">
                Enter a few values that are important to you, separated by commas.
              </p>
          </div>

          <Button>Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
