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
