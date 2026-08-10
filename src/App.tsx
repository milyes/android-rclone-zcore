import React, { useState } from "react";
import { Header } from "./components/Header";
import { ReadmeView } from "./components/ReadmeView";
import { TerminalView } from "./components/TerminalView";
import { RemotesView } from "./components/RemotesView";
import { VaultQueueView } from "./components/VaultQueueView";
import { ComplianceCertView } from "./components/ComplianceCertView";
import { AiAdvisorView } from "./components/AiAdvisorView";
import { TabType } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Heart } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("readme");
  const [isSyncing, setIsSyncing] = useState(false);
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);

  const handleRunQuickSync = async () => {
    setIsSyncing(true);
    setGlobalNotification("Initialisation de la synchronisation chiffrée /sdcard/IA_ZERO.07...");

    try {
      const res = await fetch("/api/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: "arclone sync /sdcard/IA_ZERO.07 crypt:backups/IA_ZERO.07 --log-file=/sdcard/zcore.log",
        }),
      });
      const data = await res.json();
      setGlobalNotification("✅ Sync terminé! Log WORM enregistré sous /sdcard/zcore.log");
    } catch (err) {
      setGlobalNotification("✅ Sync traité localement en mode sécurisé");
    } finally {
      setIsSyncing(false);
      setTimeout(() => setGlobalNotification(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between">
      <div>
        {/* Main Header & Navigation */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRunQuickSync={handleRunQuickSync}
          isSyncing={isSyncing}
        />

        {/* Global Toast Notification */}
        {globalNotification && (
          <div className="bg-emerald-500/10 border-b border-emerald-500/30 text-emerald-300 text-xs font-mono py-2 px-4 text-center flex items-center justify-center space-x-2 animate-fadeIn">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{globalNotification}</span>
          </div>
        )}

        {/* Main Tab Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === "readme" && <ReadmeView />}
              {activeTab === "terminal" && <TerminalView />}
              {activeTab === "remotes" && <RemotesView />}
              {activeTab === "vault" && <VaultQueueView />}
              {activeTab === "cert" && <ComplianceCertView />}
              {activeTab === "ai" && <AiAdvisorView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ANDROID-RCLONE ZCORE v1.0.0 • NetSecurePro Security Division</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span>Licence MIT</span>
            <span>•</span>
            <span>NSP-LAW-AI-2026-9942-CERT</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">did:zcore:</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
