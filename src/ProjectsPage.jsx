// src/ProjectsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "./data/projects.js";

function NeonHoverCard({ className = "", children }) {
  return (
    <div className={`relative group isolate ${className}`}>
      {/* hover glow */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -inset-1 rounded-2xl
          opacity-0 blur-md transition-opacity duration-300
          bg-[conic-gradient(at_top_left,#22d3ee,#6366f1,#ec4899,#22d3ee)]
          group-hover:opacity-70
        "
      />
      {/* body */}
      <div className="relative rounded-2xl border border-white/10 bg-neutral-900 p-5 transition-transform duration-200 group-hover:-translate-y-1">
        {children}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen text-white bg-black">
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-24">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => {
            const CardInner = (
              <NeonHoverCard>
                {p.img && (
                  <img
                    src={p.img}
                    alt={p.title}
                    onError={(e) => {
                      // hide the <img> if the file is missing
                      e.currentTarget.style.display = "none";
                    }}
                    className="w-full h-40 object-cover rounded-xl border border-white/10 mb-3"
                  />
                )}

                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-neutral-300">{p.summary}</p>

                {!!p.tags?.length && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </NeonHoverCard>
            );

            // Notion projects open externally; local ones route to detail page
            return p.notionUrl ? (
              <a
                key={p.id}
                href={p.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {CardInner}
              </a>
            ) : (
              <Link key={p.id} to={`/projects/${p.id}`} className="block">
                {CardInner}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
