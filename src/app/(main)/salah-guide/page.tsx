import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { salahSteps } from '@/lib/data';
import { Volume2 } from 'lucide-react';
import Image from 'next/image';

export default function SalahGuidePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Interactive Salah Guide
        </h1>
        <p className="text-muted-foreground">
          Learn the steps of Salah with visual aids and pronunciation guides.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {salahSteps.map((step, index) => (
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
                  <p className="text-foreground/80">{step.description}</p>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-xl text-right font-headline" dir="rtl">{step.arabic}</p>
                    <p className="text-sm text-muted-foreground text-right italic">"{step.translation}"</p>
                  </div>
                  <Button variant="outline" className="w-full md:w-auto self-start">
                    <Volume2 className="mr-2 h-4 w-4" />
                    Play Pronunciation
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
