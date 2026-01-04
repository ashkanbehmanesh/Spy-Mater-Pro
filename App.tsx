
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Player, GameState, Language, WordPair } from './types';
import { WORD_LIST, GAME_DURATION } from './constants';
import Setup from './components/Setup';
import Reveal from './components/Reveal';
import GameView from './components/GameView';
import Summary from './components/Summary';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SETUP);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [players, setPlayers] = useState<Player[]>([]);
  const [spyCount, setSpyCount] = useState(1);
  const [currentWord, setCurrentWord] = useState<WordPair | null>(null);
  const [revealingPlayerIndex, setRevealingPlayerIndex] = useState(0);

  const isRtl = language === Language.FA;

  // Initialize a new game
  const startGame = useCallback(() => {
    if (players.length < 3) return;

    // Shuffle the players list as requested
    const shuffledPlayers = shuffleArray(players);
    
    // Ensure spyCount is valid (at least 1, but less than players.length)
    const validSpyCount = Math.max(1, Math.min(spyCount, players.length - 1));
    
    // Pick random indices for spies
    const spyIndices = new Set<number>();
    while (spyIndices.size < validSpyCount) {
      spyIndices.add(Math.floor(Math.random() * shuffledPlayers.length));
    }

    const updatedPlayers = shuffledPlayers.map((p, idx) => ({
      ...p,
      isSpy: spyIndices.has(idx),
      hasSeenRole: false,
    }));
    
    // Pick random word
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    
    setPlayers(updatedPlayers);
    setCurrentWord(randomWord);
    setRevealingPlayerIndex(0);
    setGameState(GameState.REVEAL);
  }, [players, spyCount]);

  const handleRevealNext = useCallback(() => {
    const updatedPlayers = [...players];
    updatedPlayers[revealingPlayerIndex].hasSeenRole = true;
    setPlayers(updatedPlayers);

    if (revealingPlayerIndex < players.length - 1) {
      setRevealingPlayerIndex(revealingPlayerIndex + 1);
    } else {
      setGameState(GameState.PLAYING);
    }
  }, [players, revealingPlayerIndex]);

  const resetGame = useCallback(() => {
    setGameState(GameState.SETUP);
    setCurrentWord(null);
    setRevealingPlayerIndex(0);
  }, []);

  const finishGame = useCallback(() => {
    setGameState(GameState.SUMMARY);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${isRtl ? 'rtl' : ''}`}>
      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
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

        {/* Content */}
        <main className="p-6">
          {gameState === GameState.SETUP && (
            <Setup 
              players={players} 
              setPlayers={setPlayers} 
              spyCount={spyCount}
              setSpyCount={setSpyCount}
              onStart={startGame} 
              lang={language}
            />
          )}

          {gameState === GameState.REVEAL && currentWord && (
            <Reveal 
              player={players[revealingPlayerIndex]} 
              word={currentWord} 
              onNext={handleRevealNext}
              lang={language}
            />
          )}

          {gameState === GameState.PLAYING && (
            <GameView 
              duration={GAME_DURATION} 
              onFinish={finishGame}
              lang={language}
            />
          )}

          {gameState === GameState.SUMMARY && (
            <Summary 
              players={players} 
              onReset={resetGame}
              lang={language}
            />
          )}
        </main>
      </div>

      <footer className="mt-8 text-slate-500 text-sm opacity-50">
        &copy; 2024 SpyMaster Pro
      </footer>
    </div>
  );
};

export default App;
