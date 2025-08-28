
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { useSessionStorage } from '@/hooks/use-session-storage';
import { useEffect, useState } from 'react';

const DUA_OF_THE_DAY_KEY = 'dua-of-the-day-shown';

export function DuaOfTheDayDialog() {
  const [hasBeenShown, setHasBeenShown] = useSessionStorage(DUA_OF_THE_DAY_KEY, false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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
         <div className="relative flex size-full min-h-[550px] flex-col items-center justify-center p-6 text-center group/design-root overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/seed/dua/1200/800')"}} data-ai-hint="islamic calligraphy background"></div>
            <div className="z-10 flex flex-col items-center justify-center flex-grow animate-fade-in-up">
                <h1 className="text-foreground text-4xl font-bold font-headline leading-tight mb-4 text-shadow-lg">
                    My Lord, increase me in knowledge.
                </h1>
                <p className="text-foreground/80 text-lg font-medium leading-normal text-shadow">
                    Quran 20:114
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
