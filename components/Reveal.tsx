
import React, { useState } from 'react';
import { Player, WordPair, Language } from '../types';

interface RevealProps {
  player: Player;
  word: WordPair;
  onNext: () => void;
  lang: Language;
  isMultiplayer?: boolean;
}

const Reveal: React.FC<RevealProps> = ({ player, word, onNext, lang, isMultiplayer }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const t = {
    turn: isMultiplayer ? player.name : (lang === Language.EN ? `Turn: ${player.name}` : `نوبت: ${player.name}`),
    tapToSee: lang === Language.EN ? 'Tap to see your role' : 'برای مشاهده نقش خود ضربه بزنید',
    iSaw: lang === Language.EN ? "I'm Ready" : 'آماده هستم',
    spy: lang === Language.EN ? 'YOU ARE THE SPY!' : 'شما جاسوس هستید!',
    yourWord: lang === Language.EN ? 'Your word is:' : 'کلمه شما این است:',
    caution: lang === Language.EN ? 'Make sure no one is watching!' : 'مطمئن شوید کسی به گوشی شما نگاه نمی‌کند!',
    waiting: lang === Language.EN ? 'Waiting for others...' : 'در انتظار بقیه بازیکنان...',
  };

  const handleReveal = () => setIsRevealed(true);
  
  const handleNext = () => {
    onNext();
  };

  // In multiplayer, if the server says we've already ready'd up, show waiting state
  const showWaiting = isMultiplayer && player.hasSeenRole;
  const isCardRevealed = isRevealed || showWaiting;

  return (
    <div className="flex flex-col items-center text-center py-4 space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">{t.turn}</h2>
        <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{t.caution}</p>
      </div>

      <div className="w-full aspect-square max-w-[280px] perspective-1000 relative">
        <div 
          onClick={!isCardRevealed ? handleReveal : undefined}
          className={`w-full h-full transition-all duration-700 transform-style-3d relative rounded-3xl ${
            isCardRevealed ? 'rotate-y-180 scale-105' : 'hover:scale-102 bg-slate-800'
          }`}
        >
          {/* Front (Hidden) */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden ${isCardRevealed ? 'hidden' : 'flex'}`}>
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <p className="text-slate-400 font-medium text-sm">{t.tapToSee}</p>
          </div>

          {/* Back (Revealed) */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-100 rounded-3xl rotate-y-180 backface-hidden shadow-inner ${!isCardRevealed ? 'hidden' : 'flex'}`}>
            {player.isSpy ? (
              <div className="text-red-600">
                <div className="text-4xl mb-4">🕵️‍♂️</div>
                <h3 className="text-2xl font-black">{t.spy}</h3>
              </div>
            ) : (
              <div className="text-slate-900">
                <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">{t.yourWord}</p>
                <h3 className="text-3xl font-black tracking-tight">{lang === Language.EN ? word.en : word.fa}</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      {!showWaiting ? (
        <div className={`w-full transition-all duration-300 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <button
            onClick={handleNext}
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-500 shadow-xl"
          >
            {t.iSaw}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 animate-pulse">
           <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{t.waiting}</p>
        </div>
      )}

      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

export default Reveal;
