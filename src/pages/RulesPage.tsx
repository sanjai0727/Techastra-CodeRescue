import React, { useState } from 'react';
import { useCompetition } from '../context/CompetitionContext';
import { competitionRules, prohibitedAiTools } from '../data/rulesData';
import { ShieldAlert, CheckSquare, Square, ArrowRight, Play, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const RulesPage: React.FC = () => {
  const { state, startRound } = useCompetition();
  const [agreed, setAgreed] = useState(false);
  const [attemptedStartWithoutAgree, setAttemptedStartWithoutAgree] = useState(false);

  const handleStart = () => {
    if (!agreed) {
      setAttemptedStartWithoutAgree(true);
      return;
    }
    startRound(1);
  };

  return (
    <div className="min-h-[calc(100vh-60px)] max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4 space-y-1">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase">
          <FileText className="w-4 h-4" />
          <span>OFFICIAL COMPETITION BRIEFING</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Rules & Regulations
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Please review the official guidelines thoroughly before beginning Round 1.
        </p>
      </div>

      {/* Prohibited AI Alert Banner */}
      <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-3">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-sm sm:text-base">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <span>ZERO TOLERANCE: AI & Automated Code Generation Policy</span>
        </div>
        <p className="text-rose-200/90 text-xs leading-relaxed">
          The following generative AI systems and automated coding tools are <strong>strictly prohibited</strong> during all three rounds. 
          Use of these tools or accessing unauthorized websites will trigger immediate disqualification:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {prohibitedAiTools.map((tool) => (
            <span
              key={tool}
              className="px-2.5 py-1 rounded bg-rose-900/60 border border-rose-700/60 text-rose-200 text-xs font-mono font-semibold"
            >
              ✗ {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Rule Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competitionRules.map((section, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#0d1322] border border-slate-800 space-y-2.5 shadow-sm"
          >
            <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{section.title}</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {section.points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-cyan-500 mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Round 1 Heads-up Notice */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-slate-200 font-bold block text-sm">Next: Round 1 — Bug Hunt</span>
          <span className="text-slate-400">10 Questions • 20 Minutes • Minimum 50 Points to Qualify for Round 2</span>
        </div>
        <div className="px-3 py-1 rounded bg-cyan-950 border border-cyan-800/60 text-cyan-400 font-mono font-bold shrink-0">
          Timer starts immediately
        </div>
      </div>

      {/* Agreement Checkbox & CTA */}
      <div className="pt-2 border-t border-slate-800 space-y-4">
        <label
          onClick={() => {
            setAgreed(!agreed);
            setAttemptedStartWithoutAgree(false);
          }}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
            {agreed ? (
              <CheckSquare className="w-5 h-5" />
            ) : (
              <Square className="w-5 h-5 text-slate-500" />
            )}
          </div>
          <span className="text-xs sm:text-sm text-slate-200 font-medium">
            I have read, understood, and agree to abide by all the competition rules and regulations.
          </span>
        </label>

        {attemptedStartWithoutAgree && (
          <p className="text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>You must acknowledge and check the agreement box before entering Round 1.</span>
          </p>
        )}

        <div>
          <button
            onClick={handleStart}
            className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all ${
              agreed
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/40 cursor-pointer transform hover:-translate-y-0.5'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Round 1 — Bug Hunt</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
