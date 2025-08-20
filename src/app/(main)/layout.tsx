
'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { BookCopy, Bot, HelpingHand, BookText, ChevronDown, Settings, BookOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import React from 'react';


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isTopicsOpen, setIsTopicsOpen] = React.useState(false);
  const [isQuranOpen, setIsQuranOpen] = React.useState(true);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/'}
                tooltip={{ children: 'Learning Path' }}
              >
                <Link href="/">
                  <BookCopy />
                  <span>Learning Path</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/salah-guide'}
                tooltip={{ children: 'Salah Guide' }}
              >
                <Link href="/salah-guide">
                  <HelpingHand />
                  <span>Salah Guide</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/ai-guidance'}
                tooltip={{ children: 'AI Guidance' }}
              >
                <Link href="/ai-guidance">
                  <Bot />
                  <span>AI Guidance</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Collapsible open={isQuranOpen} onOpenChange={setIsQuranOpen}>
                  <CollapsibleTrigger asChild>
                     <SidebarMenuButton className="w-full justify-start">
                        <BookOpen />
                        <span>Quran</span>
                        <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${isQuranOpen ? 'rotate-180' : ''}`} />
                      </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                       <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/quran/al-fatiha'}>
                          <Link href="/quran/al-fatiha">Al-Fatiha</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                       <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === '/quran/al-asr'}>
                          <Link href="/quran/al-asr">Al-Asr</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
             <SidebarMenuItem>
                <Collapsible open={isTopicsOpen} onOpenChange={setIsTopicsOpen}>
                  <CollapsibleTrigger asChild>
                     <SidebarMenuButton className="w-full justify-start">
                        <BookText />
                        <span>Topics</span>
                        <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${isTopicsOpen ? 'rotate-180' : ''}`} />
                      </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="#">The concept of God (Allah)</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="#">Prophets in Islam</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                           <Link href="#">The Quran's compilation</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                           <Link href="#">Understanding Hadith</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                       <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                           <Link href="#">Role of women in Islam</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                       <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                           <Link href="#">Concept of Jihad</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
              <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/settings'}
                tooltip={{ children: 'Settings' }}
              >
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden md:block">
            <Logo />
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
