import React, { useState } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { mockLeaderboardData } from '../data/leaderboardData';
import { LeaderboardEntry } from '../types/competition';
import { Trophy, Medal, AlertCircle, ArrowLeft, RotateCcw, Search, UserCheck } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { state, setView, resetCompetition } = useCompetition();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate live scores for current participant
  const r1Score = state.roundResults.round1?.totalScore ?? Object.keys(state.bestScores).filter(k => k.startsWith('r1-')).reduce((s, k) => s + (state.bestScores[k] || 0), 0);
  const r2Score = state.roundResults.round2?.totalScore ?? Object.keys(state.bestScores).filter(k => k.startsWith('r2-')).reduce((s, k) => s + (state.bestScores[k] || 0), 0);
  const r3Score = state.roundResults.round3?.totalScore ?? (state.bestScores['r3-q1'] || 0);
  const totalScore = r1Score + r2Score + r3Score;

  const totalTime = (state.roundResults.round1?.timeUsedSeconds || 0) +
                    (state.roundResults.round2?.timeUsedSeconds || 0) +
                    (state.roundResults.round3?.timeUsedSeconds || 0);

  // Injected current participant entry
  const currentEntry: LeaderboardEntry | null = state.participant ? {
    rank: 0,
    participantId: state.participant.participantId,
    name: state.participant.fullName,
    college: state.participant.college,
    round1Score: r1Score,
    round2Score: r2Score,
    round3Score: r3Score,
    totalScore: totalScore,
    totalTimeUsedSeconds: totalTime,
    status: totalScore >= 200 ? 'WINNER_EVALUATION' : (totalScore >= 100 ? 'QUALIFIED' : 'IN_PROGRESS'),
    isCurrentParticipant: true,
    isDemoData: false
  } : null;

  // Merge and sort list
  const combinedList = currentEntry 
    ? [...mockLeaderboardData, currentEntry]
    : [...mockLeaderboardData];

  combinedList.sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    return a.totalTimeUsedSeconds - b.totalTimeUsedSeconds;
  });

  // Assign ranks
  const rankedList = combinedList.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));

  const filteredList = rankedList.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.participantId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold text-xs">🥇</div>;
    }
    if (rank === 2) {
      return <div className="w-7 h-7 rounded-full bg-slate-300/20 text-slate-300 border border-slate-300/40 flex items-center justify-center font-bold text-xs">🥈</div>;
    }
    if (rank === 3) {
      return <div className="w-7 h-7 rounded-full bg-amber-700/20 text-amber-500 border border-amber-700/40 flex items-center justify-center font-bold text-xs">🥉</div>;
    }
    return <span className="font-mono text-slate-400 font-bold text-xs w-7 text-center">#{rank}</span>;
  };

  return (
    <div className="min-h-[calc(100vh-60px)] max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (state.isCompetitionComplete) {
                  setView('final_result');
                } else if (state.currentRound === 1 && state.participant) {
                  setView('round1_workspace');
                } else if (state.currentRound === 2) {
                  setView('round2_workspace');
                } else if (state.currentRound === 3) {
                  setView('round3_workspace');
                } else {
                  setView('welcome');
                }
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Return"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>Competition Leaderboard</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 pl-7">
            Live rankings, cumulative scores, and evaluation standings.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search contestant or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Prominent Demo Data Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold tracking-wide uppercase font-mono text-[11px] block">
            DEMO DATA DISCLAIMER
          </span>
          <p className="text-amber-200/90 text-xs">
            This prototype leaderboard showcases sample demonstration contestant data to illustrate tie-breaker ranking and podium placement. Your live participant scores are dynamically integrated into the standings.
          </p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0f172a] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px] font-mono">
                <th className="py-3 px-4 text-center">Rank</th>
                <th className="py-3 px-4">Contestant</th>
                <th className="py-3 px-4 hidden md:table-cell">Institution</th>
                <th className="py-3 px-3 text-center">R1 (Bug Hunt)</th>
                <th className="py-3 px-3 text-center">R2 (Logic)</th>
                <th className="py-3 px-3 text-center">R3 (Rescue)</th>
                <th className="py-3 px-4 text-center font-bold text-amber-400">Total Score</th>
                <th className="py-3 px-4 text-center hidden sm:table-cell">Time</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredList.map((entry) => {
                const isCurrent = entry.isCurrentParticipant;

                return (
                  <tr
                    key={entry.participantId}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-cyan-950/40 hover:bg-cyan-900/40 border-l-4 border-l-cyan-400'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center">
                        {getRankBadge(entry.rank)}
                      </div>
                    </td>

                    {/* Contestant */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-cyan-400/20" />
                        )}
                        <div>
                          <span className={`font-bold text-sm block ${
                            isCurrent ? 'text-cyan-300' : 'text-slate-100'
                          }`}>
                            {entry.name}
                            {isCurrent && (
                              <span className="ml-1.5 px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                                YOU
                              </span>
                            )}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {entry.participantId} {entry.isDemoData ? '• [DEMO DATA]' : '• [LIVE ENTRY]'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Institution */}
                    <td className="py-3.5 px-4 text-slate-300 hidden md:table-cell">
                      {entry.college}
                    </td>

                    {/* Round 1 */}
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-slate-300">
                      {entry.round1Score}
                    </td>

                    {/* Round 2 */}
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-slate-300">
                      {entry.round2Score}
                    </td>

                    {/* Round 3 */}
                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-slate-300">
                      {entry.round3Score}
                    </td>

                    {/* Grand Total */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-mono font-black text-sm text-amber-400">
                        {entry.totalScore}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-mono">/ 300</span>
                    </td>

                    {/* Time */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-400 hidden sm:table-cell">
                      {formatSeconds(entry.totalTimeUsedSeconds)}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      {entry.status === 'WINNER_EVALUATION' ? (
                        <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold whitespace-nowrap">
                          🏆 TOP EVALUATION
                        </span>
                      ) : entry.status === 'QUALIFIED' ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold whitespace-nowrap">
                          ✓ QUALIFIED
                        </span>
                      ) : entry.status === 'IN_PROGRESS' ? (
                        <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold whitespace-nowrap">
                          ⚡ IN PROGRESS
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono text-[10px] font-bold whitespace-nowrap">
                          ✕ ELIMINATED
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={() => {
            if (state.participant) {
              setView('round1_workspace');
            } else {
              setView('welcome');
            }
          }}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Competition</span>
        </button>

        <button
          onClick={resetCompetition}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Prototype Data</span>
        </button>
      </div>
    </div>
  );
};
