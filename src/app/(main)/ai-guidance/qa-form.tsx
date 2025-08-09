'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { askQuestion } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Getting Answer...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Ask Question
        </>
      )}
    </Button>
  );
}

export function QAForm() {
  const initialState = { answer: null, error: null };
  const [state, formAction] = useActionState(askQuestion, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
    if (state.answer) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
      <form ref={formRef} action={formAction} className="space-y-4">
        <Textarea
          name="question"
          placeholder="For example: What is the significance of Friday prayer?"
          rows={4}
          className="bg-card"
        />
        <SubmitButton />
      </form>

      {state.answer && (
        <Card className="shadow-lg animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Answer from AI Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap font-body">{state.answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
