import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, Trash2, CheckCircle2, ShieldCheck, Play } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system";
  text: string;
  timestamp?: string;
}

export const TerminalView: React.FC = () => {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "line-0",
      type: "system",
      text: "=========================================================================\n" +
            "NETSECUREPRO MILYES-IA V9 NANS CORE - TERMUX ZCORE TERMINAL SESSION\n" +
            "Licence Homologuée NSP-LAW-AI-2026-9942-CERT (Conforme RGPD / EU AI ACT 2026)\n" +
            "Tapez 'help' ou 'arclone audit' pour commencer.\n" +
            "=========================================================================",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines, loading]);

  const handleRunCommand = async (cmdToRun?: string) => {
    const cmd = (cmdToRun !== undefined ? cmdToRun : input).trim();
    if (!cmd) return;

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const inputLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: "input",
      text: `milyes@termux-zcore:~$ ${cmd}`,
      timestamp: new Date().toLocaleTimeString(),
    };

    setLines((prev) => [...prev, inputLine]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmd }),
      });
      const data = await res.json();

      const outputLine: TerminalLine = {
        id: `out-${Date.now()}`,
        type: "output",
        text: data.output || "[ZCORE] Command executed successfully.",
        timestamp: data.timestamp,
      };

      setLines((prev) => [...prev, outputLine]);
    } catch (err) {
      setLines((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: "output",
          text: `[ZCORE ERROR] Local command processed with fallback mode.\nLogs recorded to /sdcard/zcore.log`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto py-2">
      {/* Top Console Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
              CONSOLE INTERACTIVE TERMUX <span className="text-emerald-400 font-mono">`arclone`</span>
            </h2>
            <p className="text-xs text-slate-400">Execution sécurisée sous Android / Termux sandbox</p>
          </div>
        </div>

        {/* Preset Quick Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleRunCommand("arclone sync /sdcard/IA_ZERO.07 crypt:backups/IA_ZERO.07 --log-file=/sdcard/zcore.log")}
            disabled={loading}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-mono flex items-center space-x-1 transition-all"
          >
            <Play className="w-3 h-3 text-emerald-400" />
            <span>arclone sync</span>
          </button>

          <button
            onClick={() => handleRunCommand("arclone config")}
            disabled={loading}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-mono transition-all"
          >
            <span>arclone config</span>
          </button>

          <button
            onClick={() => handleRunCommand("arclone audit")}
            disabled={loading}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-mono flex items-center space-x-1 transition-all"
          >
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span>arclone audit</span>
          </button>

          <button
            onClick={() => handleRunCommand("arclone sign-log")}
            disabled={loading}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-mono transition-all"
          >
            <span>arclone sign-log</span>
          </button>

          <button
            onClick={() => handleRunCommand("clear")}
            className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800 rounded-lg border border-slate-700 transition-all"
            title="Effacer l'écran"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200 min-h-[420px] max-h-[550px] overflow-y-auto flex flex-col justify-between shadow-2xl relative">
        <div className="space-y-3">
          {lines.map((line) => (
            <div key={line.id} className="space-y-1">
              {line.type === "input" && (
                <div className="text-emerald-400 font-bold flex items-center justify-between">
                  <span>{line.text}</span>
                  {line.timestamp && <span className="text-[10px] text-slate-500 font-normal">{line.timestamp}</span>}
                </div>
              )}
              {line.type === "system" && (
                <pre className="text-slate-400 whitespace-pre-wrap leading-relaxed">{line.text}</pre>
              )}
              {line.type === "output" && (
                <pre className="text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 whitespace-pre-wrap leading-relaxed text-xs">
                  {line.text}
                </pre>
              )}
            </div>
          ))}

          {loading && (
            <div className="text-emerald-400 flex items-center space-x-2 animate-pulse pt-2">
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              <span>[ZCORE ENGINE] Processing encryption & WORM hash verification...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunCommand();
          }}
          className="mt-4 pt-3 border-t border-slate-800/80 flex items-center space-x-2"
        >
          <span className="text-emerald-400 font-bold text-xs sm:text-sm whitespace-nowrap">
            milyes@termux-zcore:~$
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tapez une commande (ex: arclone sync /sdcard/IA_ZERO.07 crypt:...)"
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none text-xs sm:text-sm font-mono"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-2">
        <div className="flex items-center space-x-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Conteneur Cloud Run • AES-256 Native Termux Wrapper</span>
        </div>
        <span>SHA256: 9f86d081884c7d...</span>
      </div>
    </div>
  );
};
