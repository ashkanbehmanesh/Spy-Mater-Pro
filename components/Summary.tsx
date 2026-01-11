
import React, { useMemo } from 'react';
import { Player, Language } from '../types';

interface SummaryProps {
  players: Player[];
  onReset: () => void;
  lang: Language;
  isHost?: boolean;
}

const Summary: React.FC<SummaryProps> = ({ players, onReset, lang, isHost }) => {
  const result = useMemo(() => {
    const voteTallies: Record<string, number> = {};
    players.forEach(p => {
      if (p.votedForId) {
        voteTallies[p.votedForId] = (voteTallies[p.votedForId] || 0) + 1;
      }
    });

    let suspectId = '';
    let maxVotes = 0;
    Object.entries(voteTallies).forEach(([id, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        suspectId = id;
      }
    });

    const suspect = players.find(p => p.id === suspectId);
    const won = suspect?.isSpy === true;
    
    return { suspect, won, hasConsensus: maxVotes > 0 };
  }, [players]);

  const spies = players.filter(p => p.isSpy);

  const t = {
    victory: lang === Language.EN ? 'CITIZENS WON!' : 'شهروندان پیروز شدند!',
    defeat: lang === Language.EN ? 'SPY WON!' : 'جاسوس پیروز شد!',
    troll: 'hehehehehehehe!',
    spyWas: lang === Language.EN ? 'THE REAL SPY' : 'جاسوس واقعی',
    suspected: lang === Language.EN ? 'THE SUSPECT' : 'فرد متهم شده',
    noConsensus: lang === Language.EN ? 'NO MAJORITY VOTE' : 'بدون توافق آرا',
    playAgain: lang === Language.EN ? 'START NEW GAME' : 'شروع بازی جدید',
    waiting: lang === Language.EN ? 'WAITING FOR HOST...' : 'در انتظار مدیر...',
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-colors duration-1000 ${result.won ? 'bg-green-700' : 'bg-red-800'}`}>
      {/* 90% Height Container with 5% Vertical Margins */}
      <div className="w-full max-w-lg h-[90vh] flex flex-col bg-black/30 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in fade-in duration-500">
        
        {/* Header Section */}
        <div className={`p-8 text-center border-b border-white/5 ${result.won ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-lg mb-2">
            {result.won ? t.victory : t.defeat}
          </h2>
          {!result.won && (
            <p className="text-white/80 font-mono text-lg italic tracking-[0.2em] animate-pulse">
              {t.troll}
            </p>
          )}
        </div>

        {/* Scrollable Results Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12">
          
          {/* Suspect Section */}
          <div className="space-y-4 animate-in slide-in-from-bottom-10 delay-200 duration-700">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10"></div>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
                {t.suspected}
              </p>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            <div className="text-center py-4">
              {result.hasConsensus ? (
                <div className="space-y-2">
                  <p className="text-5xl font-black text-white">
                    {result.suspect?.name}
                  </p>
                  <p className={`text-xs font-bold uppercase ${result.won ? 'text-green-400' : 'text-red-400'}`}>
                    {result.won ? (lang === Language.EN ? 'Correct Guess!' : 'حدس درست!') : (lang === Language.EN ? 'Innocent!' : 'بی‌گناه!')}
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-bold text-white/30 italic">
                  {t.noConsensus}
                </p>
              )}
            </div>
          </div>

          {/* Real Spies Section */}
          <div className="space-y-4 animate-in slide-in-from-bottom-10 delay-500 duration-700">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10"></div>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
                {t.spyWas}
              </p>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            <div className="space-y-6 text-center">
              {spies.map(spy => (
                <div key={spy.id} className="relative group p-6 bg-white/5 rounded-3xl border border-white/5">
                   <p className="text-5xl font-black text-white mb-2">
                     {spy.name}
                   </p>
                   <span className="inline-block px-4 py-1.5 bg-red-600/40 text-red-100 text-[10px] font-black rounded-full border border-red-500/30 tracking-widest">
                     SPY IDENTITY
                   </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button Section - Fixed at Bottom of Card */}
        <div className="p-8 border-t border-white/5 bg-black/20">
          {isHost ? (
            <button
              onClick={onReset}
              className="w-full py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
            >
              {t.playAgain}
            </button>
          ) : (
            <div className="text-center p-6 bg-white/5 rounded-3xl border border-white/5">
              <p className="text-white/50 text-sm font-black animate-pulse tracking-widest">
                {t.waiting}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Summary;
