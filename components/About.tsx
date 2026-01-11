
import React from 'react';
import { Language } from '../types';

interface AboutProps {
  lang: Language;
}

const About: React.FC<AboutProps> = ({ lang }) => {
  const isEn = lang === Language.EN;

  const content = {
    title: isEn ? "How to Play" : "آموزش بازی",
    intro: isEn 
      ? "SpyMaster Pro is a party game of social deduction. One or more players are secret Spies who don't know the 'Secret Word'. Everyone else knows the word and must find the Spy."
      : "استاد جاسوس یک بازی دورهمی است. یک یا چند بازیکن به عنوان جاسوس انتخاب می‌شوند که از «کلمه رمز» بی‌اطلاع هستند. بقیه کلمه را می‌دانند و باید جاسوس را پیدا کنند.",
    
    methodsTitle: isEn ? "Playing Methods" : "روش‌های بازی",
    
    method1Title: isEn ? "Method 1: The Word Association" : "روش اول: تداعی کلمات",
    method1Rules: isEn ? [
      "Each player says exactly one word related to the secret word.",
      "Be careful! If your word is too obvious, the Spy will guess the Secret Word and win.",
      "If your word is too vague, others might think YOU are the Spy.",
      "After everyone speaks, discuss and vote for the Spy.",
      "If the Spy is correctly identified, the citizens win. If not, the Spy wins.",
      "At any time, the Spy can reveal themselves and guess the word. If they are correct, they win immediately."
    ] : [
      "هر بازیکن دقیقاً یک کلمه مرتبط با کلمه رمز می‌گوید.",
      "مراقب باشید! اگر کلمه شما خیلی واضح باشد، جاسوس کلمه رمز را حدس زده و برنده می‌شود.",
      "اگر کلمه شما خیلی نامفهوم باشد، بقیه ممکن است فکر کنند شما جاسوس هستید.",
      "بعد از اینکه همه صحبت کردند، بحث کنید و به جاسوس رای دهید.",
      "اگر جاسوس درست شناسایی شود، شهروندان برنده می‌شوند. در غیر این صورت، جاسوس برنده است.",
      "در هر زمان، جاسوس می‌تواند خود را معرفی کرده و کلمه را حدس بزند. اگر درست بگوید، بلافاصله برنده می‌شود."
    ],

    method2Title: isEn ? "Method 2: Two-Option Questions" : "روش دوم: سوالات دو گزینه‌ای",
    method2Rules: isEn ? [
      "Players take turns asking another player a question with two options (e.g., 'Is it hot or cold?', 'Big or small?').",
      "The person being asked must choose one of the options.",
      "Based on the questions and answers, you must deduce who doesn't know the word.",
      "At the end of the timer, everyone votes for the suspected Spy.",
      "If the Spy guesses the Secret Word before time is up, they win!",
      "If the majority votes for the real Spy, the citizens win."
    ] : [
      "بازیکنان به نوبت از یک بازیکن دیگر سوالی با دو گزینه می‌پرسند (مثلاً: «گرمه یا سرده؟»، «بزرگه یا کوچیک؟»).",
      "شخصی که از او سوال شده باید یکی از گزینه‌ها را انتخاب کند.",
      "بر اساس سوالات و جواب‌ها، باید بفهمید چه کسی کلمه را نمی‌داند.",
      "در پایان زمان، همه به جاسوس مشکوک رای می‌دهند.",
      "اگر جاسوس قبل از اتمام زمان کلمه رمز را حدس بزند، برنده می‌شود!",
      "اگر اکثریت به جاسوس واقعی رای دهند، شهروندان برنده می‌شوند."
    ],

    proTip: isEn ? "Pro Tip: The best questions/clues are ones that only someone who knows the word would understand!" : "نکته حرفه‌ای: بهترین سوالات یا کلمات آن‌هایی هستند که فقط کسی که کلمه را می‌داند متوجه منظور شما شود!",
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">{content.title}</h2>
        <p className="text-slate-400 text-sm leading-relaxed">{content.intro}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-red-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          {content.methodsTitle}
        </h3>

        {/* Method 1 */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-slate-200 border-b border-slate-700 pb-2">{content.method1Title}</h4>
          <ul className="space-y-2">
            {content.method1Rules.map((rule, idx) => (
              <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-600 shrink-0"></span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Method 2 */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-slate-200 border-b border-slate-700 pb-2">{content.method2Title}</h4>
          <ul className="space-y-2">
            {content.method2Rules.map((rule, idx) => (
              <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-600 shrink-0"></span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
        <p className="text-xs text-orange-400 italic text-center">
          {content.proTip}
        </p>
      </div>
    </div>
  );
};

export default About;
