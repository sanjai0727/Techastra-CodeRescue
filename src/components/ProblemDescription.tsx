import React from 'react';
import { Question } from '../types/competition';
import { HelpCircle, AlertCircle, FileCode, CheckCircle, Tag, Shield } from 'lucide-react';

interface ProblemDescriptionProps {
  question: Question;
}

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ question }) => {
  const getDifficultyBadge = (difficulty: Question['difficulty']) => {
    switch (difficulty) {
      case 'Basic':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-amber-950/60 text-amber-300 border-amber-500/30';
      case 'Advanced':
        return 'bg-rose-950/60 text-rose-300 border-rose-500/30';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1322] border border-slate-800 rounded-xl overflow-hidden shadow-lg select-text">
      {/* Header Info */}
      <div className="p-4 border-b border-slate-800 bg-[#0f172a]/80">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            Q{question.number}
          </span>
          <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${getDifficultyBadge(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
            <Tag className="w-3 h-3 text-cyan-400" />
            <span>{question.bugType}</span>
          </span>
          <span className="ml-auto px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
            +{question.points} Points
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
          {question.title}
        </h2>
      </div>

      {/* Body content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        {/* Description */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>Problem Description</span>
          </h3>
          <p className="whitespace-pre-line text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
            {question.description}
          </p>
        </div>

        {/* Expected Behavior */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Expected Behavior</span>
          </h3>
          <div className="bg-emerald-950/20 border border-emerald-800/30 p-3 rounded-lg text-emerald-200">
            {question.expectedBehavior}
          </div>
        </div>

        {/* I/O Format */}
        {(question.inputFormat || question.outputFormat) && (
          <div className="grid grid-cols-1 gap-2.5 bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
            {question.inputFormat && (
              <div>
                <span className="font-semibold text-slate-400 text-xs block mb-0.5">Input Format:</span>
                <p className="text-slate-300 font-mono text-xs">{question.inputFormat}</p>
              </div>
            )}
            {question.outputFormat && (
              <div>
                <span className="font-semibold text-slate-400 text-xs block mb-0.5">Output Format:</span>
                <p className="text-slate-300 font-mono text-xs">{question.outputFormat}</p>
              </div>
            )}
          </div>
        )}

        {/* Constraints */}
        {question.constraints && question.constraints.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Constraints</span>
            </h3>
            <ul className="list-disc list-inside space-y-1 bg-slate-900/40 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300">
              {question.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sample Test Case */}
        {question.visibleTests.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Sample Test Cases
            </h3>
            <div className="space-y-2">
              {question.visibleTests.map((t, idx) => (
                <div key={t.id} className="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-xs font-mono">
                  <div className="text-slate-400 text-[10px] font-sans font-medium mb-1">
                    Sample Case #{idx + 1} {t.description ? `(${t.description})` : ''}
                  </div>
                  <div className="text-slate-300"><span className="text-slate-500">Input: </span>{t.input}</div>
                  <div className="text-emerald-400"><span className="text-slate-500">Expected: </span>{t.expectedOutput}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hint / Debug Advice */}
        {question.hints && (
          <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Debugging Tip:</span>
              <p className="text-cyan-200/90">{question.hints}</p>
            </div>
          </div>
        )}

        {/* Anti-cheat disclaimer */}
        <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Contest integrity: All code submissions are evaluated against hidden test suites.</span>
        </div>
      </div>
    </div>
  );
};
