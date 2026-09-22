import React from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { CheckCircle2, XCircle, Clock, Trophy, Target, ArrowRight, RotateCcw } from 'lucide-react';

interface RoundResultPageProps {
  round: 1 | 2;
}

export const RoundResultPage: React.FC<RoundResultPageProps> = ({ round }) => {
  const { state, proceedToNextRound, setView, resetCompetition } = useCompetition();

  const roundResult = round === 1 ? state.roundResults.round1 : state.roundResults.round2;

  // Fallback defaults if accessed directly
  const totalScore = roundResult?.totalScore ?? 0;
  const maxScore = roundResult?.maxScore ?? 100;
  const correctCount = roundResult?.correctCount ?? 0;
  const totalQuestions = roundResult?.totalQuestions ?? (round === 1 ? 10 : 5);
  const wrongCount = roundResult?.wrongCount ?? (totalQuestions - correctCount);
  const accuracy = roundResult?.accuracy ?? (totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0);

  const timeUsedSeconds = roundResult?.timeUsedSeconds ?? 0;
  const minutes = Math.floor(timeUsedSeconds / 60);
  const seconds = timeUsedSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const minCutoff = round === 1 
    ? state.qualificationConfig.round1MinScore 
    : state.qualificationConfig.round2MinScore;

  const isQualified = roundResult ? roundResult.isQualified : totalScore >= minCutoff;

  const nextRoundLabel = round === 1 ? 'Round 2 — Logic Breaker' : 'Round 3 — Code Rescue';

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-1 pb-4 border-b border-slate-800">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            ROUND {round} EVALUATION
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            {round === 1 ? 'BUG HUNT COMPLETE' : 'LOGIC BREAKER COMPLETE'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Official performance audit for participant: <span className="text-slate-200 font-semibold">{state.participant?.fullName || 'Contestant'}</span>
          </p>
        </div>

        {/* Qualification Status Banner */}
        <div className={`p-5 rounded-xl border text-center space-y-2 transition-all ${
          isQualified
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 glow-emerald'
            : 'bg-rose-950/40 border-rose-500/50 text-rose-200 glow-rose'
        }`}>
          <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-black tracking-wide">
            {isQualified ? (
              <>
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                <span>QUALIFIED FOR NEXT ROUND</span>
              </>
            ) : (
              <>
                <XCircle className="w-7 h-7 text-rose-400" />
                <span>ELIMINATED FROM COMPETITION</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {isQualified
              ? `Congratulations! Your score of ${totalScore} pts meets the official qualification cutoff of ${minCutoff} pts.`
              : `Your score of ${totalScore} pts did not reach the qualification threshold of ${minCutoff} pts.`}
          </p>
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Total Score */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <Trophy className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block uppercase">Score Earned</span>
            <span className="text-xl font-bold font-mono text-amber-400">
              {totalScore} <span className="text-xs text-slate-500 font-normal">/ {maxScore}</span>
            </span>
          </div>

          {/* Correct Solved */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block uppercase">Correct</span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              {correctCount} <span className="text-xs text-slate-500 font-normal">/ {totalQuestions}</span>
            </span>
          </div>

          {/* Time Taken */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block uppercase">Time Used</span>
            <span className="text-xl font-bold font-mono text-cyan-400">
              {formattedTime}
            </span>
          </div>

          {/* Accuracy */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <Target className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block uppercase">Accuracy</span>
            <span className="text-xl font-bold font-mono text-purple-400">
              {accuracy}%
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setView('leaderboard')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>View Current Standings</span>
          </button>

          {isQualified ? (
            <button
              onClick={proceedToNextRound}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to {nextRoundLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={resetCompetition}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-600 text-rose-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Competition</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
