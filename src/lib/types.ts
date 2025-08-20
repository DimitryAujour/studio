export type LearningTopic = {
    title: string;
    description: string;
    icon: string;
};

export type LearningCategory = {
    name: string;
    topics: LearningTopic[];
};

export type LearningLevel = {
    title: string;
    description: string;
    categories: LearningCategory[];
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
