
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';

interface GameViewProps {
  duration: number;
  onFinish: () => void;
  lang: Language;
}

const GameView: React.FC<GameViewProps> = ({ duration, onFinish, lang }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = {
    title: lang === Language.EN ? 'Find the Spy!' : 'جاسوس را پیدا کنید!',
    description: lang === Language.EN 
      ? 'Ask each other questions to identify the spy. The spy tries to blend in.' 
      : 'از همدیگر سوال بپرسید تا جاسوس را شناسایی کنید. جاسوس سعی می‌کند مخفی بماند.',
    pause: lang === Language.EN ? 'Pause' : 'توقف',
    resume: lang === Language.EN ? 'Resume' : 'ادامه',
    finish: lang === Language.EN ? 'End Game' : 'پایان بازی',
    timerLabel: lang === Language.EN ? 'Time Remaining' : 'زمان باقی‌مانده',
  };

  useEffect(() => {
    // Create a simple buzzer sound using oscillator
    const playBuzzer = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 1);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1.5);
      } catch (e) {
        console.warn("Audio context not available", e);
      }
    };

    if (timeLeft <= 0) {
      playBuzzer();
      onFinish();
      return;
    }

    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onFinish]);

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
        <p className="text-slate-400 text-sm max-w-[280px] mx-auto">{t.description}</p>
      </div>

      {/* Timer Display */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Progress Ring Background */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-800"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
            strokeLinecap="round"
            className={`transition-all duration-1000 ${isWarning ? 'text-red-500 animate-pulse' : 'text-red-600'}`}
          />
        </svg>

        {/* Digital Time */}
        <div className="flex flex-col items-center">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{t.timerLabel}</span>
          <span className={`text-6xl font-black font-mono tracking-tight ${isWarning ? 'text-red-500' : 'text-white'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="w-full flex gap-4 pt-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
            isPaused 
              ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {isPaused ? t.resume : t.pause}
        </button>
        <button
          onClick={onFinish}
          className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-500 transition-all shadow-lg shadow-red-900/20"
        >
          {t.finish}
        </button>
      </div>
    </div>
  );
};

export default GameView;
