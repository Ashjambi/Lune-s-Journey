
import React, { useState } from 'react';
import { Flashcard, AgeGroup } from '../types';

interface FlashcardViewerProps {
  cards: Flashcard[];
  ageGroup: AgeGroup;
  onComplete: () => void;
}

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ cards, ageGroup, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const card = cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      speak(cards[currentIndex + 1].word);
    } else {
      onComplete();
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  React.useEffect(() => {
    speak(card.word);
  }, [currentIndex, card.word]);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto py-10">
      <div className="w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border-8 border-white p-2">
        <img 
          src={card.imageHint} 
          alt={card.word} 
          className="w-full h-64 object-cover rounded-2xl mb-6 shadow-inner" 
        />
        <div className="p-6 text-center">
          <h2 className="text-4xl brand-font text-blue-600 mb-2 capitalize">{card.word}</h2>
          {ageGroup === '8-12' && card.exampleSentence && (
            <p className="text-gray-600 italic mt-4 text-lg">"{card.exampleSentence}"</p>
          )}
          
          <button 
            onClick={() => speak(card.word)}
            className="mt-6 bg-blue-100 hover:bg-blue-200 text-blue-600 p-4 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full px-6">
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          ></div>
        </div>
        <span className="text-blue-600 font-bold">{currentIndex + 1}/{cards.length}</span>
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white brand-font py-4 rounded-2xl shadow-lg transform active:scale-95 transition-all text-xl"
      >
        {currentIndex === cards.length - 1 ? "Finish Lesson!" : "Next Word"}
      </button>
    </div>
  );
};
