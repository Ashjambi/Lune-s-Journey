
import { Category, ChannelMapping, Unit } from './types';

export const CHANNELS: ChannelMapping[] = [
  {
    channel_id: "UCbCmjCuTUZos6Inko4u57UQ",
    name: "Cocomelon",
    // Bath Song - Highly likely to be embeddable
    featured_video_id: "WRVsOCh907o", 
    category: Category.DAILY_ROUTINES,
    age_group: "3-7",
    common_topics: ["family", "food", "feelings", "actions", "numbers", "colors"]
  },
  {
    channel_id: "UC9xF_6Sj5hMmwPqfO5GwYVg",
    name: "Ms Rachel",
    // Baby Learning Video
    featured_video_id: "0c1A7q3c1Q0",
    category: Category.EARLY_LANGUAGE,
    age_group: "3-7",
    common_topics: ["body", "emotions", "simple_verbs", "sounds", "social_skills"]
  },
  {
    channel_id: "UC1WkHmLQXlTuWJHeIIpSJKA",
    name: "Blippi",
    // Excavator Song
    featured_video_id: "pL1jZf8_J_c",
    category: Category.EXPLORATION,
    age_group: "3-7",
    common_topics: ["vehicles", "jobs", "animals", "places", "machines"]
  },
  {
    channel_id: "UCoGeHA2Dn9yZYdR9KZ4FhAQ",
    name: "Super Simple Songs",
    // Twinkle Twinkle Little Star
    featured_video_id: "yCjJyiqpAuU",
    category: Category.EARLY_LANGUAGE,
    age_group: "3-7",
    common_topics: ["alphabet", "shapes", "weather", "animals"]
  },
  {
    channel_id: "UCqZQJ4w5A5vEYcVqNqy3d8A",
    name: "BBC Kids English",
    // Greeting song
    featured_video_id: "tVlcKp3bWH8",
    category: Category.STRUCTURED_LANGUAGE,
    age_group: "8-12",
    common_topics: ["grammar", "vocabulary", "reading", "conversation"]
  },
  {
    channel_id: "UC7eHZXheF8nVqzGgKt7eWxQ",
    name: "Pinkfong",
    // Baby Shark
    featured_video_id: "XqZsoesa55w",
    category: Category.DAILY_ROUTINES,
    age_group: "3-7",
    common_topics: ["safety", "washing", "health"]
  }
];

export const CURRICULUM: Record<Category, Unit[]> = {
  [Category.DAILY_ROUTINES]: [
    {
      week: 1,
      category: Category.DAILY_ROUTINES,
      ageGroup: '3-7',
      theme: "Morning Routine",
      targetWords: ["wake up", "brush teeth", "wash face", "get dressed"],
      context: "Self-care activities starting the day.",
      flashcards: [
        { word: "wake up", imageHint: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=400&h=300&fit=crop" },
        { word: "brush teeth", imageHint: "https://images.unsplash.com/photo-1559591937-e17929424f92?w=400&h=300&fit=crop" },
        { word: "wash face", imageHint: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" },
        { word: "get dressed", imageHint: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400&h=300&fit=crop" }
      ],
      comprehensionQuestions: ["What do you use to clean your teeth?", "Can you show me how you wash your face?", "Which clothes do you put on first?"],
      montessoriPrinciple: "Practical Life – Care of Self",
      characterFeedback: "Luna the Owl says: You’re taking care of yourself like a big kid! 🦉✨"
    }
  ],
  [Category.EARLY_LANGUAGE]: [
    {
      week: 1,
      category: Category.EARLY_LANGUAGE,
      ageGroup: '3-7',
      theme: "My Family",
      targetWords: ["mother", "father", "sister", "brother"],
      context: "The social environment of the child.",
      flashcards: [
        { word: "mother", imageHint: "https://images.unsplash.com/photo-1510154221590-ff63e90a136f?w=400&h=300&fit=crop" },
        { word: "father", imageHint: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&h=300&fit=crop" },
        { word: "sister", imageHint: "https://images.unsplash.com/photo-1551021463-548f070f3f21?w=400&h=300&fit=crop" },
        { word: "brother", imageHint: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&h=300&fit=crop" }
      ],
      comprehensionQuestions: ["Who gives you the biggest hugs?", "Do you have a brother or a sister?", "What is your father's name?"],
      montessoriPrinciple: "Social Language Development",
      characterFeedback: "Luna hooted: Families are so wonderful! 🦉❤️"
    }
  ],
  [Category.EXPLORATION]: [
    {
      week: 1,
      category: Category.EXPLORATION,
      ageGroup: '3-7',
      theme: "In the Forest",
      targetWords: ["tree", "flower", "bird", "path"],
      context: "Natural world exploration.",
      flashcards: [
        { word: "tree", imageHint: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=300&fit=crop" },
        { word: "flower", imageHint: "https://images.unsplash.com/photo-1490750967868-886a50226951?w=400&h=300&fit=crop" },
        { word: "bird", imageHint: "https://images.unsplash.com/photo-1444464666168-49d633b867ad?w=400&h=300&fit=crop" },
        { word: "path", imageHint: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop" }
      ],
      comprehensionQuestions: ["What color are the leaves on trees?", "Can you hear a bird singing?", "Where does the path lead to?"],
      montessoriPrinciple: "Nature and Discovery",
      characterFeedback: "Luna says: The forest is full of magic! Let's explore more! 🌲🦉"
    }
  ],
  [Category.STRUCTURED_LANGUAGE]: [
    {
      week: 1,
      category: Category.STRUCTURED_LANGUAGE,
      ageGroup: '8-12',
      theme: "Social Etiquette",
      targetWords: ["polite", "respectful", "courtesy", "manners"],
      context: "Advanced social interaction.",
      flashcards: [
        { word: "polite", imageHint: "https://images.unsplash.com/photo-1522071823991-b5ae72647c46?w=400&h=300&fit=crop", exampleSentence: "It is polite to say thank you when you receive a gift." },
        { word: "courtesy", imageHint: "https://images.unsplash.com/photo-1473177104440-ffe2f376098c?w=400&h=300&fit=crop", exampleSentence: "Opening the door for others is a common courtesy." }
      ],
      comprehensionQuestions: ["Why is it important to be polite?", "Can you name three polite words in English?", "How do you show courtesy at school?"],
      montessoriPrinciple: "Grace and Courtesy",
      characterFeedback: "Luna says: You are becoming a very respectful young owl! 🦉🎓"
    }
  ]
};
