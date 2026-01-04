
import React, { useState } from 'react';
import { Player, Language } from '../types';

interface SetupProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  spyCount: number;
  setSpyCount: (count: number) => void;
  onStart: () => void;
  lang: Language;
}

const Setup: React.FC<SetupProps> = ({ players, setPlayers, spyCount, setSpyCount, onStart, lang }) => {
  const [newName, setNewName] = useState('');

  const t = {
    title: lang === Language.EN ? 'Enter Players' : 'نام بازیکنان را وارد کنید',
    placeholder: lang === Language.EN ? 'Player name...' : 'نام بازیکن...',
    add: lang === Language.EN ? 'Add' : 'افزودن',
    start: lang === Language.EN ? 'Start Game' : 'شروع بازی',
    minPlayers: lang === Language.EN ? 'Min 3 players required' : 'حداقل ۳ بازیکن نیاز است',
    emptyList: lang === Language.EN ? 'No players added yet.' : 'هنوز بازیکنی اضافه نشده است.',
    spyCountLabel: lang === Language.EN ? 'Number of Spies:' : 'تعداد جاسوس‌ها:',
  };

  const addPlayer = () => {
    if (newName.trim()) {
      setPlayers(prev => [
        ...prev,
        { id: Math.random().toString(36).substring(7), name: newName.trim(), isSpy: false, hasSeenRole: false }
      ]);
      setNewName('');
    }
  };

  const removePlayer = (id: string) => {
    setPlayers(prev => {
      const newList = prev.filter(p => p.id !== id);
      // Adjust spy count if it exceeds new player count limit
      if (newList.length > 0 && spyCount >= newList.length) {
        setSpyCount(Math.max(1, newList.length - 1));
      }
      return newList;
    });
  };

  const handleIncrementSpy = () => {
    if (spyCount < players.length - 1) {
      setSpyCount(spyCount + 1);
    }
  };

  const handleDecrementSpy = () => {
    if (spyCount > 1) {
      setSpyCount(spyCount - 1);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg text-slate-300 font-medium mb-2">{t.title}</h2>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
          placeholder={t.placeholder}
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
        />
        <button
          onClick={addPlayer}
          className="bg-red-600 hover:bg-red-500 text-white px-6 rounded-xl font-bold transition-colors"
        >
          {t.add}
        </button>
      </div>

      <div className="max-h-56 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {players.length === 0 ? (
          <p className="text-center text-slate-500 py-8">{t.emptyList}</p>
        ) : (
          players.map((player) => (
            <div 
              key={player.id} 
              className="flex justify-between items-center bg-slate-800/30 p-3 rounded-xl border border-slate-700/50 group"
            >
              <span className="font-medium text-slate-200">{player.name}</span>
              <button 
                onClick={() => removePlayer(player.id)}
                className="text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Spy Count Selector */}
      {players.length >= 3 && (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between">
          <span className="text-slate-300 font-medium">{t.spyCountLabel}</span>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleDecrementSpy}
              disabled={spyCount <= 1}
              className={`w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center transition-colors ${spyCount <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-700 active:scale-90'}`}
            >
              -
            </button>
            <span className="text-xl font-bold text-red-500 w-4 text-center">{spyCount}</span>
            <button 
              onClick={handleIncrementSpy}
              disabled={spyCount >= players.length - 1}
              className={`w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center transition-colors ${spyCount >= players.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-700 active:scale-90'}`}
            >
              +
            </button>
          </div>
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={onStart}
          disabled={players.length < 3}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-red-900/10 ${
            players.length < 3 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
              : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white transform hover:-translate-y-1 active:scale-95'
          }`}
        >
          {t.start}
        </button>
        {players.length < 3 && (
          <p className="text-center text-xs text-red-500/70 mt-3 font-medium">
            {t.minPlayers}
          </p>
        )}
      </div>
    </div>
  );
};

export default Setup;
