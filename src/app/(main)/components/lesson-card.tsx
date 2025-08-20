
'use client';

import type { LearningTopic } from '@/lib/learning-path-data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpenCheck, HandHelping, HeartHandshake, Microscope } from 'lucide-react';
import React from 'react';

// Add a default Globe icon for level 3 to avoid missing icon errors
const Globe = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);

const iconComponents: { [key: string]: React.ElementType } = {
  'Tawhid': BookOpenCheck,
  'Prophets': BookOpenCheck,
  'Afterlife': BookOpenCheck,
  'Salah': HandHelping,
  'Purification': HandHelping,
  'Adhkar': HandHelping,
  'Halal & Haram': HandHelping,
  'Sirah': BookOpenCheck,
  'Quran': BookOpenCheck,
  'Community': HeartHandshake,
  'Spirituality': HeartHandshake,
  'Islam & Universality': Globe,
  'Spread of Islam': Globe,
  'Prophet & Aisha': Globe,
  'Women in Islam': Globe,
  'Jihad': Globe,
  'Islam & Modernity': Microscope,
  'Islamophobia': Microscope,
};

// A simple hashing function to create a deterministic "random" progress
const getProgress = (title: string) => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        const char = title.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) % 81 + 10; // Progress between 10% and 90%
}


export function LearningPathCard({ topic }: { topic: LearningTopic }) {
  const { title, description, icon } = topic;
  const progress = getProgress(title);
  const IconComponent = iconComponents[icon] || BookOpenCheck;

  return (
    <Card className="flex flex-col rounded-xl shadow-sm transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary rounded-lg flex items-center justify-center size-12 shrink-0">
                <IconComponent className="size-6" />
            </div>
            <div>
                <CardTitle className="text-base font-semibold font-headline">{title}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex items-center gap-3 pt-4">
        <Progress value={progress} className="h-2 w-full" />
        <span className="text-sm font-medium text-muted-foreground">{progress}%</span>
      </CardFooter>
    </Card>
  );
}
