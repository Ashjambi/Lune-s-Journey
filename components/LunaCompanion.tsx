
import React from 'react';

interface LunaCompanionProps {
  message: string;
  isThinking?: boolean;
  onAction?: () => void;
  actionLabel?: string;
}

export const LunaCompanion: React.FC<LunaCompanionProps> = ({ message, isThinking, onAction, actionLabel }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white rounded-[3rem] shadow-2xl border-4 border-yellow-200 transition-all duration-500 hover:shadow-yellow-100/50 max-w-2xl mx-auto ring-1 ring-yellow-100">
      <div className="relative group shrink-0">
        <div className="w-36 h-36 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-full flex items-center justify-center border-4 border-yellow-400 bouncy cursor-pointer overflow-hidden relative shadow-inner">
          {/* Expressive animated owl */}
          <span className="text-7xl animate-bounce drop-shadow-sm select-none">🦉</span>
          
          {/* Small animated sparkles */}
          <div className="absolute top-2 right-4 animate-pulse delay-75 text-xl">✨</div>
          <div className="absolute bottom-4 left-4 animate-pulse delay-500 text-lg">✨</div>
        </div>
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border-2 border-white uppercase tracking-tighter">
          Luna
        </div>
      </div>
      
      <div className="flex-1 space-y-6 text-center md:text-left">
        <div className="bg-yellow-50 p-6 rounded-[2rem] relative border border-yellow-100">
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-yellow-50 border-l border-b border-yellow-100 rotate-45 transform -translate-y-1/2 hidden md:block"></div>
          <p className="text-xl font-bold text-slate-800 leading-relaxed italic">
            "{message}"
          </p>
          {isThinking && (
            <div className="mt-3 flex gap-2 justify-center md:justify-start">
              <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-300"></span>
            </div>
          )}
        </div>
        
        {onAction && (
          <button 
            onClick={onAction}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black py-4 px-10 rounded-3xl shadow-xl shadow-yellow-100 transform active:scale-95 transition-all brand-font text-xl border-b-4 border-yellow-600"
          >
            {actionLabel || "Let's Go!"}
          </button>
        )}
      </div>
    </div>
  );
};
