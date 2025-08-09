import { Bot } from "lucide-react";
import { QAForm } from "./qa-form";

export default function AIGuidancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          AI-Powered Guidance
        </h1>
        <p className="text-muted-foreground">
          Ask a question about Islam and get answers grounded in the Quran and Hadith.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center bg-card">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Bot className="h-8 w-8 text-primary" />
        </div>
        <p className="mb-4 text-lg font-medium">Have a question?</p>
        <p className="max-w-md text-muted-foreground">
            Our AI assistant is here to help you find answers and provide clarity on your journey.
        </p>
      </div>
      <QAForm />
    </div>
  )
}
