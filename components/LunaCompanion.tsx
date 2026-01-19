
import React, { useEffect } from 'react';

interface LunaCompanionProps {
  message: string;
  isThinking?: boolean;
  onAction?: () => void;
  actionLabel?: string;
  autoSpeak?: boolean;
}

export const LunaCompanion: React.FC<LunaCompanionProps> = ({ 
  message, 
  isThinking, 
  onAction, 
  actionLabel,
  autoSpeak = true 
}) => {
  
  useEffect(() => {
    if (autoSpeak && message && !isThinking) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = /[\u0600-\u06FF]/.test(message) ? 'ar-SA' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, [message, isThinking, autoSpeak]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-[2.5rem] shadow-xl border-4 border-yellow-200 transition-all hover:scale-[1.01] max-w-2xl mx-auto">
      <div className="relative shrink-0">
        <div className="w-32 h-32 bg-yellow-50 rounded-full flex items-center justify-center border-4 border-yellow-400 animate-bounce cursor-pointer relative overflow-visible shadow-inner">
          <span className="text-6xl drop-shadow-md">🦉</span>
          <div className="absolute -bottom-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight">Luna</div>
        </div>
      </div>
      
      <div className="flex-1 text-center md:text-left space-y-4">
        <div className="bg-slate-50 p-5 rounded-3xl relative border border-slate-100 shadow-sm">
          <p className="text-lg font-bold text-slate-800 leading-snug italic">
            {message}
          </p>
          {isThinking && (
            <div className="mt-2 flex gap-1.5 justify-center md:justify-start">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-75"></span>
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-150"></span>
            </div>
          )}
        </div>
        
        {onAction && (
          <button 
            onClick={onAction}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-6 rounded-2xl shadow-lg transform active:scale-95 transition-all text-lg border-b-4 border-yellow-600"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
