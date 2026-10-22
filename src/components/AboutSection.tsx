import React from 'react';
import { Database, Cpu, Layers, ShieldCheck, Zap, Bot, BrainCircuit } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-16 mb-20">
      <div className="text-center mb-8">
        <h3 className="font-['Cinzel',serif] text-xl md:text-2xl font-bold text-slate-100">
          Como Funciona o Motor de IA do DOTAREVEW
        </h3>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          Arquitetura 100% automatizada por Inteligência Artificial, unindo telemetria aberta de replays com modelos de raciocínio estratégico para Dota 2 sem custos para o jogador.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1: OpenDota */}
        <div className="p-5 rounded-xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-200 text-sm mb-1.5 flex items-center gap-1.5">
            1. Dados de Replay da OpenDota
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Consumimos a API aberta da OpenDota (<code className="text-amber-300">/api/matches/:id</code>) que faz o parse direto do replay oficial da Valve. Estatísticas de farm, itens, mortes, percentis de rank e timestamps são obtidos instantaneamente.
          </p>
        </div>

        {/* Step 2: Token Filter & Compression */}
        <div className="p-5 rounded-xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-200 text-sm mb-1.5 flex items-center gap-1.5">
            2. Filtro de Telemetria e Mapeamento
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nosso backend em Node.js filtra os momentos de alto impacto: timings de itens cruciais, perdas de equilíbrio de rota, áreas de farm desprotegidas no minimapa e coordenadas de teamfights.
          </p>
        </div>

        {/* Step 3: Google Gemini Coaching */}
        <div className="p-5 rounded-xl bg-[#0e131d] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-3">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-200 text-sm mb-1.5 flex items-center gap-1.5">
            3. Motor de Coaching com IA
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            A Inteligência Artificial do Google Gemini atua como um analista profissional, gerando o mapeamento de coordenadas (X, Y) das falhas no mapa, o diagnóstico completo de avanço solo vs em grupo e planos de treino para subir de elo.
          </p>
        </div>
      </div>

      {/* Free Tier Guarantee */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-[#0e131d] to-[#0e131d] border border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>100% Gratuito & Baseado em IA:</strong> Todas as análises são processadas exclusivamente por inteligência artificial, sem cobranças ou limites de uso.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-300 font-semibold shrink-0">
          <Zap className="w-4 h-4" />
          <span>Rápido • Seguro • Direto ao Ponto</span>
        </div>
      </div>
    </div>
  );
};
