import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MatchInput } from './components/MatchInput';
import { Scoreboard } from './components/Scoreboard';
import { CoachPanel } from './components/CoachPanel';
import { ReportViewer } from './components/ReportViewer';
import { RecentHistory, SavedAnalysis } from './components/RecentHistory';
import { AboutSection } from './components/AboutSection';
import { PRESET_MATCHES } from './data/dotaConstants';
import { AlertCircle, X } from 'lucide-react';

export default function App() {
  const [currentMatchId, setCurrentMatchId] = useState<string>('');
  const [matchData, setMatchData] = useState<any>(null);
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
  const [isLoadingMatch, setIsLoadingMatch] = useState<boolean>(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<SavedAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedAnalysis[]>([]);

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dota_ai_coach_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load history from localStorage', e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (newAnalysis: SavedAnalysis) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (h) => !(h.matchId === newAnalysis.matchId && h.heroId === newAnalysis.heroId)
      );
      const updated = [newAnalysis, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('dota_ai_coach_history', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('dota_ai_coach_history');
    } catch (e) {
      console.error(e);
    }
  };

  // Search Match by ID
  const handleSearchMatch = async (matchId: string, preferredHeroId?: number) => {
    setErrorMessage(null);
    setIsLoadingMatch(true);
    setCurrentMatchId(matchId);

    try {
      const response = await fetch(`/api/match/${matchId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar dados da partida');
      }

      setMatchData(data.match);

      // Select preferred hero or first player
      if (preferredHeroId && data.match.players?.some((p: any) => p.hero_id === preferredHeroId)) {
        setSelectedHeroId(preferredHeroId);
      } else if (data.match.players && data.match.players.length > 0) {
        setSelectedHeroId(data.match.players[0].hero_id);
      }
    } catch (err: any) {
      console.error('Match search error:', err);
      setErrorMessage(
        err.message || 'Não foi possível encontrar essa partida na OpenDota. Certifique-se de que a partida é pública e o Match ID está correto.'
      );
    } finally {
      setIsLoadingMatch(false);
    }
  };

  // Select Preset Match
  const handleSelectPreset = (preset: typeof PRESET_MATCHES[0]) => {
    handleSearchMatch(preset.id, preset.heroId);
  };

  // Generate Coaching Analysis via Gemini
  const handleGenerateReport = async ({
    style,
    language,
  }: {
    style: 'pro' | 'constructive' | 'roast';
    language: string;
  }) => {
    if (!matchData || !selectedHeroId) {
      setErrorMessage('Selecione um herói no placar antes de gerar a análise.');
      return;
    }

    setErrorMessage(null);
    setIsGeneratingReport(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId: matchData.match_id.toString(),
          heroId: selectedHeroId,
          style,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao gerar relatório de coaching');
      }

      const newAnalysis: SavedAnalysis = {
        matchId: data.matchId,
        heroId: data.heroId,
        playerWon: data.playerWon,
        duration: data.duration,
        kda: data.kda,
        kp: data.kp,
        gpm: data.gpm,
        xpm: data.xpm,
        netWorth: data.netWorth,
        performanceGrade: data.performanceGrade,
        executiveVerdict: data.executiveVerdict,
        radarSkills: data.radarSkills,
        tacticalMoments: data.tacticalMoments,
        report: data.report,
        generatedAt: data.generatedAt,
      };

      setCurrentAnalysis(newAnalysis);
      saveToHistory(newAnalysis);

      // Smooth scroll to report
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight * 0.8,
          behavior: 'smooth',
        });
      }, 100);
    } catch (err: any) {
      console.error('AI Coaching error:', err);
      setErrorMessage(
        err.message || 'Erro ao conectar com a IA Gemini. Tente novamente em instantes.'
      );
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleSelectHistoryItem = (item: SavedAnalysis) => {
    setCurrentAnalysis(item);
    setCurrentMatchId(item.matchId);
    setSelectedHeroId(item.heroId);
    // If match data isn't loaded for this match, fetch it in background
    if (!matchData || String(matchData.match_id) !== item.matchId) {
      handleSearchMatch(item.matchId, item.heroId);
    }
  };

  return (
    <div className="min-h-screen bg-[#090c10] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header onSelectPreset={(id) => handleSearchMatch(id)} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Error Alert */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto px-4 mt-6">
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 flex items-start justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-sm font-medium">{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="text-red-400 hover:text-red-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Match Input & Presets */}
        <MatchInput
          onSearch={(id) => handleSearchMatch(id)}
          onSelectPreset={handleSelectPreset}
          isLoading={isLoadingMatch}
          currentMatchId={currentMatchId}
        />

        {/* History of Past Analyses */}
        <RecentHistory
          history={history}
          onSelect={handleSelectHistoryItem}
          onClear={handleClearHistory}
        />

        {/* Scoreboard when match is loaded */}
        {matchData && (
          <>
            <Scoreboard
              match={matchData}
              selectedHeroId={selectedHeroId}
              onSelectHero={(id) => setSelectedHeroId(id)}
            />

            <CoachPanel
              selectedHeroId={selectedHeroId}
              match={matchData}
              onGenerateReport={handleGenerateReport}
              isGenerating={isGeneratingReport}
            />
          </>
        )}

        {/* Generated Report Viewer */}
        {currentAnalysis && (
          <ReportViewer
            analysis={currentAnalysis}
            onReset={() => {
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          />
        )}

        {/* Architecture & Free Model Explanation */}
        <AboutSection />
      </main>
    </div>
  );
}
