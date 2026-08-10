import React, { useState } from "react";
import { Copy, Check, Download, ExternalLink, ShieldAlert, Cpu, Terminal, Sparkles } from "lucide-react";

export const ReadmeView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-6 md:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
              LICENCE OFFICIELLE NSP-LAW-AI-2026-9942-CERT
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-mono">
              CONFORME RGPD & EU AI ACT 2026
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            ANDROID-RCLONE <span className="text-emerald-400">ZCORE</span>
          </h1>
          <p className="text-lg text-slate-300 font-medium italic">
            "Le Camion Blindé pour Cloud - Version NetSecurePro"
          </p>

          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
            Fork sécurisé de rclone optimisé pour Android et Termux. Conçu pour les environnements
            <strong className="text-emerald-300"> Offline-First, OT-Santé et PME</strong> qui exigent une souveraineté totale des données.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="https://github.com/milyes/android-rclone/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger APK v1.0.0</span>
            </a>
            <a
              href="https://github.com/milyes/android-rclone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 rounded-xl text-xs font-semibold transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Dépôt GitHub (`did:zcore:`)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Problem vs Solution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 border border-red-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-red-400 font-bold">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-base tracking-wide uppercase">LE PROBLÈME</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Les solutions de backup mobile classiques envoient vos données en clair sur le Cloud.
            Risque élevé sous la <strong className="text-red-300">Loi 25 (Québec/Canada)</strong>, fuite de PII, et dépendance réseau constante. Inacceptable pour la Santé, Finance et Défense.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base tracking-wide uppercase">LA SOLUTION ZCORE</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Un client de synchronisation chiffré côté client, fonctionnant en mode déconnecté (Offline-First),
            avec audit trail inaltérable <strong className="text-emerald-300">WORM (Write Once Read Many)</strong> et signature post-quantique <strong className="text-emerald-300">ML-DSA-87 Dilithium5</strong>.
          </p>
        </div>
      </div>

      {/* Feature Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>CARACTÉRISTIQUES TECHNIQUES CLÉS</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">NetSecurePro Standard</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Fonction</th>
                <th className="px-6 py-3">Détail Technique</th>
                <th className="px-6 py-3">Bénéfice Souveraineté</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              <tr className="hover:bg-slate-800/30">
                <td className="px-6 py-4 font-bold text-emerald-400">Chiffrage Client</td>
                <td className="px-6 py-4 font-mono text-slate-200">`AES-256 + Crypt` natif rclone</td>
                <td className="px-6 py-4 text-slate-300">Google/OneDrive ne voient que du bruit chiffré</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="px-6 py-4 font-bold text-emerald-400">Mode Offline</td>
                <td className="px-6 py-4 font-mono text-slate-200">`File Queue` + Sync auto à la reconnexion</td>
                <td className="px-6 py-4 text-slate-300">Fonctionne en zone OT/médicale sans réseau</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="px-6 py-4 font-bold text-emerald-400">Audit WORM</td>
                <td className="px-6 py-4 font-mono text-slate-200">`Logs anti-modification` SHA256 + Dilithium5</td>
                <td className="px-6 py-4 text-slate-300">Conformité Loi 25 et traçabilité judiciaire</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="px-6 py-4 font-bold text-emerald-400">Empreinte Légère</td>
                <td className="px-6 py-4 font-mono text-slate-200">&lt; 20MB • Optimisé ARM64</td>
                <td className="px-6 py-4 text-slate-300">Tourne sur n'importe quel Android 8+ et Termux</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="px-6 py-4 font-bold text-emerald-400">Multi-Cloud</td>
                <td className="px-6 py-4 font-mono text-slate-200">Drive, OneDrive, S3, Dropbox, SFTP</td>
                <td className="px-6 py-4 text-slate-300">Zéro vendor lock-in, indépendance complète</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quickstart Installation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">INSTALLATION RAPIDE - TERMUX (30 SECONDES)</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            Recommandé
          </span>
        </div>

        <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
          <button
            onClick={() =>
              copyToClipboard(
                "pkg update && pkg install git\ngit clone https://github.com/milyes/android-rclone.git\ncd android-rclone\n./install.sh\narclone config",
                "install-termux"
              )
            }
            className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all"
            title="Copier les commandes"
          >
            {copiedId === "install-termux" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <pre className="pr-12 space-y-1">
            <code>pkg update && pkg install git</code>{"\n"}
            <code>git clone https://github.com/milyes/android-rclone.git</code>{"\n"}
            <code>cd android-rclone</code>{"\n"}
            <code>./install.sh</code>{"\n"}
            <code>arclone config</code>
          </pre>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider">USAGE ZCORE - EXEMPLES CONCRETS</h3>

        <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="text-slate-400 font-sans font-semibold text-xs">1. Backup IA_ZERO.07 Chiffré</div>
            <div className="text-emerald-400 bg-slate-900 p-2.5 rounded border border-slate-800 overflow-x-auto">
              arclone sync /sdcard/IA_ZERO.07 crypt:backups/IA_ZERO.07 --log-file=/sdcard/zcore.log
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="text-slate-400 font-sans font-semibold text-xs">2. Restauration d'Urgence</div>
            <div className="text-emerald-400 bg-slate-900 p-2.5 rounded border border-slate-800 overflow-x-auto">
              arclone copy crypt:coffre/ /sdcard/Restore
            </div>
          </div>
        </div>
      </div>

      {/* Contact Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <div className="font-bold text-white text-sm">Mohammed Ilyes Zoubirou</div>
          <div className="text-slate-400">Fondateur NetSecurePro • Montréal, Québec, Canada</div>
          <div className="text-emerald-400 font-mono">milyes@netsecurepro.ca</div>
        </div>
        <div className="text-right font-mono text-slate-400">
          <div>Licence: MIT (Utilisation commerciale autorisée)</div>
          <div className="text-emerald-400">Classification: Open Source - Niveau Souveraineté</div>
        </div>
      </div>
    </div>
  );
};
