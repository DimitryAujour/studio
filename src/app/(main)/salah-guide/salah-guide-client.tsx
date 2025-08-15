'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import type { SalahStep } from '@/lib/types';
import { Volume2, Play } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

export function SalahGuideClient({ steps }: { steps: SalahStep[] }) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPronunciation = (step: SalahStep) => {
    if (audioRef.current) {
      setActiveStep(step.id);
      audioRef.current.src = step.audioUrl;
      audioRef.current.play().catch((e) => console.error("Error playing audio:", e));
    }
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {steps.map((step, index) => (
          <AccordionItem value={`item-${step.id}`} key={step.id}>
            <AccordionTrigger className="text-lg hover:no-underline">
              <span className="text-primary font-bold mr-4">{index + 1}.</span>
              {step.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={step.imageUrl}
                    alt={step.name}
                    fill
                    className="object-cover"
                    data-ai-hint="islamic prayer"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="rounded-lg border bg-card p-4 space-y-2">
                     <p className="text-foreground/80" dangerouslySetInnerHTML={{ __html: step.description }} />
                    <p className="text-xl text-right font-headline" dir="rtl">
                      {step.arabic}
                    </p>
                    <p className="text-sm text-muted-foreground text-right italic">
                      {step.transliteration}
                    </p>
                    <p className="text-sm text-muted-foreground text-right">
                      "{step.translation}"
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto self-start"
                    onClick={() => handlePlayPronunciation(step)}
                  >
                    {activeStep === step.id ? (
                      <Play className="mr-2 h-4 w-4" />
                    ) : (
                      <Volume2 className="mr-2 h-4 w-4" />
                    )}
                    Play Pronunciation
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <audio ref={audioRef} onEnded={() => setActiveStep(null)} />
    </>
  );
}
