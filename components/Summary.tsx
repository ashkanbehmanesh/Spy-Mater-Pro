
import React from 'react';
import { Player, Language } from '../types';

interface SummaryProps {
  players: Player[];
  onReset: () => void;
  lang: Language;
}

const Summary: React.FC<SummaryProps> = ({ players, onReset, lang }) => {
  const spies = players.filter(p => p.isSpy);

  const t = {
    gameOver: lang === Language.EN ? 'Game Over!' : 'بازی تمام شد!',
    spyWas: lang === Language.EN 
      ? (spies.length > 1 ? 'The Spies Were:' : 'The Spy Was:') 
      : (spies.length > 1 ? 'جاسوس‌ها این‌ها بودند:' : 'جاسوس این بود:'),
    congrats: lang === Language.EN ? 'Did you find them?' : 'آیا توانستید آن‌ها را پیدا کنید؟',
    playAgain: lang === Language.EN ? 'Play Again' : 'بازی مجدد',
    otherPlayers: lang === Language.EN ? 'Other Players:' : 'سایر بازیکنان:',
  };

  return (
    <div className="flex flex-col items-center text-center py-6 space-y-8 animate-in zoom-in duration-500">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-red-600">{t.gameOver}</h2>
        <p className="text-slate-400 font-medium">{t.congrats}</p>
      </div>

      <div className="w-full bg-slate-800/40 border border-slate-700 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">{t.spyWas}</p>
        <div className="space-y-2">
          {spies.map(spy => (
            <div key={spy.id} className="text-4xl font-black text-white">{spy.name}</div>
          ))}
        </div>
        <div className="inline-block mt-4 bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter">
          {lang === Language.EN ? 'CLASSIFIED' : 'محرمانه'}
        </div>
      </div>

      <div className="w-full text-left">
        <p className="text-slate-500 text-xs font-bold uppercase mb-3 ml-2">{t.otherPlayers}</p>
        <div className="grid grid-cols-2 gap-2">
          {players.filter(p => !p.isSpy).map(p => (
            <div key={p.id} className="bg-slate-800/20 border border-slate-800 p-3 rounded-xl text-slate-300 text-sm font-medium">
              {p.name}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl font-bold text-xl hover:from-red-500 hover:to-orange-500 transition-all transform hover:-translate-y-1 shadow-2xl shadow-red-900/40"
      >
        {t.playAgain}
      </button>
    </div>
  );
};

export default Summary;
