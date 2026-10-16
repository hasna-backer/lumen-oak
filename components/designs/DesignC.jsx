'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PAPER = '#f1eee7';
const INK = '#171310';
const SIGNAL = '#c8440c';
const LINE = '#d8d0be';

const WORKS = [
  { n: '01', title: 'Hale Residence', city: 'Carmel, CA', year: '2024', sqm: '380 SQM', scope: 'Full home',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop' },
  { n: '02', title: 'Atelier Meridian', city: 'New York, NY', year: '2023', sqm: '210 SQM', scope: 'Work + live',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop' },
  { n: '03', title: 'Casa Alba', city: 'Austin, TX', year: '2023', sqm: '290 SQM', scope: 'Full home',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop' },
  { n: '04', title: 'Dune Cottage', city: 'Malibu, CA', year: '2022', sqm: '180 SQM', scope: 'Retreat',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
  { n: '05', title: 'Foundry Loft', city: 'Brooklyn, NY', year: '2022', sqm: '240 SQM', scope: 'Conversion',
    img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop' },
  { n: '06', title: 'Alto Pavilion', city: 'Palm Springs, CA', year: '2021', sqm: '150 SQM', scope: 'Annex',
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200&auto=format&fit=crop' },
];

const JOURNAL = [
  { date: 'SEP 2026', title: 'Why we draw the sun before the plan', tag: 'METHOD' },
  { date: 'JUL 2026', title: 'Lime plaster, three ways it fails', tag: 'MATERIAL' },
  { date: 'MAY 2026', title: 'A 180 SQM retreat on one sheet', tag: 'PROJECT NOTE' },
];

export default function DesignC() {
  const root = useRef(null);
  const preview = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState(WORKS[0].img);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const ctx = gsap.context(() => {
      // Hero: wordmark slides, images wipe open, specs tick in.
      gsap.fromTo('.dc-hero-line', { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.09, ease: 'expo.out', delay: 0.15 });
      gsap.fromTo('.dc-hero-img', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, stagger: 0.15, ease: 'expo.inOut', delay: 0.35 });
      gsap.fromTo('.dc-hero-spec', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.9 });
      // Scroll: clip wipes for media, staggered rows.
      gsap.utils.toArray('.dc-wipe').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(12% 8% 12% 8%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        });
      });
      gsap.utils.toArray('.dc-rise').forEach((el) => {
        gsap.fromTo(el, { y: 28, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
      gsap.to('.dc-marquee-track', { xPercent: -50, duration: 26, ease: 'none', repeat: -1 });
      gsap.utils.toArray('[data-dc-count]').forEach((el) => {
        const target = Number(el.getAttribute('data-dc-count'));
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
        });
      });
      // Floating hover preview follows the cursor across the index.
      if (fine && preview.current) {
        const xTo = gsap.quickTo(preview.current, 'x', { duration: 0.45, ease: 'power3' });
        const yTo = gsap.quickTo(preview.current, 'y', { duration: 0.45, ease: 'power3' });
        const zone = root.current?.querySelector('.dc-index');
        const move = (e) => { xTo(e.clientX + 24); yTo(e.clientY - 140); };
        zone?.addEventListener('mousemove', move);
        return () => zone?.removeEventListener('mousemove', move);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="font-grot min-h-screen" style={{ background: PAPER, color: INK }}>
      {/* ——— Top spec bar ——— */}
      <div className="font-mono-t flex items-center justify-between border-b px-4 py-1.5 text-[10px] tracking-[0.22em] md:px-8" style={{ borderColor: LINE }}>
        <span>INTERIOR ARCHITECTURE — EST. 2011</span>
        <span className="hidden md:inline">34.05°N, 118.24°W — 40.71°N, 74.00°W</span>
        <span style={{ color: SIGNAL }}>● ACCEPTING SPRING PROJECTS</span>
      </div>

      {/* ——— Nav ——— */}
      <header className="sticky top-0 z-50 border-b backdrop-blur" style={{ background: `${PAPER}e6`, borderColor: LINE }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 md:px-8">
          <a href="#top" className="text-xl font-bold tracking-tight">
            LUMEN&amp;OAK<sup className="font-mono-t text-[10px] font-normal">®</sup>
          </a>
          <nav aria-label="Primary" className="font-mono-t hidden items-center gap-7 text-[12px] tracking-[0.18em] lg:flex">
            {['Interiors', 'Objects', 'Journal', 'Contact'].map((l, i) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="opacity-70 hover:opacity-100">
                <span style={{ color: SIGNAL }}>0{i + 1}</span> {l.toUpperCase()}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="font-mono-t hidden text-[12px] tracking-[0.18em] opacity-60 md:inline">LA—NYC</span>
            <a href="#contact" className="hidden px-5 py-2.5 text-[12px] font-bold tracking-[0.14em] text-[#f1eee7] sm:block" style={{ background: INK }}>
              START A PROJECT ↗
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center border text-xl lg:hidden"
              style={{ borderColor: LINE }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="font-mono-t border-t px-4 py-3 lg:hidden" style={{ borderColor: LINE }}>
            {[['Interiors', '#interiors'], ['Objects', '#objects'], ['Journal', '#journal'], ['Contact', '#contact']].map(([l, h], i) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b py-3 text-sm tracking-[0.18em]" style={{ borderColor: LINE }}>
                <span><span style={{ color: SIGNAL }}>0{i + 1}</span> {l.toUpperCase()}</span>
                <span>→</span>
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ——— Hero: asymmetric spread ——— */}
      <section id="top" className="mx-auto max-w-[1400px] px-4 pt-10 md:px-8 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="dc-hero-spec font-mono-t text-[11px] tracking-[0.3em]" style={{ color: SIGNAL }}>
              (01) — INTERIORS, OBJECTS, SITES
            </p>
            <h1 className="mt-4 text-[15vw] font-bold leading-[0.88] tracking-tighter lg:text-[7.5rem]">
              <span className="block overflow-hidden"><span className="dc-hero-line block">ROOMS</span></span>
              <span className="block overflow-hidden"><span className="dc-hero-line block">WITH A <span className="dc-outline-text">PULSE.</span></span></span>
            </h1>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <p className="dc-hero-spec max-w-sm text-[15px] leading-relaxed opacity-75">
                Lumen &amp; Oak is a fictional six-person studio designing calm,
                light-struck homes on both coasts. Plans follow the sun;
                materials tell the truth.
              </p>
              <ul className="dc-hero-spec font-mono-t space-y-2 text-[11px] tracking-[0.18em] opacity-80">
                <li className="flex justify-between border-b py-2" style={{ borderColor: LINE }}><span>HOMES</span><span>120</span></li>
                <li className="flex justify-between border-b py-2" style={{ borderColor: LINE }}><span>SQM DRAWN</span><span>84,000</span></li>
                <li className="flex justify-between border-b py-2" style={{ borderColor: LINE }}><span>AWARDS</span><span>09</span></li>
              </ul>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="dc-hero-img relative ml-auto h-[52vw] w-[86%] sm:h-[420px] lg:h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Modern house exterior at dusk"
                fill priority className="object-cover"
                sizes="(max-width: 1024px) 90vw, 560px"
              />
            </div>
            <div className="dc-hero-img absolute -bottom-6 left-0 w-[46%] border-4 sm:w-[38%]" style={{ borderColor: PAPER }}>
              <span className="relative block aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
                  alt="Neutral sofa detail"
                  fill className="object-cover"
                  sizes="(max-width: 1024px) 40vw, 260px"
                />
              </span>
            </div>
            <p className="dc-hero-spec font-mono-t absolute -right-2 top-2 hidden text-[10px] tracking-[0.25em] opacity-60 [writing-mode:vertical-rl] lg:block">
              FIG. A — MASSING STUDY, HALE RESIDENCE
            </p>
          </div>
        </div>
        <p className="font-mono-t mt-8 text-[10px] tracking-[0.2em] opacity-50">
          PHOTOGRAPHY: UNSPLASH (FREE LICENSE) — ALL PROJECTS FICTIONAL
        </p>
      </section>

      {/* ——— Marquee ——— */}
      <div className="font-mono-t mt-14 overflow-hidden border-y py-3 text-[12px] tracking-[0.25em]" style={{ borderColor: LINE, background: INK, color: PAPER }}>
        <div className="dc-marquee-track gap-0">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 gap-10 pr-10">
              {['FULL-HOME DESIGN', 'KITCHEN & BATH', 'CUSTOM MILLWORK', 'DAYLIGHT MODELLING', 'STYLING DAY'].map((t) => (
                <span key={t} className="whitespace-nowrap"><span style={{ color: '#e07b4f' }}>✳</span> {t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ——— Index 01–06 ——— */}
      <section id="interiors" className="mx-auto max-w-[1400px] px-4 py-20 md:px-8">
        <div className="dc-rise flex items-end justify-between">
          <h2 className="text-5xl font-bold tracking-tighter md:text-7xl">INDEX</h2>
          <p className="font-mono-t text-[11px] tracking-[0.25em] opacity-60">SELECTED WORKS / 2021—2024</p>
        </div>
        <div className="dc-index relative mt-10 border-t" style={{ borderColor: INK }}>
          {WORKS.map((w) => (
            <a key={w.n} href="#contact" className="dc-row group grid grid-cols-12 items-center gap-2 border-b px-2 py-5 md:px-4 md:py-6" style={{ borderColor: INK }}
               onMouseEnter={() => setPreviewImg(w.img)}>
              <span className="dc-dim font-mono-t col-span-2 text-[12px] tracking-[0.2em] opacity-50 md:col-span-1">({w.n})</span>
              <span className="col-span-10 text-3xl font-bold tracking-tight md:col-span-5 md:text-5xl">{w.title}</span>
              <span className="dc-dim font-mono-t col-span-8 col-start-3 text-[11px] tracking-[0.16em] opacity-60 md:col-span-5 md:col-start-auto">
                {w.city.toUpperCase()} — {w.year} — {w.sqm} — {w.scope.toUpperCase()}
              </span>
              <span className="dc-arrow col-span-2 text-right text-2xl md:col-span-1">↗</span>
              <span className="relative col-span-2 col-start-11 hidden h-16 w-full sm:block md:hidden">
                <Image src={w.img} alt={w.title} fill className="object-cover" sizes="120px" />
              </span>
            </a>
          ))}
        </div>
        {/* floating cursor preview (desktop) */}
        <div ref={preview} className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[280px] w-[220px] overflow-hidden lg:block" style={{ opacity: 0 }}>
          <span className="relative block h-full w-full">
            <Image src={previewImg} alt="" fill className="object-cover" sizes="220px" />
          </span>
        </div>
      </section>

      {/* ——— Spec table ——— */}
      <section className="border-y" style={{ borderColor: LINE, background: '#e9e3d3' }}>
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-3 md:divide-x" style={{ borderColor: LINE }}>
          {[
            { n: 14, suffix: '', label: 'YEARS / EST. 2011' },
            { n: 120, suffix: '', label: 'HOMES DELIVERED' },
            { n: 9, suffix: '', label: 'DESIGN AWARDS' },
          ].map((s) => (
            <div key={s.label} className="dc-rise px-8 py-10 md:px-12">
              <div className="text-6xl font-bold tracking-tighter md:text-7xl">
                <span data-dc-count={s.n}>0</span>{s.suffix}
              </div>
              <div className="font-mono-t mt-2 text-[11px] tracking-[0.25em] opacity-60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Method ——— */}
      <section id="objects" className="mx-auto max-w-[1400px] px-4 py-20 md:px-8">
        <p className="dc-rise font-mono-t text-[11px] tracking-[0.3em]" style={{ color: SIGNAL }}>(02) — METHOD, NOT MYSTERY</p>
        <div className="mt-8 grid gap-px border md:grid-cols-3" style={{ borderColor: INK, background: INK }}>
          {[
            { n: 'M.01', t: 'Survey + sun study', d: 'Two weeks measuring and modelling daylight. The plan follows the sun, not the other way round.' },
            { n: 'M.02', t: 'Design + matter', d: 'Plans, elevations, one tactile palette board. Two revision rounds. No surprise fees, ever.' },
            { n: 'M.03', t: 'Build + styling day', d: 'Licensed contractors, weekly site notes, and a final styling day down to the stems.' },
          ].map((s) => (
            <div key={s.n} className="dc-rise p-8" style={{ background: PAPER }}>
              <div className="font-mono-t text-[12px] tracking-[0.2em]" style={{ color: SIGNAL }}>{s.n}</div>
              <h3 className="mt-4 text-3xl font-bold tracking-tight">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-70">{s.d}</p>
            </div>
          ))}
        </div>
        <blockquote className="dc-rise mx-auto mt-20 max-w-3xl">
          <p className="text-3xl font-medium leading-snug tracking-tight md:text-4xl">
            <span style={{ color: SIGNAL }}>“</span>They removed everything we didn&apos;t need — and suddenly the house felt twice as large.<span style={{ color: SIGNAL }}>”</span>
          </p>
          <cite className="font-mono-t mt-6 block text-[11px] not-italic tracking-[0.25em] opacity-50">— HALE RESIDENCE, CLIENT (FICTIONAL)</cite>
        </blockquote>
      </section>

      {/* ——— Journal ——— */}
      <section id="journal" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8">
          <div className="dc-rise flex items-end justify-between">
            <h2 className="text-5xl font-bold tracking-tighter md:text-7xl">JOURNAL</h2>
            <p className="font-mono-t hidden text-[11px] tracking-[0.25em] opacity-60 sm:block">SITE NOTES, IRREGULARLY</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {JOURNAL.map((j, i) => (
              <article key={j.title} className="dc-rise group border-t-2 pt-4" style={{ borderColor: INK }}>
                <p className="font-mono-t text-[11px] tracking-[0.22em] opacity-60">0{i + 1} — {j.date} / {j.tag}</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight group-hover:underline">{j.title}</h3>
                <p className="mt-2 text-sm opacity-60">4 min read →</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Contact ——— */}
      <section id="contact" className="text-[#f1eee7]" style={{ background: INK }}>
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div className="dc-rise">
            <p className="font-mono-t text-[11px] tracking-[0.3em]" style={{ color: '#e07b4f' }}>(03) — NEW PROJECTS, SPRING</p>
            <h2 className="mt-4 text-5xl font-bold tracking-tighter md:text-7xl">TELL US<br />ABOUT THE<br />HOUSE.</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed opacity-60">
              Fictional demo inbox — nothing is sent. A real build routes here
              with spam protection and a 2-day reply SLA.
            </p>
          </div>
          <form className="dc-rise grid grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
            {[
              ['co2-name', 'NAME', 'text', 'Jane Appleseed', true],
              ['co2-email', 'EMAIL', 'email', 'you@studio.com', true],
              ['co2-city', 'CITY + SQM', 'text', 'Austin — 290 sqm', false],
              ['co2-budget', 'BUDGET BAND', 'text', '$150–250k', false],
            ].map(([id, label, type, ph, req]) => (
              <div key={id}>
                <label htmlFor={id} className="font-mono-t mb-2 block text-[10px] tracking-[0.25em] opacity-60">{label}</label>
                <input id={id} type={type} required={req} placeholder={ph} className="w-full border border-white/25 bg-transparent px-4 py-3 text-sm placeholder:text-white/30 focus:border-white/70 focus:outline-none" />
              </div>
            ))}
            <div className="col-span-2">
              <label htmlFor="co2-msg" className="font-mono-t mb-2 block text-[10px] tracking-[0.25em] opacity-60">THE BRIEF</label>
              <textarea id="co2-msg" rows={4} placeholder="What does the house need?" className="w-full border border-white/25 bg-transparent px-4 py-3 text-sm placeholder:text-white/30 focus:border-white/70 focus:outline-none" />
            </div>
            <button className="col-span-2 py-4 text-sm font-bold tracking-[0.2em] transition hover:opacity-85" style={{ background: SIGNAL, color: '#f1eee7' }}>
              REQUEST CONSULTATION →
            </button>
          </form>
        </div>
        <footer className="border-t border-white/15">
          <div className="font-mono-t mx-auto grid max-w-[1400px] gap-8 px-4 py-12 text-[11px] tracking-[0.18em] opacity-70 md:grid-cols-4 md:px-8">
            <div>
              <p className="opacity-50">SITEMAP</p>
              <p className="mt-3 space-y-2">INTERIORS<br />OBJECTS<br />JOURNAL<br />CONTACT</p>
            </div>
            <div>
              <p className="opacity-50">STUDIOS</p>
              <p className="mt-3">LOS ANGELES<br />34.05°N, 118.24°W<br />NEW YORK<br />40.71°N, 74.00°W</p>
            </div>
            <div>
              <p className="opacity-50">CAREERS</p>
              <p className="mt-3">NO OPEN ROLES.<br />SPECULATIVE PORTFOLIOS<br />WELCOME → STUDIO@L-O.EXAMPLE</p>
            </div>
            <div>
              <p className="opacity-50">COLOPHON</p>
              <p className="mt-3">© 2026 LUMEN &amp; OAK (FICTIONAL DEMO). SET IN SPACE GROTESK + PLEX MONO. BUILT WITH NEXT.JS + GSAP + TAILWIND.</p>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
