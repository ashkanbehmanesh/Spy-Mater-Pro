
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Peer } from 'peerjs';
import { Player, GameState, Language, WordPair, GameMode, PeerMessage } from './types';
import { WORD_LIST, GAME_DURATION } from './constants';
import Setup from './components/Setup';
import Reveal from './components/Reveal';
import GameView from './components/GameView';
import Summary from './components/Summary';
import About from './components/About';

const shuffleArray = <T extends object>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'HOME' | 'ABOUT'>('HOME');
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.LOCAL);
  const [gameState, setGameState] = useState<GameState>(GameState.SETUP);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [players, setPlayers] = useState<Player[]>([]);
  const [spyCount, setSpyCount] = useState(1);
  const [currentWord, setCurrentWord] = useState<WordPair | null>(null);
  const [revealingPlayerIndex, setRevealingPlayerIndex] = useState(0);

  // Networking State
  const [peerId, setPeerId] = useState<string>('');
  const [isHost, setIsHost] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const peerRef = useRef<Peer | null>(null);
  const connectionsRef = useRef<any[]>([]);

  const isRtl = language === Language.FA;

  const broadcast = useCallback((message: PeerMessage) => {
    connectionsRef.current.forEach(conn => {
      if (conn.open) conn.send(message);
    });
  }, []);

  const initHost = useCallback((name: string) => {
    setIsConnecting(true);
    const id = generateRoomId();
    const peer = new Peer(id);
    peerRef.current = peer;

    peer.on('open', (assignedId) => {
      setPeerId(assignedId);
      setIsHost(true);
      setIsConnecting(false);
      setPlayers([{ id: assignedId, name, isSpy: false, hasSeenRole: false, isHost: true, isMe: true }]);
    });

    peer.on('connection', (conn) => {
      connectionsRef.current.push(conn);
      conn.on('data', (data: any) => {
        const msg = data as PeerMessage;
        if (msg.type === 'PLAYER_JOINED') {
          setPlayers(prev => {
            const existingIdx = prev.findIndex(p => p.id === msg.payload.id);
            let newList;
            if (existingIdx !== -1) {
              newList = [...prev];
              newList[existingIdx] = { ...newList[existingIdx], ...msg.payload };
            } else {
              newList = [...prev, msg.payload];
            }
            broadcast({ type: 'SYNC_PLAYERS', payload: newList });
            return newList;
          });
        }
      });
      conn.on('open', () => {
        setPlayers(prev => {
          conn.send({ type: 'SYNC_PLAYERS', payload: prev });
          return prev;
        });
      });
    });

    peer.on('disconnected', () => {
      setIsReconnecting(true);
      peer.reconnect();
    });

    peer.on('open', () => setIsReconnecting(false));

    peer.on('error', (err) => {
      console.error('Peer error:', err);
      setIsConnecting(false);
      if (err.type === 'lost-connection') {
         peer.reconnect();
      } else {
        alert(language === Language.EN ? 'Connection error. Try again.' : 'خطا در اتصال. دوباره تلاش کنید.');
        peer.destroy();
        peerRef.current = null;
      }
    });
  }, [broadcast, language]);

  const joinRoom = useCallback((targetRoomId: string, myName: string) => {
    setIsConnecting(true);
    const peer = new Peer();
    peerRef.current = peer;

    peer.on('open', (myPeerId) => {
      const conn = peer.connect(targetRoomId.toUpperCase());
      
      conn.on('open', () => {
        setIsConnecting(false);
        setIsHost(false);
        setPeerId(targetRoomId.toUpperCase());
        const me: Player = { id: myPeerId, name: myName, isSpy: false, hasSeenRole: false, isMe: true };
        conn.send({ type: 'PLAYER_JOINED', payload: me });
        setPlayers([me]);
      });

      conn.on('data', (data: any) => {
        const msg = data as PeerMessage;
        if (msg.type === 'SYNC_PLAYERS') setPlayers(msg.payload);
        if (msg.type === 'START_GAME') {
          setPlayers(msg.payload.players);
          setCurrentWord(msg.payload.word);
          setGameState(GameState.REVEAL);
        }
        if (msg.type === 'STATE_UPDATE') {
          if (msg.payload.gameState) setGameState(msg.payload.gameState);
        }
      });

      conn.on('error', (err) => {
        console.error('Connection error:', err);
        setIsConnecting(false);
        alert(language === Language.EN ? 'Could not join room.' : 'ورود به اتاق ناموفق بود.');
      });
    });

    peer.on('disconnected', () => {
      setIsReconnecting(true);
      peer.reconnect();
    });

    peer.on('open', () => setIsReconnecting(false));

    peer.on('error', (err) => {
      console.error('Peer error:', err);
      setIsConnecting(false);
      if (err.type === 'lost-connection') {
        peer.reconnect();
      }
    });
  }, [language]);

  const startGame = useCallback(() => {
    if (players.length < 3) return;
    const shuffledPlayers = shuffleArray(players);
    const validSpyCount = Math.max(1, Math.min(spyCount, players.length - 1));
    const spyIndices = new Set<number>();
    while (spyIndices.size < validSpyCount) {
      spyIndices.add(Math.floor(Math.random() * shuffledPlayers.length));
    }
    const updatedPlayers = shuffledPlayers.map((p, idx) => ({
      ...p,
      isSpy: spyIndices.has(idx),
      hasSeenRole: false,
    }));
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setPlayers(updatedPlayers);
    setCurrentWord(randomWord);
    setRevealingPlayerIndex(0);
    setGameState(GameState.REVEAL);
    if (gameMode === GameMode.ONLINE && isHost) {
      broadcast({ 
        type: 'START_GAME', 
        payload: { players: updatedPlayers, word: randomWord } 
      });
    }
  }, [players, spyCount, gameMode, isHost, broadcast]);

  const handleRevealNext = useCallback(() => {
    if (gameMode === GameMode.ONLINE) {
      const myId = peerRef.current?.id;
      setPlayers(prev => {
        const newList = prev.map(p => p.id === myId ? { ...p, hasSeenRole: true } : p);
        const meUpdated = newList.find(p => p.id === myId);
        if (meUpdated) {
          if (isHost) {
            broadcast({ type: 'SYNC_PLAYERS', payload: newList });
          } else {
            broadcast({ type: 'PLAYER_JOINED', payload: meUpdated });
          }
        }
        return newList;
      });
    } else {
      setPlayers(prev => {
        const newList = [...prev];
        newList[revealingPlayerIndex].hasSeenRole = true;
        return newList;
      });
      
      // Delay transition to next player slightly if needed, but local logic requires button push
      // The button push happens in Reveal.tsx which calls handleRevealNext.
      // To hide for the NEXT player, we use the key trick in render.
      if (revealingPlayerIndex < players.length - 1) {
        setRevealingPlayerIndex(revealingPlayerIndex + 1);
      } else {
        setGameState(GameState.PLAYING);
      }
    }
  }, [players, revealingPlayerIndex, gameMode, isHost, broadcast]);

  // Host transition check: Start timer when everyone is ready
  useEffect(() => {
    if (isHost && gameState === GameState.REVEAL && players.length > 0) {
      const allReady = players.every(p => p.hasSeenRole);
      if (allReady) {
        setGameState(GameState.PLAYING);
        broadcast({ type: 'STATE_UPDATE', payload: { gameState: GameState.PLAYING } });
      }
    }
  }, [players, isHost, gameState, broadcast]);

  const resetGame = useCallback(() => {
    setGameState(GameState.SETUP);
    setCurrentWord(null);
    setRevealingPlayerIndex(0);
    setPlayers(prev => prev.map(p => ({ ...p, hasSeenRole: false, isSpy: false })));
    if (isHost) broadcast({ type: 'STATE_UPDATE', payload: { gameState: GameState.SETUP } });
  }, [isHost, broadcast]);

  const finishGame = useCallback(() => {
    setGameState(GameState.SUMMARY);
    if (isHost) broadcast({ type: 'STATE_UPDATE', payload: { gameState: GameState.SUMMARY } });
  }, [isHost, broadcast]);

  useEffect(() => {
    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
        connectionsRef.current = [];
      }
    };
  }, [gameMode]);

  const navLabels = {
    home: language === Language.EN ? 'Home' : 'خانه',
    about: language === Language.EN ? 'About' : 'درباره بازی',
  };

  const myId = peerRef.current?.id;
  const me = gameMode === GameMode.ONLINE 
    ? players.find(p => p.id === myId)
    : players[revealingPlayerIndex];

  return (
    <div className={`min-h-screen no-select flex flex-col items-center p-4 pb-28 transition-colors duration-500 ${isRtl ? 'rtl text-right' : ''}`}>
      {isReconnecting && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-bold animate-pulse shadow-lg">
          {language === Language.EN ? 'Reconnecting to server...' : 'در حال اتصال مجدد به سرور...'}
        </div>
      )}

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-4">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            {language === Language.EN ? 'SPYMASTER PRO' : 'استاد جاسوس'}
          </h1>
          <button 
            onClick={() => setLanguage(l => l === Language.EN ? Language.FA : Language.EN)}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-full border border-slate-700 transition-colors"
          >
            {language === Language.EN ? 'FA 🇮🇷' : 'EN 🇺🇸'}
          </button>
        </div>

        {/* Content Area */}
        <main className="p-6">
          {activeTab === 'ABOUT' ? (
            <About lang={language} />
          ) : (
            <>
              {gameState === GameState.SETUP && (
                <Setup 
                  players={players} 
                  setPlayers={setPlayers} 
                  spyCount={spyCount}
                  setSpyCount={setSpyCount}
                  onStart={startGame} 
                  lang={language}
                  gameMode={gameMode}
                  setGameMode={setGameMode}
                  peerId={peerId}
                  isHost={isHost}
                  isConnecting={isConnecting}
                  onCreateRoom={initHost}
                  onJoinRoom={joinRoom}
                />
              )}

              {gameState === GameState.REVEAL && currentWord && (
                <Reveal 
                  key={me?.id || `local-${revealingPlayerIndex}`}
                  player={me || players[0]} 
                  word={currentWord} 
                  onNext={handleRevealNext}
                  lang={language}
                  isMultiplayer={gameMode === GameMode.ONLINE}
                />
              )}

              {gameState === GameState.PLAYING && (
                <GameView 
                  duration={GAME_DURATION} 
                  onFinish={finishGame}
                  lang={language}
                  isHost={gameMode === GameMode.LOCAL || isHost}
                />
              )}

              {gameState === GameState.SUMMARY && (
                <Summary 
                  players={players} 
                  onReset={resetGame}
                  lang={language}
                  isHost={gameMode === GameMode.LOCAL || isHost}
                />
              )}
            </>
          )}
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-slate-900/90 backdrop-blur-2xl border-t border-slate-800 flex justify-around items-center z-50">
        <button 
          onClick={() => setActiveTab('HOME')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'HOME' ? 'text-red-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">{navLabels.home}</span>
        </button>

        <div className="w-px h-8 bg-slate-800"></div>

        <button 
          onClick={() => setActiveTab('ABOUT')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'ABOUT' ? 'text-red-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">{navLabels.about}</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
