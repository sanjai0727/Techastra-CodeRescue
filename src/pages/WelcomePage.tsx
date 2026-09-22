import React from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { Bug, Brain, AlertOctagon, Terminal, ArrowRight, ShieldAlert, Cpu, Trophy, Sparkles } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const { setView } = useCompetition();

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col justify-between p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="pt-6 sm:pt-10 pb-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>OFFICIAL ANNUAL TECHNICAL SYMPOSIUM COMPETITION</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            CODE <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">RESCUE</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium text-slate-300 font-mono">
            Three-Round Debugging Challenge
          </p>
        </div>

        <div className="py-2">
          <blockquote className="inline-block px-6 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-cyan-400 font-mono text-sm sm:text-base italic shadow-inner">
            "Think. Debug. Fix. Rescue the Code!"
          </blockquote>
        </div>

        <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-sm leading-relaxed">
          Code Rescue is an elite, progressive debugging arena testing your software diagnosis ability, 
          logical acumen, edge-case intuition, and speed. Read broken programs, locate faulty statements, 
          remedy runtime crashes, and rescue the system before the countdown expires.
        </p>

        {/* Primary CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setView('registration')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Enter Competition</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setView('leaderboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-colors"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>View Benchmark Leaderboard</span>
          </button>
        </div>
      </div>

      {/* Three Round Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
        {/* Round 1 Card */}
        <div className="bg-[#0d1322] border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-cyan-950/20 group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🐞</span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                BASIC DIFFICULTY
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                ROUND 1 — BUG HUNT
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Syntax errors, missing statements, basic loops, and condition typos in short programs.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Format:</span>
                <span className="font-semibold text-slate-200">10 Questions (10 pts each)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-mono text-cyan-400">20 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Max Score:</span>
                <span className="font-mono font-bold text-slate-200">100 Points</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target: Fix syntax & pass visible assertions</span>
          </div>
        </div>

        {/* Round 2 Card */}
        <div className="bg-[#0d1322] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-amber-950/20 group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🧠</span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-500/30">
                INTERMEDIATE
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                ROUND 2 — LOGIC BREAKER
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Logical pitfalls, off-by-one loops, inverted conditions, mutable defaults, and edge cases.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Format:</span>
                <span className="font-semibold text-slate-200">5 Questions (20 pts each)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-mono text-amber-400">25 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Max Score:</span>
                <span className="font-mono font-bold text-slate-200">100 Points</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Target: Unravel subtle algorithmic defects</span>
          </div>
        </div>

        {/* Round 3 Card */}
        <div className="bg-[#0d1322] border border-slate-800 hover:border-rose-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-rose-950/20 group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🚨</span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-950/80 text-rose-400 border border-rose-500/30">
                ADVANCED SYSTEM
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                ROUND 3 — CODE RESCUE
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                A large broken production module containing multiple nested syntax, runtime, and logic faults.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Format:</span>
                <span className="font-semibold text-slate-200">1 Master Broken System</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-mono text-rose-400">40 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Max Score:</span>
                <span className="font-mono font-bold text-slate-200">100 Points</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>Target: Full end-to-end codebase rescue</span>
          </div>
        </div>
      </div>

      {/* Competition Highlights Footer Banner */}
      <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800/40 text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-100 block">Monaco Coding IDE</span>
            <span className="text-slate-400 text-[11px]">In-browser Python editor & test runner</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-rose-950 border border-rose-800/40 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-100 block">No AI Tools Allowed</span>
            <span className="text-slate-400 text-[11px]">Strict anti-cheat manual debugging</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-950 border border-amber-800/40 text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-100 block">Qualification Ladder</span>
            <span className="text-slate-400 text-[11px]">Pass each round threshold to advance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
