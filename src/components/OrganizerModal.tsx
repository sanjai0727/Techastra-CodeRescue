import React from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { Settings, X, FastForward, UserCheck, RefreshCw, Trophy, ShieldAlert, ArrowRight } from 'lucide-react';

export const OrganizerModal: React.FC = () => {
  const {
    state,
    setOrganizerMode,
    organizerJumpToRound,
    organizerSetTimer,
    organizerAutofillParticipant,
    resetCompetition,
    setView,
    updateQualificationConfig
  } = useCompetition();

  if (!state.organizerModeOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f172a] border border-purple-500/40 rounded-2xl max-w-lg w-full p-5 shadow-2xl relative text-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">ORGANIZER / DEMO MODE</h2>
              <p className="text-xs text-purple-400">Administrative tools for judging & rapid prototype testing</p>
            </div>
          </div>

          <button
            onClick={() => setOrganizerMode(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 py-4 text-xs">
          {/* Quick Round Navigation */}
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Fast-Track Round Navigation
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  if (!state.participant) organizerAutofillParticipant();
                  organizerJumpToRound(1);
                  setOrganizerMode(false);
                }}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-center transition-colors"
              >
                🐞 Round 1
                <span className="block text-[10px] text-slate-400 font-normal">Bug Hunt</span>
              </button>
              <button
                onClick={() => {
                  if (!state.participant) organizerAutofillParticipant();
                  organizerJumpToRound(2);
                  setOrganizerMode(false);
                }}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-center transition-colors"
              >
                🧠 Round 2
                <span className="block text-[10px] text-slate-400 font-normal">Logic Breaker</span>
              </button>
              <button
                onClick={() => {
                  if (!state.participant) organizerAutofillParticipant();
                  organizerJumpToRound(3);
                  setOrganizerMode(false);
                }}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-center transition-colors"
              >
                🚨 Round 3
                <span className="block text-[10px] text-slate-400 font-normal">Code Rescue</span>
              </button>
            </div>
          </div>

          {/* Direct Views */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setView('leaderboard');
                setOrganizerMode(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-medium hover:bg-cyan-900/50 transition-colors"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>View Leaderboard</span>
            </button>
            <button
              onClick={() => {
                organizerAutofillParticipant();
                setOrganizerMode(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 font-medium hover:bg-emerald-900/50 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Autofill Participant</span>
            </button>
          </div>

          {/* Fast-forward timer to test auto-expiry */}
          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-300">Test Time Expiry Trigger:</span>
              <span className="text-slate-500 text-[11px]">Simulates countdown reaching zero</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  organizerSetTimer(state.currentRound, 10);
                  setOrganizerMode(false);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-medium hover:bg-amber-900/60 transition-colors"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Set Active Timer to 10s</span>
              </button>
            </div>
          </div>

          {/* Configurable Qualification Cutoffs */}
          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <span className="font-semibold text-slate-300 block mb-2">
              Qualification Thresholds:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Round 1 Cutoff (pts):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={state.qualificationConfig.round1MinScore}
                  onChange={(e) => updateQualificationConfig({ round1MinScore: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Round 2 Cutoff (pts):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={state.qualificationConfig.round2MinScore}
                  onChange={(e) => updateQualificationConfig({ round2MinScore: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Reset Competition */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                if (window.confirm('Reset all competition state and return to welcome screen?')) {
                  resetCompetition();
                  setOrganizerMode(false);
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Entire Competition (Wipe LocalStorage)</span>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800/80 flex items-center justify-between">
          <span>Competition Prototype v1.0</span>
          <span>College Debugging Platform</span>
        </div>
      </div>
    </div>
  );
};
