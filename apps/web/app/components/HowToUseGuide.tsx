"use client";
import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export function HowToUseGuide() {
  const [open, setOpen] = useState(true);

  const steps = [
    { num: "Step 1", title: "Set Profile & Jurisdiction", desc: "Enter your organization name, select Sector (Commercial, University, Public, Research), and choose Indonesia or International regulations." },
    { num: "Step 2", title: "Scan Policy or Score Indicators", desc: "Upload/paste your AI policy in the Auto-Scanner OR score each indicator (0 = Missing, 1 = Informal IT, 2 = AI-Specific, NA = Unverified)." },
    { num: "Step 3", title: "Inspect Governance Theatre & Risks", desc: "Review your AI Health Grade, Policy-Practice Gap, 5-Dimension Performance Forecast (DV1–DV5), and 30-60-90 Day Remediation Plan." },
    { num: "Step 4", title: "Decide: Fix vs. Do Nothing", desc: "Choose 'Commit 30-60-90 Fix' to activate Safe-Harbor protection, or 'Do Nothing' to simulate unfixed AI incident trajectories (M1–M3)." },
    { num: "Step 5", title: "Export PDF & Check Again Later", desc: "Click 'Print / Save PDF Report' for board sign-off, and use 'Lock Baseline (Check Again)' after 30–90 days to verify improvement." },
  ];

  return (
    <section className="mb-6 bg-slate-900/90 border border-emerald-500/30 rounded-xl p-4 print:hidden">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-white">How to Use This Platform — 5-Step Organizational & Regulator Guide</h2>
        </div>
        <button className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
          {open ? <>Hide Guide <ChevronUp className="w-4 h-4" /></> : <>Show Guide <ChevronDown className="w-4 h-4" /></>}
        </button>
      </div>
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4">
          {steps.map((s) => (
            <div key={s.num} className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">{s.num}</span>
              <h3 className="text-xs font-bold text-white mt-0.5">{s.title}</h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
