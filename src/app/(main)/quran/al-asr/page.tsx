import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const verses = [
  "وَالْعَصْرِ",
  "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
  "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ"
];

const explanation = "Al-Asr, a short but powerful chapter, emphasizes the importance of time. It states that all of humanity is in loss, except for those who have faith, do righteous deeds, and advise each other to truth and patience.";

export default function AlAsrPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm -mx-6 -mt-6 px-4">
        <div className="flex items-center p-4">
            <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
               <Link href="/salah-guide">
                <ArrowLeft className="h-5 w-5" />
               </Link>
            </Button>
            <h1 className="text-xl font-bold font-headline flex-1 text-center pr-9">Al-Asr</h1>
        </div>
        <Tabs defaultValue="arabic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 border-b rounded-none">
            <TabsTrigger value="arabic" className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none">Arabic</TabsTrigger>
            <TabsTrigger value="transliteration" className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none">Transliteration</TabsTrigger>
            <TabsTrigger value="explanation" className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:shadow-none">Explanation</TabsTrigger>
          </TabsList>
          
        </Tabs>
      </header>
      
      <main className="flex-grow p-6 text-right space-y-6">
        {verses.map((verse, index) => (
            <p key={index} className="font-arabic text-3xl leading-loose">{verse}</p>
        ))}
      </main>

      <footer className="bg-card rounded-t-3xl p-6 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] -mx-6 -mb-6">
        <h2 className="font-headline text-2xl font-bold tracking-tight mb-3">Explanation</h2>
        <p className="text-muted-foreground text-base leading-relaxed">{explanation}</p>
      </footer>
    </div>
  )
}
