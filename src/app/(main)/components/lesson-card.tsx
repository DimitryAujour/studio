'use client';

import { useState } from 'react';
import type { Lesson } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <Card className="flex flex-col rounded-lg shadow-md transition-all hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{lesson.title}</CardTitle>
        <CardDescription>{lesson.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80">{lesson.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setIsCompleted(true)}
          disabled={isCompleted}
          className="w-full transition-colors"
          variant={isCompleted ? 'secondary' : 'default'}
        >
          {isCompleted ? (
            <CheckCircle2 className="mr-2 h-4 w-4" />
          ) : (
            <Circle className="mr-2 h-4 w-4" />
          )}
          {isCompleted ? 'Completed' : 'Mark as Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
}
