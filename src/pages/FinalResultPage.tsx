import React, { useEffect } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { Trophy, Award, CheckCircle2, Clock, Sparkles, ArrowRight, RotateCcw, Medal } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinalResultPage: React.FC = () => {
  const { state, setView, resetCompetition } = useCompetition();

  const r1Score = state.roundResults.round1?.totalScore ?? (state.bestScores['r1-q1'] !== undefined ? Object.keys(state.bestScores).filter(k => k.startsWith('r1-')).reduce((s, k) => s + (state.bestScores[k] || 0), 0) : 0);
  const r2Score = state.roundResults.round2?.totalScore ?? Object.keys(state.bestScores).filter(k => k.startsWith('r2-')).reduce((s, k) => s + (state.bestScores[k] || 0), 0);
  const r3Score = state.roundResults.round3?.totalScore ?? (state.bestScores['r3-q1'] || 0);

  const totalScore = r1Score + r2Score + r3Score;
  const maxTotalScore = 300;

  // Calculate stats
  const totalSolved = Object.values(state.bestScores).filter(s => s > 0).length;
  const totalQuestions = 16; // 10 in R1 + 5 in R2 + 1 in R3

  const r1Time = state.roundResults.round1?.timeUsedSeconds || 0;
  const r2Time = state.roundResults.round2?.timeUsedSeconds || 0;
  const r3Time = state.roundResults.round3?.timeUsedSeconds || 0;
  const totalTimeSeconds = r1Time + r2Time + r3Time;

  const hours = Math.floor(totalTimeSeconds / 3600);
  const minutes = Math.floor((totalTimeSeconds % 3600) / 60);
  const seconds = totalTimeSeconds % 60;
  const formattedTotalTime = hours > 0 
    ? `${hours}h ${minutes}m ${seconds}s` 
    : `${minutes}m ${seconds}s`;

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-[#0d1322] border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

        {/* Title Header */}
        <div className="text-center space-y-2 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL COMPETITION CONCLUDED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            CODE RESCUE COMPLETE
          </h1>

          <p className="text-slate-300 text-sm sm:text-base">
            Contestant: <span className="font-bold text-cyan-400">{state.participant?.fullName || 'Sanjai K'}</span>{' '}
            <span className="text-slate-500 font-mono text-xs">({state.participant?.college})</span>
          </p>
        </div>

        {/* Podium Winner Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-900/60 to-slate-900 border border-amber-500/40 text-center space-y-3 glow-amber relative">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20">
            <Trophy className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              FINAL VERDICT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              🏆 Qualified for Winner Evaluation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-1 leading-relaxed">
              Your final codebase and cumulative performance have been committed to the judging engine for podium tie-breaker ranking.
            </p>
          </div>

          {/* Grand Cumulative Score Banner */}
          <div className="pt-2">
            <div className="inline-block px-8 py-3 rounded-xl bg-black/60 border border-amber-500/30">
              <span className="text-xs text-slate-400 block font-sans uppercase">Cumulative Grand Score</span>
              <span className="text-4xl sm:text-5xl font-black font-mono text-amber-400">
                {totalScore} <span className="text-base text-slate-500 font-normal">/ {maxTotalScore}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Round by Round Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Round 1 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
            <span className="text-xl">🐞</span>
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Round 1 (Bug Hunt)</span>
            <span className="text-2xl font-bold font-mono text-emerald-400">
              {r1Score} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </span>
            <span className="text-[10px] text-emerald-400/80 block">✓ Qualified</span>
          </div>

          {/* Round 2 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
            <span className="text-xl">🧠</span>
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Round 2 (Logic Breaker)</span>
            <span className="text-2xl font-bold font-mono text-amber-400">
              {r2Score} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </span>
            <span className="text-[10px] text-amber-400/80 block">✓ Qualified</span>
          </div>

          {/* Round 3 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
            <span className="text-xl">🚨</span>
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Round 3 (Code Rescue)</span>
            <span className="text-2xl font-bold font-mono text-rose-400">
              {r3Score} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </span>
            <span className="text-[10px] text-rose-400/80 block">✓ System Rescued</span>
          </div>
        </div>

        {/* Analytics Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Problems Solved</span>
            <span className="font-bold font-mono text-slate-200 text-sm">{totalSolved} / {totalQuestions}</span>
          </div>
          <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Total Time Used</span>
            <span className="font-bold font-mono text-slate-200 text-sm">{formattedTotalTime}</span>
          </div>
          <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Accuracy Rate</span>
            <span className="font-bold font-mono text-slate-200 text-sm">
              {Math.round((totalSolved / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Participant ID</span>
            <span className="font-bold font-mono text-cyan-400 text-sm">{state.participant?.participantId || 'CR-LIVE'}</span>
          </div>
        </div>

        {/* Final CTA Buttons */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setView('leaderboard')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/40 transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>View Official Leaderboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={resetCompetition}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo & Replay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
