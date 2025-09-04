
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSessionStorage } from '@/hooks/use-session-storage';
import { useEffect, useState } from 'react';

const DUA_OF_THE_DAY_KEY = 'dua-of-the-day-shown';

// Array of duas
const duas = [
  {
    text: "My Lord, increase me in knowledge.",
    source: "Quran 20:114"
  },
  {
    text: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    source: "Quran 2:201"
  },
  {
    text: "My Lord, have mercy upon them as they brought me up [when I was] small.",
    source: "Quran 17:24"
  },
  {
    text: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
    source: "Quran 3:8"
  }
];

// Function to get a random dua
const getRandomDua = () => {
  const randomIndex = Math.floor(Math.random() * duas.length);
  return duas[randomIndex];
};


export function DuaOfTheDayDialog() {
  const [hasBeenShown, setHasBeenShown] = useSessionStorage(DUA_OF_THE_DAY_KEY, false);
  const [isOpen, setIsOpen] = useState(false);
  // Initialize with the first dua to ensure server and client match on first render.
  const [dua, setDua] = useState(duas[0]);

  useEffect(() => {
    // Select a random dua on the client side to avoid hydration mismatch.
    setDua(getRandomDua());

    // Only show the dialog if it hasn't been shown before in this session.
    if (!hasBeenShown) {
      // A small delay to allow the page to render before showing the modal.
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasBeenShown]);
  
  const handleContinue = () => {
    setIsOpen(false);
    setHasBeenShown(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 border-0 max-w-lg h-screen sm:h-auto sm:max-h-[90vh] flex items-center justify-center text-center !rounded-lg overflow-hidden">
         <DialogHeader className="sr-only">
          <DialogTitle>Dua of the Day</DialogTitle>
          <DialogDescription>A daily prayer to inspire your learning journey.</DialogDescription>
        </DialogHeader>
         <div className="relative flex size-full min-h-[550px] flex-col items-center justify-center p-6 text-center group/design-root overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/seed/dua/1200/800')"}} data-ai-hint="islamic calligraphy background"></div>
            <div className="z-10 flex flex-col items-center justify-center flex-grow animate-fade-in-up">
                <h1 className="text-foreground text-4xl font-bold font-headline leading-tight mb-4 text-shadow-lg">
                    {dua.text}
                </h1>
                <p className="text-foreground/80 text-lg font-medium leading-normal text-shadow">
                    {dua.source}
                </p>
            </div>
            <div className="w-full z-10 pb-8">
                <Button 
                    onClick={handleContinue} 
                    className="w-full max-w-sm mx-auto h-14 px-8 text-lg font-bold shadow-lg"
                    size="lg"
                >
                    Continue
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
