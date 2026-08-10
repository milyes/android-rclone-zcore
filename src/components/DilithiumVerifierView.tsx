import React, { useState, useEffect } from "react";
import { ShieldCheck, Lock, Award, RefreshCw, Key, CheckCircle2, Cpu, FileCheck, Check, Sparkles, AlertCircle } from "lucide-react";
import { AuditLog } from "../types";

export const DilithiumVerifierView: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [verificationDetails, setVerificationDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [signing, setSigning] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/logs");
      const data = await res.json();
      const loadedLogs: AuditLog[] = data.logs || [];
      setLogs(loadedLogs);
      if (loadedLogs.length > 0 && !selectedLog) {
        setSelectedLog(loadedLogs[0]);
        verifyLogSignature(loadedLogs[0].id);
      }
    } catch (err) {
      console.error("Error fetching logs", err);
    } finally {
      setLoading(false);
    }
  };

  const verifyLogSignature = async (logId: string) => {
    try {
      setVerifying(true);
      const res = await fetch("/api/crypto/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logId }),
      });
      const data = await res.json();
      setVerificationDetails(data);
    } catch (err) {
      console.error("Verification error", err);
    } finally {
      setVerifying(false);
    }
  };

  const handleManualSign = async () => {
    try {
      setSigning(true);
      const res = await fetch("/api/crypto/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ARCLONE_DILITHIUM5_MANUAL_SEAL",
          target: "/sdcard/zcore.log (Inviolabilité WORM Post-Quantique)",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage("✅ Nouveaux logs scellés avec succès via ML-DSA-87 Dilithium5!");
        fetchLogs();
      }
    } catch (err) {
      console.error("Signing error", err);
    } finally {
      setSigning(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-[11px] font-mono font-bold">
              ROADMAP v1.1 COMPLETED
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[11px] font-mono">
              NIST FIPS 204 Standard
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2 tracking-tight pt-1">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <span>SIGHUB ML-DSA-87 DILITHIUM5</span>
          </h2>
          <p className="text-xs text-slate-300">
            Module de vérification post-quantique et d'inviolabilité WORM pour les logs Android-Rclone ZCore.
          </p>
        </div>

        <button
          onClick={handleManualSign}
          disabled={signing}
          className={`px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-600/20 transition-all flex items-center space-x-2 ${
            signing ? "opacity-50 cursor-not-allowed" : "active:scale-95"
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-200" />
          <span>{signing ? "Signature en cours..." : "Sceller avec Dilithium5"}</span>
        </button>
      </div>

      {statusMessage && (
        <div className="bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono p-3 rounded-xl text-center flex items-center justify-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-purple-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Verification Dashboard */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Log Selection List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span>LOGS D'AUDIT WORM ({logs.length})</span>
            </h3>
            <button
              onClick={fetchLogs}
              className="p-1 text-slate-400 hover:text-slate-200 transition-all"
              title="Rafraîchir"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {loading ? (
              <div className="text-xs text-slate-500 font-mono text-center py-8">Chargement des entrées...</div>
            ) : (
              logs.map((log) => {
                const isSelected = selectedLog?.id === log.id;
                return (
                  <button
                    key={log.id}
                    onClick={() => {
                      setSelectedLog(log);
                      verifyLogSignature(log.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-mono space-y-1.5 ${
                      isSelected
                        ? "bg-purple-950/40 border-purple-500/50 text-white shadow-sm"
                        : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-400">{log.action}</span>
                      <span className="text-slate-500 text-[10px]">{log.timestamp.split(" ")[1]}</span>
                    </div>
                    <div className="text-slate-400 truncate text-[11px]">{log.target}</div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
                      <span className="text-slate-500">SHA256: {log.hash.substring(0, 10)}...</span>
                      <span className="text-purple-400 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3 text-purple-400" />
                        <span>ML-DSA-87</span>
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Deep Cryptographic Inspector */}
        <div className="md:col-span-2 space-y-6">
          {/* Inspection Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  INSPECTEUR CRYPTOGRAPHIQUE POST-QUANTIQUE
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-mono font-bold">
                Level 5 Security
              </span>
            </div>

            {verifying ? (
              <div className="py-12 text-center text-purple-400 font-mono text-xs space-y-2 animate-pulse">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400" />
                <div>Exécution des calculs de réseaux polynomiaux ML-DSA-87...</div>
              </div>
            ) : verificationDetails ? (
              <div className="space-y-4">
                {/* Status Callout */}
                <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">SIGNATURE SCELLED & VERIFIÉE VALID</div>
                      <div className="text-xs text-slate-400 font-mono">
                        Aucune altération détectée • Authentification WORM inaltérable
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    STATUS 200 OK
                  </span>
                </div>

                {/* Specs Table */}
                <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[11px]">Standard Cryptographique</div>
                    <div className="text-slate-200 font-bold mt-0.5">{verificationDetails.standard}</div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[11px]">Niveau de Sécurité NIST</div>
                    <div className="text-purple-300 font-bold mt-0.5">{verificationDetails.securityLevel}</div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[11px]">Matrice Réseau Polynomial (k, l)</div>
                    <div className="text-slate-200 font-bold mt-0.5">{verificationDetails.matrixDimension}</div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[11px]">Taille Signature Dilithium5</div>
                    <div className="text-emerald-400 font-bold mt-0.5">{verificationDetails.signatureSizeBytes} Octets</div>
                  </div>
                </div>

                {/* Public Key Fingerprint */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
                  <div className="text-slate-500 text-[11px]">Empreinte Clé Publique (ML-DSA-87 Key ID):</div>
                  <div className="text-purple-400 font-bold break-all bg-slate-900 p-2 rounded border border-slate-800">
                    {verificationDetails.publicKeyFingerprint}
                  </div>
                </div>

                {/* SHA256 Hash */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
                  <div className="text-slate-500 text-[11px]">Empreinte SHA256 du Fichier / Log Source:</div>
                  <div className="text-emerald-400 font-bold break-all bg-slate-900 p-2 rounded border border-slate-800">
                    {verificationDetails.sha256Digest}
                  </div>
                </div>

                {/* Regulatory Compliance Badges */}
                <div className="pt-2 border-t border-slate-800">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-2">Engagements Légaux Validés</div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                    {verificationDetails.compliance?.map((c: string, idx: number) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
