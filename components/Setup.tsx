
import React, { useState } from 'react';
import { Player, Language, GameMode } from '../types';

interface SetupProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  spyCount: number;
  setSpyCount: (count: number) => void;
  onStart: () => void;
  lang: Language;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  peerId: string;
  isHost: boolean;
  isConnecting: boolean;
  onCreateRoom: (name: string) => void;
  onJoinRoom: (roomId: string, name: string) => void;
}

const Setup: React.FC<SetupProps> = ({ 
  players, setPlayers, spyCount, setSpyCount, onStart, lang, 
  gameMode, setGameMode, peerId, isHost, isConnecting, onCreateRoom, onJoinRoom 
}) => {
  const [newName, setNewName] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [hasLobbyStarted, setHasLobbyStarted] = useState(false);

  const t = {
    local: lang === Language.EN ? 'Local Party' : 'بازی حضوری',
    online: lang === Language.EN ? 'Online Room' : 'اتاق آنلاین',
    create: lang === Language.EN ? 'Create Room' : 'ساخت اتاق',
    join: lang === Language.EN ? 'Join Room' : 'ورود به اتاق',
    placeholder: lang === Language.EN ? 'Your Name...' : 'نام شما...',
    roomPlaceholder: lang === Language.EN ? 'Room ID (6 chars)...' : 'کد اتاق (۶ رقم)...',
    add: lang === Language.EN ? 'Add' : 'افزودن',
    start: lang === Language.EN ? 'Start Game' : 'شروع بازی',
    emptyList: lang === Language.EN ? 'Waiting for players...' : 'در انتظار بازیکنان...',
    spyCountLabel: lang === Language.EN ? 'Number of Spies:' : 'تعداد جاسوس‌ها:',
    roomIdLabel: lang === Language.EN ? 'Room Code (Share this):' : 'کد اتاق (ارسال برای دوستان):',
    connecting: lang === Language.EN ? 'Connecting...' : 'در حال اتصال...',
  };

  const addLocalPlayer = () => {
    if (newName.trim()) {
      setPlayers(prev => [
        ...prev,
        { id: Math.random().toString(36).substring(7), name: newName.trim(), isSpy: false, hasSeenRole: false }
      ]);
      setNewName('');
    }
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    onCreateRoom(newName.trim());
    setHasLobbyStarted(true);
  };

  const handleJoin = () => {
    if (!newName.trim() || joinRoomId.length !== 6) return;
    onJoinRoom(joinRoomId.trim().toUpperCase(), newName.trim());
    setHasLobbyStarted(true);
  };

  const removePlayer = (id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      {!hasLobbyStarted && (
        <div className="flex bg-slate-800/50 p-1 rounded-2xl border border-slate-700">
          <button 
            onClick={() => setGameMode(GameMode.LOCAL)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${gameMode === GameMode.LOCAL ? 'bg-red-600 text-white' : 'text-slate-500'}`}
          >
            {t.local}
          </button>
          <button 
            onClick={() => setGameMode(GameMode.ONLINE)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${gameMode === GameMode.ONLINE ? 'bg-red-600 text-white' : 'text-slate-500'}`}
          >
            {t.online}
          </button>
        </div>
      )}

      {/* Online/Local Specific Inputs */}
      {!hasLobbyStarted && (
        <div className="space-y-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t.placeholder}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
          />
          
          {gameMode === GameMode.LOCAL ? (
            <button onClick={addLocalPlayer} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold">{t.add}</button>
          ) : (
            <div className="space-y-3">
              <button 
                onClick={handleCreate} 
                disabled={isConnecting}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-bold disabled:opacity-50"
              >
                {isConnecting ? t.connecting : t.create}
              </button>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())}
                  placeholder={t.roomPlaceholder}
                  className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-orange-500/50 uppercase font-mono tracking-widest"
                />
                <button 
                  onClick={handleJoin}
                  disabled={isConnecting} 
                  className="bg-orange-600 text-white px-6 rounded-xl font-bold text-xs disabled:opacity-50"
                >
                  {isConnecting ? '...' : t.join}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Room Code Display for Online Host */}
      {gameMode === GameMode.ONLINE && isHost && peerId && (
        <div className="bg-slate-800/30 border border-orange-500/20 p-4 rounded-2xl text-center">
          <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-1">{t.roomIdLabel}</p>
          <p className="text-3xl font-black text-white tracking-[0.2em] font-mono">{peerId}</p>
        </div>
      )}

      {/* Lobby Player List */}
      <div className="max-h-56 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {players.length === 0 ? (
          <p className="text-center text-slate-500 py-8 animate-pulse">{t.emptyList}</p>
        ) : (
          players.map((player) => (
            <div 
              key={player.id} 
              className={`flex justify-between items-center bg-slate-800/30 p-3 rounded-xl border ${player.isMe ? 'border-red-500/50' : 'border-slate-700/50'}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-200">{player.name}</span>
                {player.isHost && <span className="text-[8px] bg-orange-500/20 text-orange-500 px-1.5 py-0.5 rounded font-bold">HOST</span>}
                {player.isMe && <span className="text-[8px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded font-bold">YOU</span>}
              </div>
              {(gameMode === GameMode.LOCAL || isHost) && !player.isMe && (
                <button onClick={() => removePlayer(player.id)} className="text-slate-500 hover:text-red-400 p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Game Settings & Start Button */}
      {(gameMode === GameMode.LOCAL || isHost) && players.length >= 3 && (
        <div className="space-y-4 pt-2">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-slate-300 text-xs font-medium">{t.spyCountLabel}</span>
            <div className="flex items-center gap-4">
              <button onClick={() => spyCount > 1 && setSpyCount(spyCount - 1)} className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center">-</button>
              <span className="text-xl font-bold text-red-500">{spyCount}</span>
              <button onClick={() => spyCount < players.length - 1 && setSpyCount(spyCount + 1)} className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center">+</button>
            </div>
          </div>
          <button
            onClick={onStart}
            className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-xl active:scale-95 transition-all"
          >
            {t.start}
          </button>
        </div>
      )}

      {/* Waiting Message for Clients */}
      {gameMode === GameMode.ONLINE && !isHost && hasLobbyStarted && (
        <div className="text-center py-4 animate-pulse">
           <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">{lang === Language.EN ? 'Waiting for host to start...' : 'در انتظار شروع توسط مدیر...'}</p>
        </div>
      )}
    </div>
  );
};

export default Setup;
