 "use client";
import React, { useState, useMemo } from "react";
import { ShieldCheck, RefreshCw, Printer } from "lucide-react";
import { INDICATORS, SECTORS, JURISDICTIONS, evaluateOrganizationHealth } from "../../../packages/rubric-engine/src/index.js";
import { ExtraTabs } from "./components/DashboardTabs";
import { ResultsPanel } from "./components/ResultsPanel";
import { PolicyScanner } from "./components/PolicyScanner";

export default function BeyondGovernanceTheatreApp() {
  const [activeTab, setActiveTab] = useState("audit");
  const [orgName, setOrgName] = useState("Nusantara Enterprise / University Demo");
  const [sector, setSector] = useState("Commercial");
  const [jurisdiction, setJurisdiction] = useState("Indonesia");
  const [scores, setScores] = useState<Record<string, number | null>>({
    "IV1.1": 2, "IV1.2": 2, "IV1.3": 1, "IV1.4": 2, "IV2.1": 1, "IV2.2": 0, "IV2.3": 0, "IV2.4": 1,
    "IV3.1": 1, "IV3.2": 1, "IV3.3": 0, "IV3.4": 0, "IV4.1": 1, "IV4.2": 0, "IV4.3": 0, "IV4.4": 1,
  });
  const [baseline, setBaseline] = useState<Record<string, number | null> | null>(null);

  const report = useMemo(
    () => evaluateOrganizationHealth({ orgName, sector, jurisdiction, scores, previousScores: baseline as any }),
    [orgName, sector, jurisdiction, scores, baseline]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="text-base font-bold text-white">Beyond Governance Theatre</h1>
              <p className="text-[11px] text-slate-400">Maryatin Gunadi (ORCID: 0009-0001-8988-5372) • 24-Indicator AI Audit & RegTech Suite</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[{ id: "audit", l: "1. AI Health Check" }, { id: "regulator", l: "2. Regulator Suite" }, { id: "benchmarks", l: "3. Benchmarks" }, { id: "pricing", l: "4. Licensing" }].map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-3 py-1.5 rounded text-xs font-bold ${activeTab === t.id ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300"}`}>{t.l}</button>
            ))}
            <button onClick={() => window.print()} className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-sky-500/20 border border-sky-500/40 text-sky-300 hover:bg-sky-500/30">
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF Report
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {activeTab !== "audit" ? (
          <ExtraTabs activeTab={activeTab} jurisdiction={jurisdiction} report={report} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-5">
              <PolicyScanner onApplyScores={(detected) => setScores(detected)} />
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input value={orgName} onChange={(e) => setOrgName(e.target.value)} className="bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white" />
                  <select value={sector} onChange={(e) => setSector(e.target.value)} className="bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white">{SECTORS.map((s) => <option key={s}>{s}</option>)}</select>
                  <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className="bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white">{JURISDICTIONS.map((j) => <option key={j}>{j}</option>)}</select>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">0=Missing | 1=Informal | 2=AI-Specific | NA=Unverified</span>
                  <button onClick={() => setBaseline({ ...scores })} className="flex items-center gap-1 px-2.5 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded text-xs"><RefreshCw className="w-3 h-3" /> Lock Baseline (Check Again)</button>
                </div>
                <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
                  {INDICATORS.map((ind) => (
                    <div key={ind.id} className="p-3 bg-slate-950 border border-slate-800 rounded flex justify-between items-center gap-2">
                      <div>
                        <p className="text-xs font-bold text-white"><span className="text-emerald-400 font-mono mr-1.5">{ind.id}</span>{ind.label}</p>
                        <p className="text-[10px] text-slate-400">{ind.reg[jurisdiction as "Indonesia" | "International"]}</p>
                      </div>
                      <div className="flex gap-1">
                        {[{ v: 0, l: "0" }, { v: 1, l: "1" }, { v: 2, l: "2" }, { v: null, l: "NA" }].map((o) => (
                          <button key={o.l} onClick={() => setScores((p) => ({ ...p, [ind.id]: o.v }))} className={`px-2.5 py-1 rounded text-xs font-bold border ${(scores[ind.id] ?? null) === o.v ? "bg-emerald-500 text-slate-950 border-emerald-400" : "bg-slate-900 text-slate-400 border-slate-700"}`}>{o.l}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-5"><ResultsPanel orgName={orgName} report={report} /></div>
          </div>
        )}
      </main>
    </div>
  );
}
