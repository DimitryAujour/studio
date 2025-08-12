import { salahSteps } from '@/lib/data';
import { SalahGuideClient } from './salah-guide-client';

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
      <SalahGuideClient steps={salahSteps} />
    </div>
  );
}
