
import { Category, ChannelMapping, Unit } from './types.ts';

export const CHANNELS: ChannelMapping[] = [
  {
    channel_id: "UCbCmjCuTUZos6Inko4u57UQ",
    name: "Cocomelon",
    featured_video_id: "WRVsOCh907o", 
    category: Category.DAILY_ROUTINES,
    age_group: "3-7",
    common_topics: ["family", "food", "feelings"],
    icon: "🏠"
  },
  {
    channel_id: "UC9xF_6Sj5hMmwPqfO5GwYVg",
    name: "Ms Rachel",
    featured_video_id: "0c1A7q3c1Q0",
    category: Category.EARLY_LANGUAGE,
    age_group: "3-7",
    common_topics: ["body", "emotions"],
    icon: "🔤"
  },
  {
    channel_id: "UC1WkHmLQXlTuWJHeIIpSJKA",
    name: "Blippi",
    featured_video_id: "pL1jZf8_J_c",
    category: Category.EXPLORATION,
    age_group: "3-7",
    common_topics: ["vehicles", "animals"],
    icon: "🚜"
  },
  {
    channel_id: "UCqZQJ4w5A5vEYcVqNqy3d8A",
    name: "BBC Kids English",
    featured_video_id: "tVlcKp3bWH8",
    category: Category.STRUCTURED_LANGUAGE,
    age_group: "8-12",
    common_topics: ["grammar", "conversation"],
    icon: "📚"
  }
];

export const CURRICULUM: Record<Category, Unit[]> = {
  [Category.DAILY_ROUTINES]: [
    {
      week: 1,
      category: Category.DAILY_ROUTINES,
      ageGroup: '3-7',
      theme: "Morning Routine",
      themeAr: "الروتين الصباحي",
      targetWords: ["wake up", "brush teeth", "wash face"],
      context: "Self-care activities.",
      flashcards: [
        { word: "wake up", wordAr: "استيقظ", imageHint: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=400" },
        { word: "brush teeth", wordAr: "فرشاة أسنان", imageHint: "https://images.unsplash.com/photo-1559591937-e17929424f92?w=400" },
        { word: "wash face", wordAr: "غسل الوجه", imageHint: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400" }
      ],
      comprehensionQuestions: ["What do you use to clean your teeth?", "When do you wake up?"],
      montessoriPrinciple: "Practical Life",
      characterFeedback: "Amazing job, little owl! 🦉"
    }
  ],
  [Category.EARLY_LANGUAGE]: [],
  [Category.EXPLORATION]: [],
  [Category.STRUCTURED_LANGUAGE]: []
};

export const UI_STRINGS = {
  en: {
    welcome: "Hi! I'm Luna. Choose what you want to watch!",
    ready: "Ready for the quiz?",
    stars: "Stars",
    next: "Next",
    finish: "Finish",
    parentalGate: "Parental Check: Tap the Red Circle 🔴"
  },
  ar: {
    welcome: "أهلاً! أنا لونا. اختر ماذا تريد أن تشاهد اليوم!",
    ready: "هل أنت مستعد للاختبار؟",
    stars: "نجوم",
    next: "التالي",
    finish: "إنهاء",
    parentalGate: "تحقق الوالدين: اضغط على الدائرة الحمراء 🔴"
  }
};
