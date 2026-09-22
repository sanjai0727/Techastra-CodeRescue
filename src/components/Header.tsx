import React from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { Bug, Clock, ShieldCheck, Settings, Trophy, CheckCircle2, FastForward } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    state,
    getCurrentRoundQuestions,
    getCurrentRoundScore,
    setOrganizerMode,
    devSkipToNextRound
  } = useCompetition();

  const { currentView, participant, currentRound, timers } = state;

  // Determine if we are inside an active round workspace
  const isWorkspace = currentView === 'round1_workspace' || currentView === 'round2_workspace' || currentView === 'round3_workspace';

  // Calculate timer values
  const remainingSeconds = currentRound === 1 
    ? timers.round1Remaining 
    : (currentRound === 2 ? timers.round2Remaining : timers.round3Remaining);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Timer warning style
  let timerBadgeColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30';
  if (remainingSeconds <= 60) {
    timerBadgeColor = 'text-rose-400 border-rose-500/50 bg-rose-950/50 animate-pulse-fast';
  } else if (remainingSeconds <= 300) {
    timerBadgeColor = 'text-amber-400 border-amber-500/40 bg-amber-950/40';
  }

  // Question progress
  const questions = getCurrentRoundQuestions();
  const solvedCount = questions.filter(q => (state.bestScores[q.id] || 0) === q.points).length;
  const roundScore = getCurrentRoundScore();
  const maxRoundScore = questions.reduce((a, b) => a + b.points, 0);

  const getRoundLabel = () => {
    if (currentRound === 1) return { title: 'ROUND 1 — BUG HUNT', icon: '🐞' };
    if (currentRound === 2) return { title: 'ROUND 2 — LOGIC BREAKER', icon: '🧠' };
    return { title: 'ROUND 3 — CODE RESCUE', icon: '🚨' };
  };

  const roundInfo = getRoundLabel();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0d1322]/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
      {/* Brand & Round Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-bold tracking-wider text-slate-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Bug className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-sm tracking-tight text-white">CODE RESCUE</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/20">v1.0</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">Three-Round Debugging Challenge</p>
          </div>
        </div>

        {isWorkspace && (
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-700/60">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-1.5">
              <span>{roundInfo.icon}</span>
              <span>{roundInfo.title}</span>
            </span>
          </div>
        )}
      </div>

      {/* Middle: Timer & Live Stats (when in workspace) */}
      {isWorkspace && (
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Timer Display */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-mono font-bold text-sm sm:text-base border ${timerBadgeColor} transition-colors`}>
            <Clock className="w-4 h-4" />
            <span>{formattedTime}</span>
          </div>

          {/* Score & Progress */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-900/80 px-3 py-1 rounded-md border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Score:</span>
              <span className="font-bold text-amber-400 font-mono">{roundScore}</span>
              <span className="text-slate-500">/ {maxRoundScore}</span>
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Progress:</span>
              <span className="font-bold text-emerald-400 font-mono">{solvedCount}</span>
              <span className="text-slate-500">/ {questions.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Right: Participant Badge, Security indicator & Organizer Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Security / Competition Mode Tag */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Competition Mode</span>
        </div>

        {/* Participant Name Badge */}
        {participant && (
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-md text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
            <span className="font-medium text-slate-200 truncate max-w-[120px] sm:max-w-[160px]">
              {participant.fullName}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">({participant.participantId})</span>
          </div>
        )}

        {/* Developer Skip Round Button (Visible when in workspace) */}
        {isWorkspace && (
          <button
            onClick={() => devSkipToNextRound(false)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-950/70 border border-purple-500/50 text-purple-200 hover:bg-purple-900/80 font-bold transition-colors text-xs shadow-sm"
            title="Dev: Skip to Next Round with 100% passing score"
          >
            <FastForward className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">⚡ Skip Round</span>
          </button>
        )}

        {/* Organizer / Demo Mode Button */}
        <button
          onClick={() => setOrganizerMode(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-500/30 text-purple-300 hover:bg-purple-900/40 hover:text-purple-200 transition-colors text-xs"
          title="Open Demo & Organizer Controls"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Organizer Mode</span>
        </button>
      </div>
    </header>
  );
};
