
import React, { useState } from 'react';
import { Player, Language } from '../types';

interface VotingViewProps {
  players: Player[];
  onVote: (targetId: string) => void;
  onReveal: () => void;
  lang: Language;
  isHost: boolean;
  myId?: string;
  isOnline: boolean;
}

const VotingView: React.FC<VotingViewProps> = ({ players, onVote, onReveal, lang, isHost, myId, isOnline }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const me = players.find(p => p.id === myId);
  const alreadyVoted = isOnline && me?.votedForId !== undefined;
  
  const t = {
    title: lang === Language.EN ? 'Voting Phase' : 'مرحله رای‌گیری',
    subtitle: lang === Language.EN ? 'Who is the Spy?' : 'جاسوس کیست؟',
    localSubtitle: lang === Language.EN ? 'Discuss and select the suspect' : 'بحث کنید و فرد مشکوک را انتخاب کنید',
    submitVote: lang === Language.EN ? 'Submit Vote' : 'ثبت رای',
    accuse: lang === Language.EN ? 'Accuse' : 'متهم کردن',
    reveal: lang === Language.EN ? 'Reveal Results' : 'نمایش نتایج',
    waiting: lang === Language.EN ? 'Waiting for votes...' : 'در انتظار رای‌ها...',
    votedCount: lang === Language.EN ? 'Votes cast:' : 'رای‌های ثبت شده:',
  };

  const voteCount = players.filter(p => p.votedForId !== undefined).length;
  const allVoted = voteCount === players.length;

  return (
    <div className="flex flex-col items-center py-4 space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">{t.title}</h2>
        <p className="text-slate-400 text-xs">{isOnline ? t.subtitle : t.localSubtitle}</p>
      </div>

      <div className="w-full grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
        {players.map((player) => {
          const isSelected = selectedId === player.id;
          const isSelf = player.id === myId;
          
          return (
            <button
              key={player.id}
              disabled={alreadyVoted || (isOnline && isSelf)}
              onClick={() => setSelectedId(player.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex justify-between items-center group
                ${isSelected ? 'border-red-600 bg-red-600/10' : 'border-slate-800 bg-slate-800/30 hover:border-slate-700'}
                ${(alreadyVoted || (isOnline && isSelf)) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span className={`font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{player.name} {isSelf && '(YOU)'}</span>
              {isSelected && <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>}
            </button>
          );
        })}
      </div>

      <div className="w-full space-y-4">
        {isOnline ? (
          <>
            {!alreadyVoted ? (
              <button
                disabled={!selectedId}
                onClick={() => selectedId && onVote(selectedId)}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold disabled:opacity-50 shadow-lg"
              >
                {t.submitVote}
              </button>
            ) : (
              <div className="text-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700 animate-pulse">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t.waiting}</p>
                <p className="text-white text-lg font-black">{voteCount} / {players.length}</p>
              </div>
            )}
            
            {isHost && (
              <button
                onClick={onReveal}
                className={`w-full py-4 rounded-2xl font-bold transition-all border-2
                  ${allVoted ? 'bg-white text-slate-900 border-white' : 'bg-transparent text-slate-500 border-slate-800'}
                `}
              >
                {t.reveal}
              </button>
            )}
          </>
        ) : (
          <button
            disabled={!selectedId}
            onClick={() => selectedId && onVote(selectedId)}
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold disabled:opacity-50 shadow-lg"
          >
            {t.accuse}
          </button>
        )}
      </div>
    </div>
  );
};

export default VotingView;
