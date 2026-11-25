"use client";
import React, { useState } from "react";
import { X, Mail, CreditCard, Building, CheckCircle } from "lucide-react";

export function AccessCheckoutModal({ tier, onClose }: { tier: { name: string; price: string; desc: string } | null; onClose: () => void }) {
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("Invoice / Bank Transfer (IDR & USD)");
  const [submitted, setSubmitted] = useState(false);

  if (!tier) return null;

  const subject = encodeURIComponent(`[BGT Licensing] ${tier.name} Access Request — ${org || "Organization"}`);
  const body = encodeURIComponent(`Dear Dr. (Cand.) Maryatin Gunadi (ORCID: 0009-0001-8988-5372),\n\nWe request institutional access for:\n- Plan: ${tier.name} (${tier.price})\n- Organization: ${org}\n- Contact Email: ${email}\n- Preferred Payment/Procurement: ${method}\n\nPlease send the onboarding agreement and invoice details.`);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Institutional Access & Billing</span>
            <h3 className="text-lg font-bold text-white">{tier.name} — {tier.price}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 space-y-2">
            <p className="font-bold flex items-center gap-1.5 text-sm"><CheckCircle className="w-4 h-4 text-emerald-400" /> Access Request Prepared</p>
            <p>Click below to dispatch directly via your email client, or copy the procurement details for your Finance/Legal department.</p>
            <a href={`mailto:contact@beyondgovernancetheatre.org?subject=${subject}&body=${body}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold">
              <Mail className="w-4 h-4" /> Send Official Email Now
            </a>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <label className="block text-slate-300">Organization / Ministry / University Name
              <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="e.g., PT Bank Nusantara / Ministry of..." className="mt-1 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </label>
            <label className="block text-slate-300">Official Institutional Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="compliance@organization.com" className="mt-1 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </label>
            <label className="block text-slate-300">How Would You Like to Pay / Procure?
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="mt-1 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white">
                <option>Invoice / Bank Wire Transfer (USD & IDR / e-Katalog)</option>
                <option>Corporate Credit Card / Stripe Subscription</option>
                <option>60-Day Government / Regulator Sandbox Pilot</option>
              </select>
            </label>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-400 space-y-1">
              <p className="font-bold text-slate-200 flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-sky-400" /> Access & Payment Workflow:</p>
              <p>1. Submit details → 2. Receive Master License & Invoice (USD/IDR) → 3. Instant Tenant Key & Admin Dashboard activation within 24 hours.</p>
            </div>
            <button onClick={() => setSubmitted(true)} className="w-full py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 flex items-center justify-center gap-1.5">
              <Building className="w-4 h-4" /> Generate Access & Payment Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
