'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Design A — Premium minimal fix. Same structure, corrected craft.
   Calm Unsplash imagery (fictional project). */
const WORKS = [
  {
    title: 'Hale Residence',
    meta: 'Carmel, California — 2024',
    scope: 'Full home · 2,400 sq ft',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Atelier Meridian',
    meta: 'New York — 2023',
    scope: 'Loft · 1,800 sq ft',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Casa Alba',
    meta: 'Austin, Texas — 2023',
    scope: 'New build · 3,100 sq ft',
    img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop',
  },
];

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 shrink-0">
    <circle cx="8" cy="8" r="7.2" stroke="#7a5f36" strokeWidth="1.2" />
    <path d="M5.5 8.2 7.2 9.9 10.6 6.3" stroke="#7a5f36" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function DesignA() {
  const root = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.da-hero-line', { yPercent: 110, duration: 1.15, stagger: 0.12, ease: 'power4.out', delay: 0.15 });
      gsap.from('.da-hero-fade', { y: 22, opacity: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out', delay: 0.6, clearProps: 'all' });
      gsap.from('.da-hero-img', { clipPath: 'inset(10% 5% 10% 5%)', scale: 1.06, duration: 1.5, ease: 'power3.out', delay: 0.3, clearProps: 'clipPath' });
      gsap.utils.toArray('.da-reveal').forEach((el) => {
        gsap.from(el, {
          y: 28, opacity: 0, duration: 0.85, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
      gsap.to('.da-marquee-track', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
      gsap.utils.toArray('[data-da-count]').forEach((el) => {
        const target = Number(el.getAttribute('data-da-count'));
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-[#f7f3ed] text-[#1b1814]">
      <a href="#da-main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#1b1814] focus:px-4 focus:py-2 focus:text-sm focus:text-[#f7f3ed]">
        Skip to content
      </a>

      {/* Nav — with mobile menu */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e2d7c2] bg-[#f7f3ed]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#da-top" className="font-serif-d text-[1.55rem] leading-none tracking-tight" aria-label="Lumen and Oak home">
            Lumen <span className="text-[#7a5f36]">&amp;</span> Oak
            <span className="ml-3 hidden align-middle text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#1b1814]/45 sm:inline">Est. 2011</span>
          </a>
          <nav className="hidden items-center gap-9 text-[12.5px] font-semibold tracking-[0.2em] uppercase md:flex" aria-label="Primary">
            <a href="#da-work" className="relative py-1 text-[#1b1814]/75 transition hover:text-[#1b1814] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#1b1814] after:transition-all hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4">Work</a>
            <a href="#da-studio" className="relative py-1 text-[#1b1814]/75 transition hover:text-[#1b1814] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#1b1814] after:transition-all hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4">Studio</a>
            <a href="#da-process" className="relative py-1 text-[#1b1814]/75 transition hover:text-[#1b1814] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#1b1814] after:transition-all hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4">Process</a>
            <a href="#da-contact" className="rounded-full bg-[#1b1814] px-6 py-3 text-[#f7f3ed] transition hover:-translate-y-px hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4">
              Book a consult →
            </a>
          </nav>
          <button
            className="rounded-full border border-[#1b1814]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="da-mobile-menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        {menuOpen && (
          <nav id="da-mobile-menu" className="border-t border-[#e2d7c2] bg-[#f7f3ed] px-6 py-4 md:hidden" aria-label="Mobile">
            {[
              ['Work', '#da-work'],
              ['Studio', '#da-studio'],
              ['Process', '#da-process'],
              ['Contact', '#da-contact'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-[#e2d7c2]/70 py-3.5 font-serif-d text-2xl last:border-0">
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="da-main">
        {/* Hero — declipped type, calm image */}
        <section id="da-top" className="mx-auto max-w-6xl px-6 pt-32 md:pt-44">
          <p className="da-hero-fade text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7a5f36]">Interior architecture — Carmel · New York</p>
          <h1 className="font-serif-d mt-6 text-[12.5vw] leading-[1.02] tracking-[-0.02em] sm:text-7xl md:text-[6.8rem]">
            <span className="block overflow-hidden pb-1"><span className="da-hero-line block">Rooms that</span></span>
            <span className="block overflow-hidden pb-4"><span className="da-hero-line block italic font-medium">hold the light.</span></span>
          </h1>
          <div className="mt-6 grid items-end gap-8 md:grid-cols-12">
            <p className="da-hero-fade max-w-xl text-base leading-relaxed text-[#1b1814]/85 md:col-span-6">
              Lumen &amp; Oak is a boutique studio designing calm, light-filled homes.
              Every project begins with proportion, material honesty, and quiet restraint.
            </p>
            <div className="da-hero-fade flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end">
              <a href="#da-work" className="group rounded-full bg-[#1b1814] px-8 py-4 text-center text-sm font-semibold text-[#f7f3ed] transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4">
                View selected work <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#da-contact" className="rounded-full border border-[#1b1814]/25 px-8 py-4 text-center text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[#1b1814] hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-4">
                Start a project
              </a>
            </div>
          </div>
          <div className="da-hero-img relative mt-12 overflow-hidden rounded-[4px] bg-[#e9e0cf] shadow-[0_30px_80px_-40px_rgba(27,24,20,0.4)] h-[62vw] sm:h-[440px] md:h-[580px]">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop"
              alt="Minimal beige armchair in soft daylight with oak floor"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1150px"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-[#1b1814]/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur">Hale Residence — daylight study</span>
          </div>
        </section>

        {/* Stats — breathable, readable */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20" aria-label="Studio numbers">
          <div className="da-reveal grid grid-cols-1 divide-y divide-[#e2d7c2] rounded-[4px] border border-[#e2d7c2] bg-white/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { n: 14, label: 'Years of practice', sub: 'Since 2011' },
              { n: 120, label: 'Homes completed', sub: 'CA · NY · TX' },
              { n: 9, label: 'Design awards', sub: 'AD · Dwell · Dezeen' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-8 text-center md:py-10">
                <div className="font-serif-d text-5xl tabular-nums md:text-6xl"><span data-da-count={s.n}>0</span></div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1b1814]/80">{s.label}</div>
                <div className="mt-1 text-xs text-[#1b1814]/50">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Marquee — calmer, pausable */}
        <div className="group overflow-hidden border-y border-[#e2d7c2] bg-[#f3ecdd] py-4" aria-hidden="true">
          <div className="da-marquee-track marquee-track items-center font-serif-d text-xl italic text-[#1b1814]/70 group-hover:[animation-play-state:paused]">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
                {['Full-home design', 'Kitchen & bath', 'Custom millwork', 'Lighting plans', 'Styling & art'].map((t) => (
                  <span key={t} className="flex items-center gap-10 whitespace-nowrap"><span className="text-[13px] not-italic text-[#7a5f36]">●</span> {t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Work — numbered, linked, resilient images */}
        <section id="da-work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-28">
          <div className="da-reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7a5f36]">Selected work · 2023–2024</p>
              <h2 className="font-serif-d mt-4 max-w-xl text-5xl leading-[1.05] tracking-tight md:text-6xl">Three quiet houses, built around daylight</h2>
            </div>
            <a href="#da-contact" className="rounded-full border border-[#1b1814]/20 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:border-[#1b1814] hover:bg-[#1b1814] hover:text-[#f7f3ed]">Start yours →</a>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {WORKS.map((w, i) => (
              <article key={w.title} className="da-reveal group overflow-hidden rounded-[4px] border border-[#e2d7c2] bg-white/60 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(27,24,20,0.35)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e0cf]">
                  <Image src={w.img} alt={`${w.title} — ${w.scope}`} fill loading="lazy" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.05]" sizes="(max-width: 768px) 100vw, 400px" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#f7f3ed]/90 px-3 py-1 font-serif-d text-sm italic backdrop-blur">0{i + 1}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif-d text-[1.7rem] leading-tight">{w.title}</h3>
                  <p className="mt-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#1b1814]/55">{w.meta}</p>
                  <p className="mt-3 flex items-center justify-between border-t border-[#e2d7c2] pt-4 text-sm font-medium">
                    <span className="text-[#1b1814]/70">{w.scope}</span>
                    <span className="text-[#7a5f36] transition-transform group-hover:translate-x-1">View case →</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Studio — balanced, crafted checklist */}
        <section id="da-studio" className="scroll-mt-24 border-y border-[#e2d7c2] bg-[#efe6d2]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
            <div className="da-reveal">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7a5f36]">Studio philosophy</p>
              <h2 className="font-serif-d mt-4 text-5xl leading-[1.05] tracking-tight">Less, but <span className="italic">better considered.</span></h2>
              <div className="mt-8 flex gap-3">
                {['Oak', 'Plaster', 'Stone'].map((m) => (
                  <span key={m} className="rounded-full border border-[#1b1814]/15 bg-[#f7f3ed]/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1b1814]/70">{m}</span>
                ))}
              </div>
              <div className="relative mt-10 hidden overflow-hidden rounded-[4px] md:block aspect-[16/10] bg-[#e2d7c2]">
                <Image src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200&auto=format&fit=crop" alt="Lime plaster living room with natural oak furniture" fill loading="lazy" className="object-cover" sizes="550px" />
              </div>
            </div>
            <div className="da-reveal">
              <p className="text-[17px] leading-relaxed text-[#1b1814]/85">We believe a home should exhale. Our team of six keeps a deliberately small project list so each house gets full attention — from first survey to final styling day.</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#1b1814]/65">Daylight first, then plan, then palette. No mood-board chaos, no surprise fees — just rooms that hold the morning sun a little longer.</p>
              <ul className="mt-8 space-y-1 rounded-[4px] border border-[#e2d7c2] bg-[#f7f3ed]/70 p-2">
                {['Natural oak, lime plaster, honed stone', 'Daylight modelling before any fixture', 'Furniture plans drawn to the inch', 'One point of contact, weekly site notes'].map((li) => (
                  <li key={li} className="flex gap-3 rounded-[3px] px-4 py-3.5 text-[15px] text-[#1b1814]/85 transition hover:bg-white">{CHECK}{li}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process — real cards + quote separation */}
        <section id="da-process" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-28">
          <p className="da-reveal text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7a5f36]">How we work · 10–16 weeks</p>
          <h2 className="da-reveal font-serif-d mt-4 max-w-2xl text-4xl tracking-tight md:text-5xl">A calm process, week by week.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { n: '01', t: 'Survey & light study', d: 'Two weeks measuring, photographing and modelling daylight so the plan follows the sun.', tag: 'Weeks 1–2' },
              { n: '02', t: 'Design & materials', d: 'Plans, elevations and a tactile palette board. Two revision rounds, no surprise fees.', tag: 'Weeks 3–7' },
              { n: '03', t: 'Build & styling', d: 'Licensed contractors, weekly site visits, and a final styling day down to the stems.', tag: 'Weeks 8+' },
            ].map((s) => (
              <div key={s.n} className="da-reveal rounded-[6px] border border-[#e2d7c2] bg-white/70 p-8 shadow-[0_20px_50px_-30px_rgba(27,24,20,0.3)] transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(27,24,20,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="font-serif-d text-lg italic text-[#7a5f36]">{s.n}</span>
                  <span className="rounded-full bg-[#efe6d2] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1b1814]/60">{s.tag}</span>
                </div>
                <h3 className="font-serif-d mt-5 text-[1.75rem] leading-tight">{s.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1b1814]/70">{s.d}</p>
              </div>
            ))}
          </div>
          <figure className="da-reveal mx-auto mt-16 max-w-3xl rounded-[6px] border border-[#e2d7c2] bg-[#1b1814] px-8 py-12 text-center text-[#f7f3ed] md:px-14">
            <blockquote className="font-serif-d text-2xl italic leading-snug md:text-[2rem]">“They removed everything we didn&apos;t need — and suddenly the house felt twice as large.”</blockquote>
            <figcaption className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f7f3ed]/60">Hale Residence · Carmel, 2024</figcaption>
          </figure>
        </section>

        {/* Contact — labelled, focusable, with feedback */}
        <section id="da-contact" className="scroll-mt-24 bg-[#161310] text-[#f7f3ed]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
            <div className="da-reveal">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a86a]">New projects for spring · 2 slots left</p>
              <h2 className="font-serif-d mt-4 text-5xl leading-[1.02] tracking-tight md:text-6xl">Tell us about your house.</h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#f7f3ed]/70">Share a few lines — city, size, what feels off. We reply within two business days with next steps and honest fit.</p>
              <div className="mt-8 space-y-2 text-sm text-[#f7f3ed]/60">
                <p>hello@lumen-oak.example</p>
                <p>(415) 555-0132 · Carmel — New York</p>
              </div>
            </div>
            {sent ? (
              <div className="da-reveal flex flex-col justify-center rounded-[6px] border border-white/15 bg-white/5 p-10 text-center" role="status">
                <p className="font-serif-d text-4xl italic">Thank you.</p>
                <p className="mt-3 text-[15px] text-[#f7f3ed]/70">Demo received — in production this would reach the studio inbox. We&apos;d reply within 2 days.</p>
                <button onClick={() => setSent(false)} className="mx-auto mt-6 rounded-full border border-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-white/10">Send another</button>
              </div>
            ) : (
              <form className="da-reveal rounded-[6px] border border-white/12 bg-white/[0.04] p-6 backdrop-blur md:p-8" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="da-name" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7f3ed]/60">Name</label>
                    <input id="da-name" required placeholder="June Hale" autoComplete="name" className="w-full rounded-[3px] border border-white/20 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#c9a86a] focus:outline-none focus:ring-2 focus:ring-[#c9a86a]/30" />
                  </div>
                  <div>
                    <label htmlFor="da-email" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7f3ed]/60">Email</label>
                    <input id="da-email" required type="email" placeholder="june@example.com" autoComplete="email" className="w-full rounded-[3px] border border-white/20 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#c9a86a] focus:outline-none focus:ring-2 focus:ring-[#c9a86a]/30" />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="da-city" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7f3ed]/60">City + size</label>
                  <input id="da-city" placeholder="Carmel · 2,400 sq ft" className="w-full rounded-[3px] border border-white/20 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#c9a86a] focus:outline-none focus:ring-2 focus:ring-[#c9a86a]/30" />
                </div>
                <div className="mt-4">
                  <label htmlFor="da-msg" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7f3ed]/60">What does the house need?</label>
                  <textarea id="da-msg" rows={4} placeholder="Low morning light in the living room, oak floors we want to keep…" className="w-full rounded-[3px] border border-white/20 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#c9a86a] focus:outline-none focus:ring-2 focus:ring-[#c9a86a]/30" />
                </div>
                <button className="mt-5 w-full rounded-full bg-[#f7f3ed] py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[#1b1814] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-15px_rgba(247,243,237,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a86a]">
                  Request consultation →
                </button>
                <p className="mt-3 text-center text-xs text-[#f7f3ed]/40">Fictional demo — no message leaves your browser.</p>
              </form>
            )}
          </div>
          <footer className="border-t border-white/10">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-[13px] text-[#f7f3ed]/50 md:flex-row md:items-center md:justify-between">
              <span>© 2026 Lumen &amp; Oak Studio · Crafted with daylight</span>
              <span>hello@lumen-oak.example — (415) 555-0132</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
