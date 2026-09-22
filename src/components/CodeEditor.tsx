import React, { useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { RotateCcw, Code2, ZoomIn, ZoomOut, Check, Loader2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onReset: () => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onReset,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
  readOnly = false
}) => {
  const [fontSize, setFontSize] = useState<number>(14);
  const [resetConfirm, setResetConfirm] = useState<boolean>(false);

  const handleEditorMount: OnMount = (editor, monaco) => {
    // Add command for Ctrl+Enter / Cmd+Enter to trigger Run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (!isRunning && !isSubmitting && !readOnly) {
        onRun();
      }
    });

    // Configure editor defaults
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontFamily: "'Fira Code', 'Consolas', monospace",
      fontLigatures: true,
      tabSize: 4,
      insertSpaces: true,
      lineNumbers: 'on',
      renderLineHighlight: 'all',
      automaticLayout: true
    });
  };

  const handleResetClick = () => {
    if (resetConfirm) {
      onReset();
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1322] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Editor Control Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#0f172a] select-none text-xs">
        {/* Left: Language & Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 text-cyan-400 font-mono font-medium">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Python 3.11</span>
          </div>
          {readOnly ? (
            <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-800/40 text-[11px]">
              Editor Locked (Round Ended)
            </span>
          ) : (
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">Ctrl+Enter</kbd> to Run
            </span>
          )}
        </div>

        {/* Right: Actions (Font zoom, Reset code) */}
        <div className="flex items-center gap-1.5">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-800/80 rounded border border-slate-700 px-1">
            <button
              onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
              className="p-1 text-slate-400 hover:text-slate-200"
              title="Decrease Font Size"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="px-1 text-[11px] font-mono text-slate-300">{fontSize}px</span>
            <button
              onClick={() => setFontSize(prev => Math.min(20, prev + 1))}
              className="p-1 text-slate-400 hover:text-slate-200"
              title="Increase Font Size"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Reset code */}
          <button
            onClick={handleResetClick}
            disabled={readOnly || isRunning || isSubmitting}
            className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
              resetConfirm
                ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700/80'
            }`}
            title="Reset code back to original broken state"
          >
            <RotateCcw className={`w-3 h-3 ${resetConfirm ? 'rotate-180 transition-transform' : ''}`} />
            <span>{resetConfirm ? 'Confirm Reset?' : 'Reset Code'}</span>
          </button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 relative min-h-[300px]">
        <Editor
          height="100%"
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorMount}
          options={{
            readOnly,
            fontSize,
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            padding: { top: 12, bottom: 12 },
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            fontFamily: "'Fira Code', 'Courier New', monospace"
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-[#0d1322] text-slate-400 gap-2 font-mono text-sm">
              <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
              <span>Initializing Monaco Editor...</span>
            </div>
          }
        />
      </div>

      {/* Bottom Action Ribbon */}
      <div className="px-4 py-2.5 bg-[#0b101d] border-t border-slate-800 flex items-center justify-between text-xs">
        <div className="text-slate-400 hidden sm:block">
          <span>Make sure your code returns the expected output for all test cases.</span>
        </div>

        <div className="flex items-center gap-2.5 ml-auto">
          {/* Run Code Button (Visible tests) */}
          <button
            onClick={onRun}
            disabled={readOnly || isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Run Code</span>
              </>
            )}
          </button>

          {/* Submit Solution Button (Hidden tests + score) */}
          <button
            onClick={onSubmit}
            disabled={readOnly || isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-900/30"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Submit Solution</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
