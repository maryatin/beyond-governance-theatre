 "use client";
import React from "react";
import { Scale, Activity, Lock, DollarSign } from "lucide-react";

export function ExtraTabs({ activeTab, jurisdiction, report }: { activeTab: string; jurisdiction: string; report: any }) {
  if (activeTab === "regulator") {
    return (
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Scale className="w-5 h-5 text-amber-400" /> Regulator Supervisory Control Plane ({jurisdiction})</h2>
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
          <p className="text-base font-bold text-amber-400">{report.sanctionTier.tier}</p>
          <p className="text-xs text-slate-300">{report.sanctionTier.ref}</p>
          <p className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-500/30">Safe-Harbor Cure: {report.sanctionTier.safeHarbor}</p>
        </div>
        <p className="text-xs text-slate-400">Dissertation Insight: Punitive-only rules drive the 97.7% Corporate Disclosure Shadow. A 90-Day Safe-Harbor Cure Window incentivizes transparent reporting and technical remediation.</p>
      </section>
    );
  }
  if (activeTab === "benchmarks") {
    const rows = [
      { s: "Commercial (FinTech/Corp)", p: "78%", t: "41%", g: "64%" },
      { s: "University & Higher Ed", p: "65%", t: "34%", g: "58%" },
      { s: "Public & Government", p: "71%", t: "38%", g: "61%" },
      { s: "Research Institutes", p: "62%", t: "55%", g: "29%" },
    ];
    return (
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-400" /> Cross-Sector Benchmarks (Phase 1 Demo)</h2>
          <span className="text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-300 flex items-center gap-1"><Lock className="w-3 h-3" /> Raw N=198 Quarantined</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {rows.map((r) => (
            <div key={r.s} className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
              <p className="font-bold text-white text-sm">{r.s}</p>
              <p className="text-slate-400">Policy (IV1): <strong className="text-emerald-400">{r.p}</strong></p>
              <p className="text-slate-400">Tech (IV2): <strong className="text-amber-400">{r.t}</strong></p>
              <p className="text-slate-400">Theatre Rate: <strong className="text-rose-400">{r.g}</strong></p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  const tiers = [
    { name: "Community & Academic", price: "$0 / mo", desc: "Open-source self-audit & Phase 1 benchmarks." },
    { name: "Enterprise Pro", price: "$999 / mo", desc: "Unlimited audits, 30-60-90 roadmap, Check-Again tracking & ISO 42001/UU PDP reports." },
    { name: "Regulator & Gov Suite", price: "$45,000 / yr", desc: "Multi-entity supervisory triage, Safe-Harbor portal & on-premise deployment." },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((t) => (
        <div key={t.name} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <h3 className="font-bold text-white">{t.name}</h3>
          <p className="text-2xl font-extrabold text-emerald-400">{t.price}</p>
          <p className="text-xs text-slate-400">{t.desc}</p>
          <button onClick={() => alert(`Demo logged for ${t.name}`)} className="w-full py-2 rounded bg-emerald-500 text-slate-950 font-bold text-xs">Request Access</button>
        </div>
      ))}
    </section>
  );
}
