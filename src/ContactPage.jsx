// src/ContactPage.jsx
import React from "react";

export default function ContactPage() {
  const EMAIL = "Manjotsodhi03@gmail.com";
  const PHONE = "647-806-1566";
  const LINKEDIN = "https://www.linkedin.com/in/manjotsodhi/";
  const GITHUB = "https://github.com/yourhandle"; // ← update later

  return (
    <main className="min-h-screen text-white bg-black">
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-24">
        <h1 className="text-3xl font-bold mb-8">Contact</h1>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Email */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
            <div className="text-sm uppercase tracking-widest opacity-70">Email</div>
            <div className="mt-1 text-lg font-medium">{EMAIL}</div>
            <div className="mt-4 flex gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Send Email
              </a>
              <button
                onClick={() => navigator.clipboard?.writeText(EMAIL)}
                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
            <div className="text-sm uppercase tracking-widest opacity-70">Phone</div>
            <div className="mt-1 text-lg font-medium">{PHONE}</div>
            <div className="mt-4 flex gap-3">
              <a
                href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Call
              </a>
              <button
                onClick={() => navigator.clipboard?.writeText(PHONE)}
                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
              >
                Copy
              </button>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
            <div className="text-sm uppercase tracking-widest opacity-70">LinkedIn</div>
            <div className="mt-1 text-lg font-medium break-all">{LINKEDIN}</div>
            <div className="mt-4">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Open Profile
              </a>
            </div>
          </div>

          {/* GitHub (placeholder) */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
            <div className="text-sm uppercase tracking-widest opacity-70">GitHub</div>
            <div className="mt-1 text-lg font-medium break-all">{GITHUB}</div>
            <div className="mt-4">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Open GitHub
              </a>
            </div>
            <p className="mt-3 text-xs text-neutral-400">
            </p>
          </div>
        </div>

        
      </section>
    </main>
  );
}
