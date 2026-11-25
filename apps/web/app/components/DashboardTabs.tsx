 "use client";
import React, { useState } from "react";
import { Scale, Activity, Lock, BookOpen, Shield, Mail, ExternalLink } from "lucide-react";
import { AccessCheckoutModal } from "./AccessCheckoutModal";
import { INDICATORS } from "../../../../packages/rubric-engine/src/index.js";

const MMAAII_ID = ["https://", "mmaaii", ".engagemedia.org/", "id/"].join("");

function officialUrl(label: string) {
  const s = label.toLowerCase();
  if (s.includes("menkominfo")) return "https://komdigi.go.id";
  if (s.includes("uu pdp")) return "https://bpk.go.id";
  if (s.includes("ojk") || s.includes("pojk")) return "https://ojk.go.id";
  if (s.includes("eu ai act")) return "https://europa.eu";
  if (s.includes("nist")) return "https://nist.gov";
  if (s.includes("42001")) return "https://iso.org";
  if (s.includes("owasp")) return "https://owasp.org";
  if (s.includes("gdpr")) return "https://europa.eu";
  return "/standards/TOE-STS-Full-Criteria-2026.pdf";
}

const OUTCOME_CRITERIA = [
  { id: "M1", label: "Harm Severity (0–3 Scale)", rule: "0=None | 1=Localized | 2=Serious | 3=Severe/Mass Disaster", idLabel: "MMAAII Indonesia Incident Database", idUrl: MMAAII_ID, intlLabel: "OECD AIM / AIID", intlUrl: "https://incidentdatabase.ai" },
  { id: "M2", label: "Stakeholder Reach (0–3 Scale)", rule: "0=None | 1=Individual | 2=Vulnerable/Community | 3=National/Public", idLabel: "MMAAII Indonesia Taxonomies & Laws", idUrl: MMAAII_ID, intlLabel: "AIAAIC Repository", intlUrl: "https://aiaaic.org" },
  { id: "M3", label: "Organizational Consequence (0–3 Scale)", rule: "0=None | 1=Inquiry/Suit | 2=Recall/Order | 3=Major Fine/Sanction", idLabel: "OJK / Komdigi Sanctions", idUrl: "https://komdigi.go.id", intlLabel: "OECD AI Paper No. 16", intlUrl: "https://doi.org" },
  { id: "DV1_FIP", label: "Financial & Resource Performance (FY2025)", rule: "0=Adverse | 1=Mixed/Stable | 2=Strong/Exceeded | Blank=NA", idLabel: "IDX Audited Report / LAKIN", idUrl: "https://idx.co.id", intlLabel: "SEC EDGAR 10-K/20-F / EMMA", intlUrl: "https://sec.gov" },
  { id: "DV2_LCP", label: "Legal & Compliance Performance (FY2025)", rule: "0=Qualified/Violation | 1=Mixed | 2=Clean WTP/ICFR | Blank=NA", idLabel: "BPK RI JDIH & Opini WTP", idUrl: "https://bpk.go.id", intlLabel: "SEC ICFR & Legal Filings", intlUrl: "https://sec.gov" },
  { id: "DV3_CDP", label: "Cybersecurity & Data Protection (FY2025)", rule: "0=Breach/Fail | 1=Controls/ISO 27001 | 2=Zero-Breach Verified | Blank=NA", idLabel: "UU PDP No. 27/2022 (Direct PDF)", idUrl: "https://bpk.go.id", intlLabel: "SEC Item 1C/16K Disclosures", intlUrl: "https://sec.gov" },
  { id: "DV4_OSP", label: "Operational Performance (FY2025)", rule: "0=Adverse KPI | 1=Mixed Delivery | 2=Broad KPI/SLA Growth | Blank=NA", idLabel: "IDX Operational KPIs", idUrl: "https://idx.co.id", intlLabel: "MSRB EMMA / Audited SLAs", intlUrl: "https://msrb.org" },
  { id: "DV5_RVP", label: "Reputation & Value Performance (Descriptive)", rule: "0=Adverse Trust | 1=Stable | 2=Verified Award/KPIP | Blank=NA", idLabel: "Indeks Kepuasan Publik (JDIH BPK)", idUrl: "https://bpk.go.id", intlLabel: "OECD Trust & Brand Audit", intlUrl: "https://oecd.org" },
];

export function ExtraTabs({ activeTab, jurisdiction, report }: { activeTab: string; jurisdiction: string; report: any }) {
  const [selectedTier, setSelectedTier] = useState<{ name: string; price: string; desc: string } | null>(null);

  if (activeTab === "criteria") {
    return (
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5 text-xs text-slate-300">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">24-Indicator Measurement Criteria, Academic Literature &amp; Official Regulatory Standards</h2>
            <p className="text-slate-400">Click any indicator for its rubric PDF, or click any Indonesia / International standard to open the official source document.</p>
          </div>
          <a href="/standards/TOE-STS-Full-Criteria-2026.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400">
            <ExternalLink className="w-4 h-4" /> Full 24-Indicator Rubric PDF
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
            <h3 className="font-bold text-emerald-400 text-sm">1. Ordinal Rubric &amp; Disclosure Shadow Rules</h3>
            <p><strong>Antecedents (IV1–IV4, 0–2):</strong> 0 = Missing | 1 = Informal / General IT | 2 = AI-Specific Control.</p>
            <p><strong>Incidents (M1–M3, 0–3):</strong> Verified across MMAAII, AIID, AIAAIC &amp; OECD AIM (Highest documented score).</p>
            <p><strong>Audited FY2025 Performance (DV1–DV5, 0–2):</strong> 0 = Adverse | 1 = Mixed | 2 = Strong | Blank/NA = Unverified (strict non-imputation for Disclosure Shadow).</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
            <h3 className="font-bold text-sky-400 text-sm">2. Academic &amp; Official Regulatory Sources</h3>
            <p><strong>Literature:</strong> Tornatzky &amp; Fleischer (1990); Trist &amp; Bamforth (1951); Meyer &amp; Rowan (1977); Bromley &amp; Powell (2012); Chincholikar &amp; Chawla (2026); Gunadi (2026).</p>
            <p><strong>Indonesia:</strong> UU PDP No. 27/2022 (BPK), SE Menkominfo No. 9/2023 (JDIH Komdigi), POJK No. 11/2022, OJK AI Governance, IDX &amp; BPK.</p>
            <p><strong>International:</strong> EU AI Act (EUR-Lex 2024/1689), ISO/IEC 42001:2023, NIST AI RMF 1.0, OWASP LLM Top 10, OECD AIM, AIID &amp; SEC EDGAR.</p>
          </div>
        </div>
        <div className="overflow-x-auto bg-slate-950 border border-slate-800 rounded-lg p-4">
          <h3 className="font-bold text-white text-sm mb-2">Part A: Governance, Risk &amp; Enabler Antecedents (IV1.1–IV4.4 • 0–2 Scale)</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-1.5 pr-3">ID</th>
                <th className="py-1.5 pr-3">Indicator (Rubric PDF)</th>
                <th className="py-1.5 pr-3">Indonesia Anchor (Official Source)</th>
                <th className="py-1.5">International Anchor (Official Source)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {INDICATORS.map((ind: any) => (
                <tr key={ind.id}>
                  <td className="py-1.5 pr-3 font-mono font-bold text-emerald-400">{ind.id}</td>
                  <td className="py-1.5 pr-3">
                    <a href={"/standards/" + ind.id + ".pdf"} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-emerald-400 underline">{ind.label}</a>
                  </td>
                  <td className="py-1.5 pr-3">
                    <a href={officialUrl(ind.reg.Indonesia)} target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-200 underline">{ind.reg.Indonesia}</a>
                  </td>
                  <td className="py-1.5">
                    <a href={officialUrl(ind.reg.International)} target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 underline">{ind.reg.International}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto bg-slate-950 border border-slate-800 rounded-lg p-4">
          <h3 className="font-bold text-white text-sm mb-2">Part B: Organizational AI Incidents (M1–M3) &amp; Audited Organizational Performance (DV1–DV5)</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-1.5 pr-3">ID</th>
                <th className="py-1.5 pr-3">Indicator &amp; Ordinal Scale</th>
                <th className="py-1.5 pr-3">Indonesia Archival Source</th>
                <th className="py-1.5">International Archival Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {OUTCOME_CRITERIA.map((item) => (
                <tr key={item.id}>
                  <td className="py-1.5 pr-3 font-mono font-bold text-emerald-400">{item.id}</td>
                  <td className="py-1.5 pr-3">
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-[11px] text-slate-400">{item.rule}</p>
                  </td>
                  <td className="py-1.5 pr-3">
                    <a href={item.idUrl} target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-200 underline">{item.idLabel}</a>
                  </td>
                  <td className="py-1.5">
                    <a href={item.intlUrl} target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 underline">{item.intlLabel}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  if (activeTab === "contact") {
    return (
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <Mail className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-lg font-bold text-white">Academic Correspondence, Repository &amp; Institutional Contact</h2>
            <p className="text-slate-400">Direct correspondence with the principal author and system architect</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2 leading-relaxed">
            <h3 className="font-bold text-emerald-400 text-sm">Principal Author &amp; Correspondence Address</h3>
            <p><strong className="text-white">Maryatin Gunadi</strong></p>
            <p><strong className="text-white">ORCID:</strong> <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">https://orcid.org</a></p>
            <p><strong className="text-white">GitHub Repository:</strong> <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">https://github.com</a></p>
            <p>Doctoral Program in Management — Management Information Systems, President University</p>
            <p>Jalan Ki Hajar Dewantara, Kota Jababeka, Cikarang Baru, Bekasi Regency 17550, West Java, Indonesia</p>
            <p className="pt-1"><strong className="text-white">Email:</strong> <a href="mailto:maryatin.gunadi@doctoral.president.ac.id" className="text-emerald-400 font-semibold underline">maryatin.gunadi@doctoral.president.ac.id</a></p>
            <p className="text-[11px] text-slate-400 pt-1">The author declares no conflict of interest. This research received no external funding.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-3">
            <h3 className="font-bold text-white text-sm">Direct Email &amp; Open-Source Repository</h3>
            <p className="text-slate-400">For academic collaboration, regulator Safe-Harbor pilot deployments, or enterprise licensing:</p>
            <div className="flex flex-wrap gap-2">
              <a href="mailto:maryatin.gunadi@doctoral.president.ac.id?subject=Beyond%20Governance%20Theatre%20-%20Inquiry" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400">
                <Mail className="w-4 h-4" /> maryatin.gunadi@doctoral.president.ac.id
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700">
                GitHub Source Code
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activeTab === "docs") {
    return (
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-lg font-bold text-white">Technical Documentation, Research Protocol &amp; Intellectual Property</h2>
            <p className="text-slate-400">© 2026 Maryatin Gunadi (ORCID: 0009-0001-8988-5372) • Created November 2026 • Patent &amp; Copyright Protected</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
            <h3 className="font-bold text-white text-sm">1. Standard Operating Procedure</h3>
            <p><strong>A. Document Ingestion:</strong> Upload Corporate Annual Report (PDF) or AI Charter in Tab 1.</p>
            <p><strong>B. Psychometric Coding:</strong> Evaluates 16 antecedents (IV1.1–IV4.4) and incident exposure (M1–M3) with strict non-imputation (NA ≠ 0).</p>
            <p><strong>C. Remediation &amp; Re-Audit:</strong> Execute the 30-60-90 day plan and generate a Board Audit Certificate.</p>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-400" /> 2. Intellectual Property &amp; Citation</h3>
            <p><strong>Copyright &amp; IP:</strong> © 2026 Maryatin Gunadi. Proprietary Organizational AI Incident Prevention &amp; Performance Engine.</p>
            <p><strong>Citation:</strong> Gunadi, M. (2026). <em>Beyond Governance Theatre: Preventing Organizational AI Incidents to Unlock Audited Performance</em>. President University.</p>
            <p className="text-emerald-400 flex items-center gap-1 pt-1"><Mail className="w-3.5 h-3.5" /> maryatin.gunadi@doctoral.president.ac.id</p>
          </div>
        </div>
      </section>
    );
  }

  if (activeTab === "regulator") {
    return (
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Scale className="w-5 h-5 text-amber-400" /> Regulator Supervisory Control Plane ({jurisdiction})</h2>
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
          <p className="text-base font-bold text-amber-400">{report.sanctionTier.tier}</p>
          <p className="text-xs text-slate-300">{report.sanctionTier.ref}</p>
          <p className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-500/30">Safe-Harbor Cure: {report.sanctionTier.safeHarbor}</p>
        </div>
        <p className="text-xs text-slate-400">Empirical Insight (N = 99 Feasibility Sample): Mandatory filings omit 97.7% of publicly documented AI incidents (Chincholikar &amp; Chawla, 2026), while 70.7% (70/99; 100% in Indonesia) publish audited FY2025 performance records. A 90-Day Safe-Harbor Cure Window incentivizes transparent reporting.</p>
      </section>
    );
  }

  if (activeTab === "benchmarks") {
    const rows = [
      { s: "Commercial (FinTech/Corp)", n: "n=72 (6 ID, 66 Intl)", p: "64.2%", t: "56.9%", dv: "69.4% (50/72)", m: "1.44 / 3.0" },
      { s: "University & Higher Ed", n: "n=18 (3 ID, 15 Intl)", p: "61.8%", t: "52.8%", dv: "77.8% (14/18)", m: "1.39 / 3.0" },
      { s: "Public & Government", n: "n=6 (5 ID, 1 Intl)", p: "62.5%", t: "54.2%", dv: "83.3% (5/6)", m: "1.94 / 3.0" },
      { s: "Other / Non-Profit", n: "n=3 (0 ID, 3 Intl)", p: "54.2%", t: "50.0%", dv: "33.3% (1/3)", m: "1.33 / 3.0" },
    ];
    return (
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-400" /> Cross-Sector Benchmarks — Doctoral Proposal Feasibility Stage (N = 99)</h2>
            <p className="text-xs text-slate-400">Table 3.3 &amp; B1 Baseline (14 Indonesia + 85 International): IV1 Mean 1.258 (62.9%), IV2 Mean 1.111 (55.6%), IV3 Mean 1.167 (58.4%), IV4 Mean 1.242 (62.1%), Incident Mean 1.448/3.0, Audited DV1–DV4 Mean 1.675/2.0 (n=70; expanding to N = 198 in Dissertation Stage).</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1"><Lock className="w-3 h-3" /> Raw N=99 Sample Quarantined</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {rows.map((r) => (
            <div key={r.s} className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
              <div className="flex justify-between items-center">
                <p className="font-bold text-white text-sm">{r.s}</p>
                <span className="text-[11px] font-mono text-slate-400">{r.n}</span>
              </div>
              <p className="text-slate-400">Policy (IV1): <strong className="text-emerald-400">{r.p}</strong></p>
              <p className="text-slate-400">Tech (IV2): <strong className="text-amber-400">{r.t}</strong></p>
              <p className="text-slate-400">Theatre Rate: <strong className="text-rose-400">{r.g}</strong></p>
              <p className="text-slate-400">Audited FY25 DV: <strong className="text-emerald-300">{r.dv}</strong></p><p className="text-slate-400">Incident Mean (M): <strong className="text-sky-300">{r.m}</strong></p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const tiers = [
    { name: "Community & Academic", price: "$0 / mo", desc: "Open-source self-audit & DP Stage (N = 99) benchmarks." },
    { name: "Enterprise Pro", price: "$999 / mo", desc: "Unlimited audits, Annual Report PDF scanner, 30-60-90 roadmap & ISO 42001/UU PDP reports." },
    { name: "Regulator & Gov Suite", price: "$45,000 / yr", desc: "Multi-entity supervisory triage, Safe-Harbor portal & on-premise deployment." },
  ];
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div key={t.name} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <h3 className="font-bold text-white">{t.name}</h3>
            <p className="text-2xl font-extrabold text-emerald-400">{t.price}</p>
            <p className="text-xs text-slate-400">{t.desc}</p>
            <button onClick={() => setSelectedTier(t)} className="w-full py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs">Request Access &amp; Billing</button>
          </div>
        ))}
      </section>
      <AccessCheckoutModal tier={selectedTier} onClose={() => setSelectedTier(null)} />
    </>
  );
}


