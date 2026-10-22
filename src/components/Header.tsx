import React from 'react';
import { Bot, Shield, Sparkles, Zap, Map } from 'lucide-react';

interface HeaderProps {
  onSelectPreset: (matchId: string, heroId?: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectPreset }) => {
  return (
    <header className="relative border-b border-red-950/40 bg-gradient-to-b from-[#111622] to-[#0a0d14] px-4 py-5 md:py-7 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          {/* New Orc Warrior Avatar Badge */}
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl overflow-hidden shadow-xl shadow-red-950/50 border-2 border-amber-500/50 group bg-slate-900 shrink-0">
            <img
              src="/logo.png"
              alt="DOTAREVEW Orc Warrior Logo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0d14] flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-black" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-['Cinzel',serif] text-2xl md:text-3xl font-black tracking-wider bg-gradient-to-r from-red-400 via-amber-200 to-red-100 bg-clip-text text-transparent">
                DOTAREVEW
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                IA 100% Gratuito
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 font-medium">
              Análise Tática de Replays de Dota 2 com Inteligência Artificial e Mapeamento de Falhas
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <Map className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mapeamento de Falhas no Replay</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>Motor de Coaching por IA</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Livre de Assinaturas</span>
          </div>
        </div>
      </div>
    </header>
  );
};
