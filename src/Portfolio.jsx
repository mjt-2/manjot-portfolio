import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import profilePic from "./assets/profile.png";   // or .jpg if that’s your file extension

/* ---- Configs ---- */
const SKILLS = [
  "Python", "C/C++", "Java", "JavaScript/TypeScript", "SQL",
  "PyTorch", "scikit-learn", "Pandas", "NumPy", "Power BI", "SSRS",
  "React", "Next.js", "Tailwind CSS", "Node.js", "Express.js",
  "Verilog HDL", "FPGA", "MATLAB/Simulink", "Microcontrollers (Arduino, Raspberry Pi)",
  "Control Algorithms", "DSP", "Git/GitHub", "Docker", "AWS"
];


const ABOUT = `
I’m a final-year Computer Engineering student at McMaster University focusing on data analytics, machine learning, embedded systems, and software development. Experienced in SQL, SSRS, Power BI, Python, and ML evaluation, with hands-on work in FPGA/Verilog, microcontrollers, and control algorithms through industry roles and projects like RoboSub and LiDAR scanning, alongside full-stack development with React, Next.js, Tailwind, Node.js, and PostgreSQL.
`;

/* ---- UI bits ---- */
const cx = (...s) => s.filter(Boolean).join(" ");
// Stable gradient border (no thickness wobble)
function GlowCard({ className = "", children }) {
  return (
    <div className={cx("relative rounded-2xl", className)}>
      {/* Gradient border layer (exactly 1px) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          padding: 1, // exact 1px border
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.9), rgba(99,102,241,0.9), rgba(236,72,153,0.9))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          borderRadius: "1rem" // matches rounded-2xl visual
        }}
      />
      {/* Card body */}
      <div className="relative rounded-2xl bg-neutral-900 p-5">
        {children}
      </div>
    </div>
  );
}

function SkillBadge({ name }) {
  return (
    <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-fuchsia-400/60 hover:shadow-[0_0_18px_rgba(236,72,153,0.35)] hover:bg-white/[0.08]">
      <span className="text-sm text-white/90">{name}</span>
    </div>
  );
}

function BackgroundStars() {
  const ref = useRef(null);
  const raf = useRef(0);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d", { alpha: true });
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let W=0,H=0,shooting=null,last=0;
    const resize=()=>{ W=innerWidth; H=innerHeight; c.width=W*dpr; c.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
    const spawn=(t)=>{ if(t-last<2000||Math.random()>0.01) return; last=t; const L=Math.random()<.5; shooting={x:L?-100:W+100,y:Math.random()*H*.4,vx:L?6+Math.random()*3:-(6+Math.random()*3),vy:3+Math.random()*2,life:1}; };
    const draw=(t)=>{ ctx.fillStyle="#000"; ctx.fillRect(0,0,W,H);
      if(shooting){ const s=shooting; s.x+=s.vx; s.y+=s.vy; s.life*=.985;
        const g=ctx.createLinearGradient(s.x,s.y,s.x-s.vx*18,s.y-s.vy*18);
        g.addColorStop(0,`rgba(255,255,255,${.9*s.life})`); g.addColorStop(1,"rgba(255,255,255,0)");
        ctx.strokeStyle=g; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(s.x-s.vx*20,s.y-s.vy*20); ctx.stroke();
        ctx.globalAlpha=Math.max(0,s.life); ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(s.x,s.y,3,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
        if(s.life<.05||s.x<-200||s.x>W+200||s.y>H+200) shooting=null; }
      spawn(t); raf.current=requestAnimationFrame(draw);
    };
    resize(); raf.current=requestAnimationFrame(draw); addEventListener("resize",resize);
    return ()=>{ cancelAnimationFrame(raf.current); removeEventListener("resize",resize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" style={{background:"#000"}}/>;
}

export default function Home() {
  return (
    <main className="min-h-screen text-white relative bg-black">
      <BackgroundStars />
      <div className="relative z-10">
        {/* Hero + About + Photo */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-16 flex flex-col md:flex-row items-start gap-10">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest opacity-70">DATA/ML • SWE • SYSTEMS</p>
            <h1 className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Hey, I’m Manjot.</span>
            </h1>
            <p className="mt-4 text-neutral-300 text-lg md:text-xl max-w-2xl">Computer Engineering student @ McMaster University</p>

            <div className="mt-7">
              <h2 className="text-xl font-semibold mb-3">About Me</h2>
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-tr from-cyan-400 via-indigo-400 to-fuchsia-400">
                <div className="rounded-2xl bg-neutral-900 px-6 pt-4 pb-6">
                  <p className="m-0 text-neutral-300 leading-relaxed whitespace-pre-line">{ABOUT}</p>
                </div>
              </div>

            </div>
          </div>

          <div className="flex-shrink-0">
            {/* Put your photo at public/assets/profile.jpg (or src/assets + adjust path) */}
            <img src={profilePic} alt="Manjot Sodhi" className="w-64 h-64 md:w-96 md:h-96 rounded-2xl object-cover
               shadow-[0_0_12px_rgba(34,211,238,0.35),0_0_24px_rgba(99,102,241,0.25),0_0_36px_rgba(236,72,153,0.2)]" />
          </div>
        </section>

        {/* Skills */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 pt-4 pb-24">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-white/90">Technologies / Skills</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((s, i) => <SkillBadge key={i} name={s} />)}
          </div>
        </section>
      </div>

      <footer className="max-w-6xl mx-auto px-5 md:px-8 py-12 text-xs opacity-70">
        © {new Date().getFullYear()} Manjot Sodhi.
      </footer>
    </main>
  );
}
