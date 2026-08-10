import React, { useState, useEffect } from "react";
import { HardDrive, ShieldCheck, FileCheck, RefreshCw, AlertTriangle, CheckCircle2, Lock } from "lucide-react";
import { AuditLog } from "../types";

export const VaultQueueView: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const localFiles = [
    {
      path: "/sdcard/IA_ZERO.07/core_memory.db",
      size: "8.4 MiB",
      modified: "2026-08-10 14:02 UTC",
      encryptedName: "d9f82a1b94e012c4.bin.crypt",
      status: "synced",
    },
    {
      path: "/sdcard/IA_ZERO.07/config_zcore.json",
      size: "142 KiB",
      modified: "2026-08-10 14:05 UTC",
      encryptedName: "a1c23d4e5f6a7b8c.bin.crypt",
      status: "synced",
    },
    {
      path: "/sdcard/NetSecurePro/vault_did.pem",
      size: "4.2 KiB",
      modified: "2026-08-10 14:08 UTC",
      encryptedName: "e1f2a3b4c5d6e7f8.bin.crypt",
      status: "offline_queued",
    },
  ];

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/logs");
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error("Failed to load audit logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-400" />
            <span>COFFRE LOCAL & QUEUE OFFLINE-FIRST</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Repertoire local: <code className="text-emerald-400 font-mono">/sdcard/IA_ZERO.07</code> & <code className="text-emerald-400 font-mono">/sdcard/NetSecurePro</code>.
            Fichiers mis en file d'attente hors-ligne jusqu'au rétablissement de la connexion.
          </p>
        </div>

        <button
          onClick={() => fetchLogs()}
          className="inline-flex items-center space-x-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-mono transition-all self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Rafraîchir État</span>
        </button>
      </div>

      {/* Local Files Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>FICHIERS LOCAUX & OBFUSCATION AES-256</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400">Offline Queue: Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Chemin Source</th>
                <th className="px-6 py-3">Taille</th>
                <th className="px-6 py-3">Obfuscation Remote</th>
                <th className="px-6 py-3">Statut Queue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {localFiles.map((file, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="px-6 py-3.5 font-bold text-slate-100">{file.path}</td>
                  <td className="px-6 py-3.5 text-slate-400">{file.size}</td>
                  <td className="px-6 py-3.5 text-emerald-400">{file.encryptedName}</td>
                  <td className="px-6 py-3.5">
                    {file.status === "synced" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Synchronisé
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-400">
                        <AlertTriangle className="w-3.5 h-3.5" /> En attente Offline
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WORM Audit Trail */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-400" />
            <span>JOURNAL D'AUDIT INALTÉRABLE WORM (`/sdcard/zcore.log`)</span>
          </h3>
          <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
            Conforme Loi 25 & RGPD
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {loading ? (
            <div className="text-slate-500 py-4">Chargement du journal d'audit WORM...</div>
          ) : logs.length === 0 ? (
            <div className="text-slate-500 py-4">Aucun enregistrement d'audit.</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                  <span className="text-emerald-400 font-bold">{log.action}</span>
                  <span className="text-[11px] text-slate-500">{log.timestamp}</span>
                </div>
                <div className="text-slate-200">{log.target}</div>
                <div className="flex flex-wrap items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-500">
                    SHA256: <code className="text-slate-300">{log.hash}</code>
                  </span>
                  <span className="text-purple-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {log.signature}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
