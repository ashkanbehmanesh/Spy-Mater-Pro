
import React from 'react';
import { Player, Language } from '../types';

interface SummaryProps {
  players: Player[];
  onReset: () => void;
  lang: Language;
  isHost?: boolean;
}

const Summary: React.FC<SummaryProps> = ({ players, onReset, lang, isHost }) => {
  const spies = players.filter(p => p.isSpy);

  const t = {
    gameOver: lang === Language.EN ? 'Game Over!' : 'بازی تمام شد!',
    spyWas: lang === Language.EN 
      ? (spies.length > 1 ? 'The Spies Were:' : 'The Spy Was:') 
      : (spies.length > 1 ? 'جاسوس‌ها این‌ها بودند:' : 'جاسوس این بود:'),
    congrats: lang === Language.EN ? 'Did you find them?' : 'آیا توانستید آن‌ها را پیدا کنید؟',
    playAgain: lang === Language.EN ? 'New Game' : 'بازی مجدد',
    otherPlayers: lang === Language.EN ? 'Other Players:' : 'سایر بازیکنان:',
    waiting: lang === Language.EN ? 'Waiting for host to restart...' : 'در انتظار شروع مجدد توسط میزبان...',
  };

  return (
    <div className="flex flex-col items-center text-center py-4 space-y-6 animate-in zoom-in duration-500">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-red-600 uppercase tracking-tighter">{t.gameOver}</h2>
        <p className="text-slate-400 text-xs font-medium">{t.congrats}</p>
      </div>

      <div className="w-full bg-slate-800/40 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
        <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-3">{t.spyWas}</p>
        <div className="space-y-1">
          {spies.map(spy => (
            <div key={spy.id} className="text-2xl font-black text-white">{spy.name}</div>
          ))}
        </div>
      </div>

      <div className="w-full text-left">
        <p className="text-slate-500 text-[8px] font-bold uppercase mb-2 ml-1">{t.otherPlayers}</p>
        <div className="grid grid-cols-2 gap-2">
          {players.filter(p => !p.isSpy).map(p => (
            <div key={p.id} className="bg-slate-800/20 border border-slate-800 p-2 rounded-xl text-slate-300 text-xs font-medium truncate">
              {p.name}
            </div>
          ))}
        </div>
      </div>

      {isHost ? (
        <button
          onClick={onReset}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl font-bold text-lg hover:from-red-500 shadow-xl"
        >
          {t.playAgain}
        </button>
      ) : (
        <p className="text-slate-500 text-xs italic">{t.waiting}</p>
      )}
    </div>
  );
};

export default Summary;
