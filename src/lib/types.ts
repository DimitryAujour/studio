export type Lesson = {
  id: number;
  title: string;
  category: string;
  description: string;
};

export type SalahStep = {
  id: number;
  name: string;
  description: string;
  arabic: string;
  transliteration: string;
  translation: string;
  imageUrl: string;
  audioUrl: string;
};

export type UserProfile = {
  uid: string;
  email: string | null;
  aboutMe?: string;
  islamicBranch?: 'sunni' | 'shia' | 'other';
  language?: 'en' | 'ar' | 'ur' | 'fr' | 'es';
  values?: string;
  avatarUrl?: string;
};
