import React, { useState } from 'react';
import { ExecutionResult, Submission, TestCase } from '../types/competition';
import { Terminal, CheckCircle2, XCircle, AlertTriangle, History, Clock } from 'lucide-react';

interface ConsoleProps {
  lastResult: ExecutionResult | null;
  submissions: Submission[];
  visibleTests: TestCase[];
}

export const Console: React.FC<ConsoleProps> = ({ lastResult, submissions, visibleTests }) => {
  const [activeTab, setActiveTab] = useState<'tests' | 'terminal' | 'submissions'>('tests');

  const getStatusBadge = (status: ExecutionResult['status']) => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-semibold font-mono text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ACCEPTED</span>
          </span>
        );
      case 'WRONG_ANSWER':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-400 font-semibold font-mono text-xs">
            <XCircle className="w-3.5 h-3.5" />
            <span>WRONG ANSWER</span>
          </span>
        );
      case 'RUNTIME_ERROR':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-400 font-semibold font-mono text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>RUNTIME ERROR</span>
          </span>
        );
      case 'COMPILATION_ERROR':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-400 font-semibold font-mono text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>COMPILATION ERROR</span>
          </span>
        );
      case 'TIME_LIMIT_EXCEEDED':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/40 text-amber-400 font-semibold font-mono text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>TIME LIMIT EXCEEDED</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-[#0b101d] border border-slate-800 rounded-xl overflow-hidden shadow-lg h-full">
      {/* Console Header & Tabs */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0f172a] border-b border-slate-800 select-none text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('tests')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'tests'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Test Cases</span>
            {lastResult && (
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                lastResult.status === 'ACCEPTED' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-800 text-slate-300'
              }`}>
                {lastResult.visiblePassed}/{lastResult.visibleTotal}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Output</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'submissions'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Submissions</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
              {submissions.length}
            </span>
          </button>
        </div>

        {/* Execution Status Tag */}
        {lastResult && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              {lastResult.executionTimeMs}ms
            </span>
            {getStatusBadge(lastResult.status)}
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
        {/* Tab 1: Test Cases */}
        {activeTab === 'tests' && (
          <div>
            {!lastResult ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500">
                <Terminal className="w-8 h-8 mb-2 opacity-50 text-slate-600" />
                <p className="text-slate-400 font-sans">No execution results yet.</p>
                <p className="text-slate-600 text-[11px] mt-1 font-sans">
                  Click <span className="text-cyan-400 font-medium font-mono">Run Code</span> to test visible cases or <span className="text-emerald-400 font-medium font-mono">Submit Solution</span> to validate against all judge suites.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Visible Tests List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans font-medium px-1">
                    <span>VISIBLE TEST CASES ({lastResult.visiblePassed}/{lastResult.visibleTotal} Passed)</span>
                    {lastResult.hiddenTotal > 0 && (
                      <span className="text-cyan-400 font-mono">
                        HIDDEN JUDGE TESTS: {lastResult.hiddenPassed}/{lastResult.hiddenTotal} Passed
                      </span>
                    )}
                  </div>

                  {lastResult.testResults.filter(t => !t.isHidden).map((test, idx) => (
                    <div
                      key={test.testId || idx}
                      className={`p-3 rounded-lg border transition-colors ${
                        test.passed
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                          : 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {test.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                          <span className="font-bold text-slate-200 font-sans">
                            Test #{idx + 1}
                          </span>
                          {test.description && (
                            <span className="text-slate-400 text-[11px] font-sans">
                              — {test.description}
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          test.passed ? 'bg-emerald-900/60 text-emerald-300' : 'bg-rose-900/60 text-rose-300'
                        }`}>
                          {test.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-black/40 p-2.5 rounded border border-slate-800/80">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase tracking-wide">Input:</span>
                          <span className="text-slate-200 break-all">{test.input}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase tracking-wide">Expected Output:</span>
                          <span className="text-emerald-400 break-all">{test.expected}</span>
                        </div>
                        <div className="sm:col-span-2 pt-1 border-t border-slate-800/60">
                          <span className="text-slate-500 block text-[10px] uppercase tracking-wide">Your Output:</span>
                          <span className={test.passed ? 'text-emerald-300 break-all' : 'text-rose-400 break-all font-semibold'}>
                            {test.actual || (test.error ? test.error.split('\n')[0] : 'None')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hidden Tests Summary Banner (if submitted) */}
                {lastResult.hiddenTotal > 0 && (
                  <div className={`p-3 rounded-lg border text-xs font-sans flex items-center justify-between ${
                    lastResult.hiddenPassed === lastResult.hiddenTotal
                      ? 'bg-emerald-950/30 border-emerald-600/40 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-600/40 text-rose-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="font-bold">Hidden Judge Evaluation Suite: </span>
                        <span>{lastResult.hiddenPassed} of {lastResult.hiddenTotal} test cases passed.</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-xs">
                      {lastResult.hiddenPassed === lastResult.hiddenTotal ? '✓ 100% SUCCESS' : '✗ INCOMPLETE'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Terminal Output */}
        {activeTab === 'terminal' && (
          <div className="h-full">
            <pre className="p-3 bg-black/70 rounded-lg border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed text-xs overflow-x-auto min-h-[140px]">
              {lastResult ? lastResult.output : '>>> Python 3.11 Execution Environment Ready.\n>>> Run code or submit to view standard output and error tracebacks.\n'}
            </pre>
          </div>
        )}

        {/* Tab 3: Submissions History */}
        {activeTab === 'submissions' && (
          <div>
            {submissions.length === 0 ? (
              <div className="text-center py-8 text-slate-500 font-sans">
                <History className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-600" />
                <p>No submissions recorded for this problem yet.</p>
                <p className="text-xs text-slate-600 mt-1">Submit your solution to save an attempt in the official log.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-2.5 rounded bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                        Attempt #{sub.attemptNumber}
                      </span>
                      <span className="text-slate-400 text-[11px] font-sans">
                        {new Date(sub.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                        ({sub.result.executionTimeMs}ms)
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`font-mono font-bold text-xs ${
                        sub.scoreEarned > 0 ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        +{sub.scoreEarned} pts
                      </span>
                      {getStatusBadge(sub.result.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
