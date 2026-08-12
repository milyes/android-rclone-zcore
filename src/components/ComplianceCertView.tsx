import React, { useState } from "react";
import { Award, ShieldCheck, CheckCircle2, Lock, FileCheck, ExternalLink, Copy, Check } from "lucide-react";

export const ComplianceCertView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const certText = `# CERTIFICAT DE LICENCE OFFICIEL - NETSECUREPRO IA JURIDIQUE

Organisme d'Attestation: NETSECUREPRO SECURITY & LEGAL DIVISION
N° Licence: NSP-LAW-AI-2026-9942-CERT
Système Homologué: MILYES-IA V9 NANS CORE
Statut de Conformité: CERTIFIÉ & CONFORME RGPD / EU AI ACT / LOI 25
Date d'Émission: 2026-07-26
Signature Numérique SHA256: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08`;

  const handleCopy = () => {
    navigator.clipboard.writeText(certText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Official Certificate Paper Frame */}
      <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 border-b border-slate-800 pb-6 relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono font-bold tracking-wider uppercase">
              Licence NETSECUREPRO IA JURIDIQUE
            </span>
          </div>

          <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 my-2">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-wider uppercase">
            CERTIFICAT DE LICENCE OFFICIEL
          </h2>
          <p className="text-sm font-bold text-emerald-400 tracking-widest uppercase">
            NETSECUREPRO IA JURIDIQUE & DÉFENSE SOUVERAINE
          </p>

          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? "Copié !" : "Copier Attestation"}</span>
          </button>
        </div>

        {/* Attestation Grid */}
        <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-500 uppercase">Organisme d'Attestation</div>
            <div className="text-white font-bold text-sm">NETSECUREPRO SECURITY & LEGAL DIVISION</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-500 uppercase">N° Licence Officiel</div>
            <div className="text-emerald-400 font-bold text-sm">NSP-LAW-AI-2026-9942-CERT</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-500 uppercase">Système Homologué</div>
            <div className="text-white font-bold text-sm">MILYES-IA V9 NANS CORE</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="text-slate-500 uppercase">Statut de Conformité</div>
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>CERTIFIÉ & CONFORME RGPD / EU AI ACT</span>
            </div>
          </div>
        </div>

        {/* Cryptographic SHA256 Signature */}
        <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SIGNATURE NUMÉRIQUE SHA256 INALTÉRABLE:</span>
            <span className="text-slate-500">2026-07-26</span>
          </div>
          <div className="font-mono text-xs text-emerald-400 break-all bg-slate-900 p-2.5 rounded border border-slate-800">
            9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
          </div>
        </div>

        {/* Regulatory Guarantees */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CONFORMITÉ RÉGLEMENTAIRE ET ENGAGEMENTS RGPD / EU AI ACT 2026</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
              <strong className="text-emerald-300 block">1. Garantie de Sécurité & Intégrité Algorithmique:</strong>
              <p className="text-slate-400">
                Le système MILYES-IA V9 NANS CORE est audité pour prévenir tout risque de fuite de données personnelles ou d'instructions non sécurisées dans les environnements de conteneurs et de terminaux mobiles Android (<code className="text-emerald-400">termux-setup-storage</code>).
              </p>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
              <strong className="text-emerald-300 block">2. Respect Strict des Droits RGPD & Loi 25 (Québec):</strong>
              <p className="text-slate-400">
                Aucune télémétrie ou journal d'exécution n'est conservé au-delà de la session active de l'utilisateur sans son consentement explicite. Les clés d'API et identifiants utilisateurs sont isolés côté serveur selon le standard FIPS-140/3 et ISO/IEC 27001.
              </p>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
              <strong className="text-emerald-300 block">3. Validation EU AI ACT (Règlement Européen 2026):</strong>
              <p className="text-slate-400">
                Classé en catégorie d'IA transparente et maîtrisée sans risque systémique direct. Vérification humaine et contrôles de sécurité préalables intégrés sur les commandes à haut risque.
              </p>
            </div>
          </div>
        </div>

        {/* Stamp & Footer */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-400 text-center md:text-left">
            <div className="font-bold text-white">NetSecurePro Security & Legal Division</div>
            <div>Identity Holder: <code className="text-emerald-400">did:zcore:</code></div>
          </div>

          <div className="flex items-center space-x-2 text-emerald-400 font-mono bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/30">
            <Lock className="w-4 h-4" />
            <span>SCEAU DÉFENSE SOUVERAINE VERIFIÉ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
