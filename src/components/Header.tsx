import React from "react";
import { ShieldCheck, Lock, Terminal, Cloud, HardDrive, FileText, Cpu, Award, Zap } from "lucide-react";
import { TabType } from "../types";

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onRunQuickSync: () => void;
  isSyncing: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onRunQuickSync, isSyncing }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar info */}
        <div className="py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl shadow-lg shadow-emerald-500/10 border border-emerald-400/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  ANDROID-RCLONE <span className="px-2 py-0.5 text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">ZCORE v1.0.0</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Le Camion Blindé pour Cloud • NetSecurePro Security & Legal Division
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Cert Badge */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-emerald-500/30 text-emerald-300 font-mono">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>NSP-LAW-AI-2026-9942-CERT</span>
            </div>

            {/* Crypto mode */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-slate-300 font-mono">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>AES-256 + Dilithium5</span>
            </div>

            {/* Quick Sync Button */}
            <button
              onClick={onRunQuickSync}
              disabled={isSyncing}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSyncing
                  ? "bg-emerald-600/50 text-emerald-200 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:scale-95"
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Sync /sdcard/IA_ZERO.07"}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab("readme")}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "readme"
                ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Doc & README</span>
          </button>

          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "terminal"
                ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Termux CLI (`arclone`)</span>
          </button>

          <button
            onClick={() => setActiveTab("remotes")}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "remotes"
                ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Remotes Chiffrés</span>
          </button>

          <button
            onClick={() => setActiveTab("vault")}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "vault"
                ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>Coffre & Queue Offline</span>
          </button>

          <button
            onClick={() => setActiveTab("cert")}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "cert"
                ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Attestation & RGPD</span>
          </button>

          <button
            onClick={() => setActiveTab("crypto")}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "crypto"
                ? "bg-slate-800 text-purple-400 border border-purple-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Dilithium5 (ML-DSA-87)</span>
          </button>

          <button
            onClick={() => setActiveTab("ai")}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "ai"
                ? "bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>IA Advisor NetSecurePro</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
