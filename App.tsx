
import React, { useState, useEffect } from 'react';
import { Category, AgeGroup, Unit, ChannelMapping, Language } from './types.ts';
import { CHANNELS, CURRICULUM, UI_STRINGS } from './data.ts';
import { LunaCompanion } from './components/LunaCompanion.tsx';
import { FlashcardViewer } from './components/FlashcardViewer.tsx';
import { QuestionViewer } from './components/QuestionViewer.tsx';
import { getLunaWordStory, getLunaEncouragement } from './services/gemini.ts';

const App: React.FC = () => {
  const [view, setView] = useState<'HOME' | 'PREVIEW' | 'WATCH' | 'QUIZ'>('HOME');
  const [lang, setLang] = useState<Language>('en');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('3-7');
  const [currentChannel, setCurrentChannel] = useState<ChannelMapping | null>(null);
  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
  const [lunaMessage, setLunaMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState(0);

  const strings = UI_STRINGS[lang];

  useEffect(() => {
    setLunaMessage(strings.welcome);
  }, [lang]);

  const selectChannel = async (channel: ChannelMapping) => {
    setIsLoading(true);
    setCurrentChannel(channel);
    const unit = CURRICULUM[channel.category]?.[0] || CURRICULUM[Category.DAILY_ROUTINES][0];
    setCurrentUnit(unit);
    
    const story = await getLunaWordStory(unit.theme, unit.targetWords, lang);
    setLunaMessage(story);
    setIsLoading(false);
    setView('PREVIEW');
  };

  const startWatching = () => setView('WATCH');
  
  const finishLesson = () => {
    setStars(prev => prev + 5);
    setView('HOME');
    setLunaMessage(lang === 'ar' ? "رائع! لقد حصلت على 5 نجوم ذهبية! 🌟" : "Whoo! You earned 5 golden stars! 🌟");
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#FDFCF0] font-['Quicksand'] ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      <header className="bg-white/80 backdrop-blur-md py-4 px-8 flex justify-between items-center sticky top-0 z-50 border-b border-yellow-100">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('HOME')}>
          <span className="text-4xl animate-pulse">🦉</span>
          <h1 className="text-2xl font-bold text-blue-500 hidden sm:block">Luna's Journey</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-2xl border-2 border-yellow-200">
            <span className="text-xl">⭐</span>
            <span className="font-bold text-yellow-700">{stars}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {view === 'HOME' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <LunaCompanion message={lunaMessage} isThinking={isLoading} />
            
            <section className="text-center space-y-8">
              <div className="inline-flex bg-white p-2 rounded-full shadow-inner border border-slate-100">
                {(['3-7', '8-12'] as AgeGroup[]).map(age => (
                  <button
                    key={age}
                    onClick={() => setAgeGroup(age)}
                    className={`px-8 py-2 rounded-full font-bold transition-all ${
                      ageGroup === age ? 'bg-blue-500 text-white shadow-lg scale-105' : 'text-slate-400'
                    }`}
                  >
                    Age {age}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {CHANNELS.filter(c => c.age_group === ageGroup).map(channel => (
                  <button
                    key={channel.channel_id}
                    onClick={() => selectChannel(channel)}
                    className="group bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all border-4 border-transparent hover:border-blue-300 flex flex-col items-center gap-4"
                  >
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-5xl group-hover:rotate-12 transition-transform shadow-inner">
                      {channel.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">{channel.name}</h3>
                    <div className="bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-500 font-bold uppercase">
                      {channel.category.replace('_', ' ')}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {view === 'PREVIEW' && currentUnit && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in duration-500">
            <LunaCompanion 
              message={lunaMessage} 
              onAction={startWatching} 
              actionLabel={lang === 'en' ? "Let's Watch! ▶️" : "لنبدأ المشاهدة! ▶️"}
            />
            <div className="grid grid-cols-3 gap-4">
              {currentUnit.flashcards.map((card, i) => (
                <div key={i} className="bg-white p-4 rounded-3xl shadow-md border-2 border-blue-50 text-center">
                  <img src={card.imageHint} className="w-full h-32 object-cover rounded-2xl mb-2" />
                  <p className="font-bold text-slate-700">{lang === 'ar' ? card.wordAr : card.word}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'WATCH' && currentChannel && currentUnit && (
          <div className="flex flex-col lg:flex-row gap-8 h-full">
            <div className="flex-1 space-y-4">
              <div className="aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentChannel.featured_video_id}?autoplay=1`}
                  allowFullScreen
                ></iframe>
              </div>
              <button 
                onClick={() => setView('QUIZ')}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-5 rounded-[2rem] shadow-xl text-xl animate-bounce"
              >
                {strings.ready}
              </button>
            </div>
            
            <div className="w-full lg:w-80 bg-white rounded-[3rem] p-6 shadow-xl border-2 border-blue-50 overflow-y-auto max-h-[60vh] lg:max-h-none">
              <h4 className="font-bold text-blue-500 mb-4 text-center">Spot these! 🔍</h4>
              <div className="space-y-4">
                {currentUnit.flashcards.map((card, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <img src={card.imageHint} className="w-12 h-12 rounded-lg object-cover" />
                    <span className="font-bold text-slate-600 capitalize">{lang === 'ar' ? card.wordAr : card.word}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'QUIZ' && currentUnit && (
          <QuestionViewer questions={currentUnit.comprehensionQuestions} theme={currentUnit.theme} onComplete={finishLesson} />
        )}
      </main>

      <footer className="py-6 text-center text-slate-400 text-xs">
        © {new Date().getFullYear()} Luna's Montessori Journey - Professional Education
      </footer>
    </div>
  );
};

export default App;
