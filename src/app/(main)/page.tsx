import { learningLevels } from '@/lib/learning-path-data';
import { LearningPathCard } from './components/lesson-card';
import { BookOpenCheck, MoonStar, Globe } from 'lucide-react';

const levelIcons = {
  "Level 1": <BookOpenCheck className="h-6 w-6 text-primary" />,
  "Level 2": <MoonStar className="h-6 w-6 text-green-600" />,
  "Level 3": <Globe className="h-6 w-6 text-blue-600" />,
}

export default function LearningPathPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Your Learning Path
        </h1>
        <p className="text-muted-foreground">
          A guided journey to deepen your knowledge and practice.
        </p>
      </div>

      <div className="space-y-12">
        {learningLevels.map((level) => (
          <section key={level.title}>
            <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 p-2 rounded-lg">
                    {levelIcons[level.title as keyof typeof levelIcons]}
                </div>
                <div>
                    <h2 className="text-2xl font-bold font-headline text-primary">
                        {level.title}
                    </h2>
                     <p className="text-muted-foreground">{level.description}</p>
                </div>
            </div>

            <div className="space-y-6">
              {level.categories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-xl font-semibold font-headline mb-4 text-foreground/90">{category.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.topics.map((topic) => (
                      <LearningPathCard key={topic.title} topic={topic} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
