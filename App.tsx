
import React, { useState, useEffect } from 'react';
import { Category, AgeGroup, LearningProgress, Unit, ChannelMapping } from './types';
import { CHANNELS, CURRICULUM } from './data';
import { LunaCompanion } from './components/LunaCompanion';
import { FlashcardViewer } from './components/FlashcardViewer';
import { QuestionViewer } from './components/QuestionViewer';
import { getLunaEncouragement } from './services/gemini';

const App: React.FC = () => {
  const [view, setView] = useState<'HOME' | 'WATCH_AND_LEARN' | 'QUIZ'>('HOME');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('3-7');
  const [currentChannel, setCurrentChannel] = useState<ChannelMapping | null>(null);
  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
  const [lunaMessage, setLunaMessage] = useState("Hi! I'm Luna. Choose what you want to watch today!");
  const [stars, setStars] = useState(0);
  const [progress, setProgress] = useState<Record<Category, number>>({
    [Category.DAILY_ROUTINES]: 0,
    [Category.EARLY_LANGUAGE]: 0,
    [Category.EXPLORATION]: 0,
    [Category.STRUCTURED_LANGUAGE]: 0,
  });

  const selectChannel = async (channel: ChannelMapping) => {
    setCurrentChannel(channel);
    
    // Auto-select unit based on progress
    const units = CURRICULUM[channel.category];
    const currentIdx = progress[channel.category];
    const unit = units[currentIdx] || units[0];
    setCurrentUnit(unit);
    
    setView('WATCH_AND_LEARN');
    setLunaMessage(`Look for these things while you watch ${channel.name}!`);
    
    // Fetch dynamic encouragement
    try {
      const msg = await getLunaEncouragement(channel.category, unit.theme);
      setLunaMessage(msg + " Can you spot these words in the video?");
    } catch(e) {
      console.log("Offline mode for Gemini");
    }
  };

  const finishLesson = () => {
    if (currentChannel) {
      setProgress(prev => ({
        ...prev,
        [currentChannel.category]: prev[currentChannel.category] + 1
      }));
    }
    setStars(prev => prev + 1);
    setView('HOME');
    setLunaMessage("Hoot hoot! You've earned a golden star! 🌟 You're doing amazing!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-200">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm py-3 px-6 flex justify-between items-center border-b-2 border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('HOME')}>
          <span className="text-3xl filter drop-shadow-md">🦉</span>
          <h1 className="text-2xl text-blue-600 brand-font hidden sm:block">Luna's Journey</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
            {(['3-7', '8-12'] as AgeGroup[]).map(age => (
              <button
                key={age}
                onClick={() => setAgeGroup(age)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  ageGroup === age ? 'bg-blue-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                Age {age}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1.5 rounded-2xl border-2 border-yellow-200">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-yellow-700">{stars}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 max-w-7xl">
        
        {view === 'HOME' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pt-8">
            <LunaCompanion message={lunaMessage} />
            
            <section className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl text-slate-800 brand-font">Pick a Show!</h2>
                <p className="text-slate-500 font-medium mt-2">Watch & Learn at the same time!</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {CHANNELS.filter(c => c.age_group === ageGroup).map(channel => (
                  <button
                    key={channel.channel_id}
                    onClick={() => selectChannel(channel)}
                    className="group bg-white p-4 rounded-[2rem] shadow-md hover:shadow-2xl border-4 border-white hover:border-blue-400 transition-all text-center flex flex-col items-center gap-3 bouncy ring-1 ring-slate-100"
                  >
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                      {channel.category === Category.DAILY_ROUTINES ? '🏠' : 
                       channel.category === Category.EARLY_LANGUAGE ? '🔤' : 
                       channel.category === Category.EXPLORATION ? '🚜' : '📚'}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors text-sm sm:text-base">{channel.name}</h3>
                      <div className="mt-2 bg-slate-100 text-[10px] text-slate-500 font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                        {channel.category.replace('_', ' ')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* SPLIT VIEW MODE: Video + Learning together */}
        {view === 'WATCH_AND_LEARN' && currentChannel && currentUnit && (
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)] lg:h-[calc(100vh-140px)] animate-in zoom-in duration-300">
            
            {/* Left Column: The Video */}
            <div className="w-full lg:w-2/3 flex flex-col gap-3">
              <div className="flex-1 bg-black rounded-3xl overflow-hidden shadow-2xl relative border-4 border-slate-800 min-h-[300px]">
                 {/* Using specific video ID for reliability */}
                 <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentChannel.featured_video_id || 'WRVsOCh907o'}?autoplay=1&modestbranding=1&rel=0&origin=${window.location.origin}`}
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-contain"
                ></iframe>
              </div>
              
              {/* Fallback & Controls */}
              <div className="flex justify-between items-center px-2">
                 <a 
                    href={`https://www.youtube.com/watch?v=${currentChannel.featured_video_id || 'WRVsOCh907o'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-red-500 font-medium flex items-center gap-1 transition-colors"
                >
                    <span>⚠️</span> Video not loading? Watch directly on YouTube
                </a>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-800">{currentChannel.name}</h3>
                  <p className="text-xs text-slate-400">Can you find the magic words?</p>
                </div>
                <button 
                  onClick={() => setView('QUIZ')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all text-sm transform hover:scale-105"
                >
                  I found them! Start Quiz →
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Companion */}
            <div className="w-full lg:w-1/3 bg-white rounded-[2rem] shadow-xl border-2 border-blue-100 flex flex-col overflow-hidden">
               <div className="bg-blue-50 p-6 border-b border-blue-100">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="text-3xl animate-bounce">🦉</div>
                   <div className="bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm border border-blue-100">
                     Luna's Challenge
                   </div>
                 </div>
                 <p className="text-slate-700 font-medium text-sm italic">
                   "{lunaMessage}"
                 </p>
               </div>
               
               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 custom-scrollbar">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-center mb-2">
                   Look for these:
                 </h4>
                 
                 {/* Mini Flashcards List */}
                 <div className="grid grid-cols-2 gap-3">
                   {currentUnit.flashcards.map((card, idx) => (
                     <div key={idx} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 hover:border-yellow-400 hover:shadow-md transition-all group cursor-pointer" onClick={() => {
                        if ('speechSynthesis' in window) {
                          const utterance = new SpeechSynthesisUtterance(card.word);
                          speechSynthesis.speak(utterance);
                        }
                     }}>
                       <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-slate-100">
                         <img src={card.imageHint} alt={card.word} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                       </div>
                       <p className="text-center font-bold text-slate-700 capitalize text-sm">{card.word}</p>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

          </div>
        )}

        {view === 'QUIZ' && currentUnit && (
          <div className="max-w-2xl mx-auto">
             <button 
                onClick={() => setView('WATCH_AND_LEARN')}
                className="mb-4 text-slate-400 hover:text-blue-500 font-bold text-sm flex items-center gap-1"
              >
                ← Back to Video
              </button>
            <QuestionViewer 
              questions={currentUnit.comprehensionQuestions} 
              theme={currentUnit.theme} 
              onComplete={finishLesson} 
            />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
