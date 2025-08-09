import { lessons } from '@/lib/data';
import { LessonCard } from './components/lesson-card';

export default function LearningPathPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Your Learning Path
        </h1>
        <p className="text-muted-foreground">
          Begin your journey with these foundational lessons.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
