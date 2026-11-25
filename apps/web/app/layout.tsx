 import "./globals.css";

export const metadata = {
  title: "Beyond Governance Theatre — Organizational AI Audit & RegTech Suite",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased">{children}</body>
    </html>
  );
}
