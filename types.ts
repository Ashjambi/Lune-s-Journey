
export type AgeGroup = '3-7' | '8-12';

export enum Category {
  DAILY_ROUTINES = 'daily_routines',
  EARLY_LANGUAGE = 'early_language',
  EXPLORATION = 'exploration',
  STRUCTURED_LANGUAGE = 'structured_language'
}

export interface Flashcard {
  word: string;
  imageHint: string;
  exampleSentence?: string;
  audioKey?: string;
}

export interface Unit {
  week: number;
  category: Category;
  ageGroup: AgeGroup;
  theme: string;
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
}

export interface LearningProgress {
  category: Category;
  currentWeek: number;
  masteredWords: string[];
  lastSession: string;
}
