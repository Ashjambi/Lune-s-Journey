
import React, { useState, useEffect } from 'react';

interface QuestionViewerProps {
  questions: string[];
  theme: string;
  onComplete: () => void;
}

export const QuestionViewer: React.FC<QuestionViewerProps> = ({ questions, theme, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    speak(questions[currentIndex]);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto py-10 animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border-t-8 border-yellow-400 w-full relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center border-4 border-yellow-400 text-5xl">
          🦉
        </div>
        
        <div className="mt-8 text-center space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-yellow-600 font-bold">Luna's Question</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
            "{questions[currentIndex]}"
          </p>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => speak(questions[currentIndex])}
              className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-full text-yellow-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-10 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 text-center italic">
            "Answer out loud or point to something! Luna is listening..."
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <button 
          onClick={handleNext}
          className="w-full bg-green-500 hover:bg-green-600 text-white brand-font py-5 rounded-3xl shadow-lg transform active:scale-95 transition-all text-2xl flex items-center justify-center gap-3"
        >
          {currentIndex === questions.length - 1 ? "I've Answered All! 🌟" : "Next Question ✨"}
        </button>
        <p className="text-slate-400 font-bold">{currentIndex + 1} of {questions.length}</p>
      </div>
    </div>
  );
};
