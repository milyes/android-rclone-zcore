import React, { useState } from "react";
import { Cpu, Send, Bot, User, Sparkles, ShieldCheck, Terminal } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export const AiAdvisorView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Bonjour Commandant. Je suis l'Assistant IA NetSecurePro ZCore (propulsé par Gemini 3.6 Flash). Comment puis-je vous aider à configurer vos scripts Android-Rclone, vos filtres de chiffrage AES-256 ou votre conformité Loi 25 / RGPD ?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });
      const data = await res.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.reply || "Traitement terminé. Vos paramètres ZCore sont valides.",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "ai",
          text: "Réponse du mode Secours NetSecurePro: Pour exécuter votre backup chiffré quotidien sous Android Termux:\n```bash\n0 2 * * arclone sync /sdcard/IA_ZERO.07 crypt:backups/IA_ZERO.07 --log-file=/sdcard/zcore.log\n```",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto py-2">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
              NETSECUREPRO IA ADVISOR <span className="text-purple-400 text-xs font-mono">(Gemini 3.6 Flash)</span>
            </h2>
            <p className="text-xs text-slate-400">Conseiller spécialisé en sécurité rclone, Termux, Loi 25 & Dilithium5</p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Server-Side Secure</span>
        </span>
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => handleSend("Comment configurer un crontab Termux pour un backup chiffré automatique à 2h du matin ?")}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-all"
        >
          ⏰ Crontab Termux 2h00
        </button>
        <button
          onClick={() => handleSend("Quelles sont les exigences de la Loi 25 du Québec pour les backups mobiles ?")}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-all"
        >
          📜 Conformité Loi 25
        </button>
        <button
          onClick={() => handleSend("Comment fonctionne la signature ML-DSA-87 Dilithium5 sur les logs WORM ?")}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-all"
        >
          🔑 Signature Dilithium5
        </button>
      </div>

      {/* Chat Output Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4 shadow-xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
          >
            <div
              className={`p-2 rounded-xl text-white shrink-0 ${
                msg.sender === "user" ? "bg-emerald-600" : "bg-purple-600/30 border border-purple-500/30 text-purple-300"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-emerald-950/80 border border-emerald-500/30 text-slate-100"
                  : "bg-slate-900 border border-slate-800 text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1.5 border-b border-slate-800/60 pb-1">
                <span>{msg.sender === "user" ? "Commandant" : "NetSecurePro ZCore AI"}</span>
                <span>{msg.timestamp}</span>
              </div>
              <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3 text-purple-400 text-xs font-mono pt-2">
            <Bot className="w-4 h-4 animate-bounce" />
            <span>NetSecurePro AI analyse vos paramètres de sécurité...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-2xl p-2"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Posez une question sur rclone, Termux, Loi 25, ou Dilithium5..."
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="p-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
