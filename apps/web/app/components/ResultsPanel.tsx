 "use client";
import React, { useState } from "react";
import { AlertTriangle, Sparkles, FileWarning, CheckCircle2, ShieldAlert } from "lucide-react";

export function ResultsPanel({ orgName, report }: { orgName: string; report: any }) {
  const [decision, setDecision] = useState("undecided");
  const [rating, setRating] = useState<number | null>(null);
  const c = report.constructPercentages;

  const dvList = [
    { code: "DV1", label: "Financial (FIP)", ok: c.IV4 >= 50 },
    { code: "DV2", label: "Legal/Reg (LCP)", ok: c.IV2 >= 60 && c.IV3 >= 60 },
    { code: "DV3", label: "Cybersecurity (CSP)", ok: c.IV2 >= 60 },
    { code: "DV4", label: "Operational (OPP)", ok: c.IV4 >= 60 },
    { code: "DV5", label: "Reputation (RVP)", ok: !report.isGovernanceTheatre && report.healthScore >= 55 },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-400 uppercase">Organizational AI Health</p>
            <p className="text-3xl font-extrabold text-white">{report.healthScore}% <span className="text-sm px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Grade {report.grade}</span></p>
          </div>
          {report.reAuditDelta && (
            <div className="bg-sky-500/10 border border-sky-500/30 px-3 py-1.5 rounded text-right">
              <p className="text-[10px] text-sky-300">Check-Again Delta</p>
              <p className="text-sm font-bold text-sky-400">{report.reAuditDelta.delta >= 0 ? `+${report.reAuditDelta.delta}%` : `${report.reAuditDelta.delta}%`}</p>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg border text-xs ${report.isGovernanceTheatre ? "bg-rose-950/40 border-rose-500/40 text-rose-200" : "bg-emerald-950/30 border-emerald-500/30 text-emerald-200"}`}>
          <p className="font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> {report.isGovernanceTheatre ? `GOVERNANCE THEATRE (${report.theatreGap}% Gap)` : `Aligned Governance (Gap: ${report.theatreGap}%)`}</p>
          <p className="mt-1">IV1 Policy: {c.IV1}% | IV2 Tech: {c.IV2}% | IV3 Gov: {c.IV3}% | IV4 Telemetry: {c.IV4}% | NA: {report.unverifiedNaCount}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-sky-400" /> 5-Dimension Audited Performance Forecast (DV1–DV5)</p>
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {dvList.map((d) => (
              <div key={d.code} className={`p-1.5 rounded border text-[10px] ${d.ok ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" : "bg-rose-950/40 border-rose-500/30 text-rose-300"}`}>
                <p className="font-bold">{d.code}</p>
                <p className="truncate">{d.label.split(" ")[0]}</p>
                <p className="font-bold mt-0.5">{d.ok ? "Safe" : "At Risk"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> 30-60-90 Day Remediation Plan ({report.roadmap.length})</h3>
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {report.roadmap.map((r: any) => (
            <div key={r.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded text-xs">
              <p className="font-bold text-emerald-400">{r.id} ({r.phase}) — <span className="text-amber-400">{r.status}</span></p>
              <p className="text-slate-200 mt-0.5">{r.advice}</p>
              <p className="text-slate-500 mt-0.5">Ref: {r.reg}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-white">Closing Decision & Incident Risk</h3>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setDecision("committed")} className={`p-2 rounded text-xs font-bold border ${decision === "committed" ? "bg-emerald-500 text-slate-950" : "bg-slate-950 text-slate-300 border-slate-700"}`}>Commit 30-60-90 Fix</button>
          <button onClick={() => setDecision("inaction")} className={`p-2 rounded text-xs font-bold border ${decision === "inaction" ? "bg-rose-600 text-white" : "bg-slate-950 text-slate-300 border-slate-700"}`}>Do Nothing (Accept Risk)</button>
        </div>
        {decision === "inaction" && (
          <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded text-xs space-y-1">
            <p className="font-bold text-rose-300 flex items-center gap-1"><FileWarning className="w-4 h-4" /> Unfixed Sickness to Incident Trajectory (M1-M3)</p>
            {report.risks.slice(0, 3).map((x: any) => <p key={x.id} className="text-rose-200">• {x.area}: {x.incident}</p>)}
            <p className="text-amber-300 font-bold pt-1">{report.sanctionTier.tier}</p>
          </div>
        )}
        {decision === "committed" && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded text-xs text-emerald-200">
            <p className="font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Safe-Harbor Charter Active</p>
            <p className="mt-1">{report.sanctionTier.safeHarbor}</p>
          </div>
        )}
        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">Diagnostic Feedback:</span>
          <div className="flex gap-1">{[1, 2, 3, 4, 5].map((s) => <button key={s} onClick={() => setRating(s)} className={`px-2 py-0.5 rounded ${rating === s ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-300"}`}>{s}★</button>)}</div>
        </div>
      </div>
    </div>
  );
}
