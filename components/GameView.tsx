
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';

interface GameViewProps {
  duration: number;
  onFinish: () => void;
  lang: Language;
  isHost?: boolean;
}

const GameView: React.FC<GameViewProps> = ({ duration, onFinish, lang, isHost }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  const t = {
    title: lang === Language.EN ? 'Find the Spy!' : 'جاسوس را پیدا کنید!',
    description: lang === Language.EN 
      ? 'Ask questions to identify the spy. Spies must blend in.' 
      : 'سوال بپرسید تا جاسوس را پیدا کنید. جاسوس‌ها باید همرنگ جماعت شوند.',
    pause: lang === Language.EN ? 'Pause' : 'توقف',
    resume: lang === Language.EN ? 'Resume' : 'ادامه',
    finish: lang === Language.EN ? 'End Game' : 'پایان بازی',
    timerLabel: lang === Language.EN ? 'Time Remaining' : 'زمان باقی‌مانده',
    waitingForHost: lang === Language.EN ? 'Waiting for Host...' : 'در انتظار مدیر بازی...',
  };

  useEffect(() => {
    const playBuzzer = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
      } catch (e) {}
    };

    if (timeLeft <= 0) {
      playBuzzer();
      if (isHost) onFinish();
      return;
    }

    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onFinish, isHost]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / duration) * 100;
  const isWarning = timeLeft < 30;

  return (
    <div className="flex flex-col items-center py-4 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-100">{t.title}</h2>
        <p className="text-slate-400 text-xs max-w-[240px] mx-auto">{t.description}</p>
      </div>

      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle cx="112" cy="112" r="104" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
          <circle cx="112" cy="112" r="104" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 104} strokeDashoffset={2 * Math.PI * 104 * (1 - progress / 100)} strokeLinecap="round" className={`transition-all duration-1000 ${isWarning ? 'text-red-500 animate-pulse' : 'text-red-600'}`} />
        </svg>

        <div className="flex flex-col items-center">
          <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">{t.timerLabel}</span>
          <span className={`text-5xl font-black font-mono tracking-tight ${isWarning ? 'text-red-500' : 'text-white'}`}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="w-full flex gap-3 pt-4">
        {isHost ? (
          <>
            <button onClick={() => setIsPaused(!isPaused)} className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${isPaused ? 'bg-green-600' : 'bg-slate-800'}`}>{isPaused ? t.resume : t.pause}</button>
            <button onClick={onFinish} className="flex-1 py-3 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-500">{t.finish}</button>
          </>
        ) : (
          <p className="w-full text-center text-slate-500 text-xs italic py-3">{t.waitingForHost}</p>
        )}
      </div>
    </div>
  );
};

export default GameView;
