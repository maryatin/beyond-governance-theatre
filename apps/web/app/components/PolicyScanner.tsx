"use client";
import React, { useState } from "react";
import { FileText, Wand2, Upload } from "lucide-react";

const SAMPLES: Record<string, string> = {
  "Bank Demo": "Our bank commits to ethical AI principles, fairness, and transparency disclosure to customers. We maintain general IT data privacy and acceptable use policies, though automated red-teaming and production drift telemetry are not yet deployed.",
  "University Demo": "The university encourages responsible AI literacy workshops for faculty and students and requires human-in-the-loop review for grading, while formal DPIA risk assessments and kill-switch SOPs remain under development.",
  "Assured Enterprise": "We enforce our public AI ethics charter, fairness testing, human-in-the-loop signoff, and user disclosure. Every model undergoes formal DPIA, safety guardrails, adversarial red-teaming, data lineage tracking, board governance committee oversight, vendor SOP, external ISO 42001 audit, 72-hour incident kill-switch, dedicated safety budget, staff training, continuous drift telemetry, and DPO legal-tech review."
};

export function PolicyScanner({ onApplyScores }: { onApplyScores: (s: Record<string, number | null>) => void }) {
  const [text, setText] = useState(SAMPLES["Bank Demo"]);
  const [scanMsg, setScanMsg] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setText(String(ev.target?.result || ""));
      setScanMsg(`Loaded "${file.name}" — click Auto-Scan to score.`);
    };
    reader.readAsText(file);
  };

  const handleScan = () => {
    const t = text.toLowerCase();
    const rules: [string, string[]][] = [
      ["IV1.1", ["ethic", "principle", "charter"]], ["IV1.2", ["fairness", "bias"]],
      ["IV1.3", ["human-in-the-loop", "human oversight", "hitl"]], ["IV1.4", ["transparen", "disclosure"]],
      ["IV2.1", ["dpia", "impact assessment", "risk assessment"]], ["IV2.2", ["guardrail", "filter", "safety"]],
      ["IV2.3", ["red-team", "adversarial", "stress test"]], ["IV2.4", ["provenance", "lineage", "data privacy"]],
      ["IV3.1", ["committee", "board"]], ["IV3.2", ["sop", "acceptable use", "vendor"]],
      ["IV3.3", ["external", "iso 42001", "independent audit"]], ["IV3.4", ["kill-switch", "incident", "72-hour"]],
      ["IV4.1", ["budget", "dedicated"]], ["IV4.2", ["literacy", "training", "workshop"]],
      ["IV4.3", ["drift", "telemetry", "monitoring"]], ["IV4.4", ["dpo", "legal-tech", "cross-functional"]]
    ];
    const detected: Record<string, number | null> = {};
    let hits = 0;
    for (const [id, keys] of rules) {
      const found = keys.some((k) => t.includes(k));
      detected[id] = found ? 2 : 0;
      if (found) hits++;
    }
    onApplyScores(detected);
    setScanMsg(`Scanned & scored ${hits}/16 indicators automatically!`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><FileText className="w-4 h-4 text-sky-400" /> AI Policy & Charter Auto-Scanner</h3>
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(SAMPLES).map((k) => (
            <button key={k} onClick={() => setText(SAMPLES[k])} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300">{k}</button>
          ))}
          <label className="cursor-pointer px-2 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-[10px] text-sky-300 flex items-center gap-1">
            <Upload className="w-3 h-3" /> Upload .txt/.md
            <input type="file" accept=".txt,.md,.csv" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>
      <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste AI charter or policy text..." className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200" />
      <div className="flex items-center justify-between gap-2">
        <button onClick={handleScan} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-bold text-xs hover:bg-sky-400">
          <Wand2 className="w-3.5 h-3.5" /> Auto-Scan Policy & Score Rubric
        </button>
        {scanMsg && <span className="text-xs text-emerald-400 font-medium">{scanMsg}</span>}
      </div>
    </div>
  );
}
