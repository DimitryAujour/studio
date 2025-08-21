
'use client';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LessonDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  
  // Capitalize the first letter of each word in the slug for the title
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

  return (
    <div className="flex flex-col min-h-screen -m-6 bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-bold flex-1 text-center pr-9">
            Lesson Details
          </h2>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 pb-24">
        <h1 className="text-2xl font-bold font-headline tracking-tight mb-2">
            {title}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-6">
          This lesson will explore the core concepts of {title}. These are essential for every Muslim to understand and practice.
        </p>
        <div className="space-y-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="p-5">
              <h3 className="text-lg font-bold font-headline tracking-tight mb-2">
                Introduction to {title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="relative w-full h-48">
              <Image
                src="https://placehold.co/600x400"
                alt="Placeholder image for lesson content"
                fill
                className="object-cover"
                data-ai-hint="islamic learning"
              />
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="p-5">
              <h3 className="text-lg font-bold font-headline tracking-tight mb-2">
                Key Concepts
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
             <div className="relative w-full h-48">
                <Image
                    src="https://placehold.co/600x400"
                    alt="Placeholder image for key concepts"
                    fill
                    className="object-cover"
                    data-ai-hint="quran book"
                />
            </div>
          </div>
           <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="p-5">
              <h3 className="text-lg font-bold font-headline tracking-tight mb-2">
                Practical Application
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
             <div className="relative w-full h-48">
                <Image
                    src="https://placehold.co/600x400"
                    alt="Placeholder for practical application"
                    fill
                    className="object-cover"
                    data-ai-hint="prayer hands"
                />
            </div>
          </div>
        </div>
      </main>
       <div className="fixed bottom-0 left-0 right-0 md:left-[var(--sidebar-width)] peer-data-[state=collapsed]:md:left-[var(--sidebar-width-icon)]">
          <div className="px-4 py-3 bg-background/80 backdrop-blur-sm">
            <Button className="w-full h-12 text-base font-bold shadow-lg">
                Take Quiz
            </Button>
          </div>
        </div>
    </div>
  );
}
