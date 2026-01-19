
export type AgeGroup = '3-7' | '8-12';
export type Language = 'en' | 'ar';

export enum Category {
  DAILY_ROUTINES = 'daily_routines',
  EARLY_LANGUAGE = 'early_language',
  EXPLORATION = 'exploration',
  STRUCTURED_LANGUAGE = 'structured_language'
}

export interface Flashcard {
  word: string;
  wordAr?: string;
  imageHint: string;
  exampleSentence?: string;
  audioKey?: string;
}

export interface Unit {
  week: number;
  category: Category;
  ageGroup: AgeGroup;
  theme: string;
  themeAr: string;
  targetWords: string[];
  context: string;
  flashcards: Flashcard[];
  comprehensionQuestions: string[];
  montessoriPrinciple: string;
  characterFeedback: string;
}

export interface ChannelMapping {
  channel_id: string;
  name: string;
  category: Category;
  age_group: AgeGroup;
  common_topics: string[];
  featured_video_id?: string;
  icon: string;
}

export interface UserStats {
  stars: number;
  stickers: string[];
  lastLanguage: Language;
}
