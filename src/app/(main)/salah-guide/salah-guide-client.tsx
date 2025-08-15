'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { SalahStep } from '@/lib/types';
import { Loader2, Volume2, Play } from 'lucide-react';
import Image from 'next/image';
import { useActionState, useRef, useState, useEffect, useTransition } from 'react';
import { getPronunciation } from './actions';

export function SalahGuideClient({ steps }: { steps: SalahStep[] }) {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [loadingStep, setLoadingStep] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPending, startTransition] = useTransition();


  const initialState = { audioDataUri: null, error: null };
  const [state, formAction] = useActionState(getPronunciation, initialState);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
      setLoadingStep(null); 
    }
    if (state.audioDataUri) {
        if(audioRef.current) {
            audioRef.current.src = state.audioDataUri;
            audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        }
      setLoadingStep(null);
    }
  }, [state, toast]);

  useEffect(() => {
    if (isPending) {
        // Already handled by loadingStep
    }
  }, [isPending]);


  const handlePlayPronunciation = (step: SalahStep) => {
    if (loadingStep !== null) return;
    
    setLoadingStep(step.id);
    setActiveStep(step.id);
    const formData = new FormData();
    formData.append('text', step.arabic);
    startTransition(() => {
        formAction(formData);
    });
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
                    disabled={loadingStep !== null}
                  >
                    {loadingStep === step.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : activeStep === step.id && !loadingStep ? (
                      <Play className="mr-2 h-4 w-4" />
                    ) : (
                      <Volume2 className="mr-2 h-4 w-4" />
                    )}
                    {loadingStep === step.id ? 'Generating...' : 'Play Pronunciation'}
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
