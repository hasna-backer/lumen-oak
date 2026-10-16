'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Design B — Editorial overhaul. Gallery index, dark hero, material story.
   Fictional project, Unsplash imagery. */
const INDEX = [
  {
    i: '01',
    title: 'Hale Residence',
    place: 'Carmel, CA',
    year: '2024',
    scope: 'Full home — 2,400 ft²',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop',
  },
  {
    i: '02',
    title: 'Atelier Meridian',
    place: 'New York, NY',
    year: '2023',
    scope: 'Loft — 1,800 ft²',
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1400&auto=format&fit=crop',
  },
  {
    i: '03',
    title: 'Casa Alba',
    place: 'Austin, TX',
    year: '2023',
    scope: 'New build — 3,100 ft²',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop',
  },
  {
    i: '04',
    title: 'Dune Cottage',
    place: 'Mendocino, CA',
    year: '2022',
    scope: 'Retreat — 1,200 ft²',
    img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1400&auto=format&fit=crop',
  },
];

export default function DesignB() {
  const root = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.db-line', { yPercent: 115, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.15 });
      gsap.from('.db-fade', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.55, clearProps: 'all' });
      gsap.from('.db-img-main', { clipPath: 'inset(12% 8% 12% 8%)', scale: 1.07, duration: 1.6, ease: 'power3.out', delay: 0.25, clearProps: 'clipPath' });
      gsap.from('.db-img-sub', { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.7, clearProps: 'all' });
      gsap.utils.toArray('.db-reveal').forEach((el) => {
        gsap.from(el, { y: 32, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
      gsap.to('.db-ticker', { xPercent: -50, duration: 26, ease: 'none', repeat: -1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-[#14110d] text-[#f4ede1] antialiased">
      <a href="#db-work" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#f4ede1] focus:px-4 focus:py-2 focus:text-sm focus:text-black">Skip to work</a>

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#14110d]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5 md:px-10">
          <a href="#db-top" className="flex items-center gap-3" aria-label="Lumen and Oak home">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#c9a86a]/60 font-serif-d text-lg italic">LO</span>
            <span className="font-serif-d text-xl tracking-tight">Lumen <span className="italic text-[#c9a86a]">&amp;</span> Oak</span>
          </a>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65 lg:flex" aria-label="Primary">
            <a href="#db-work" className="transition hover:text-white">Index</a>
            <a href="#db-studio" className="transition hover:text-white">Manifesto</a>
            <a href="#db-process" className="transition hover:text-white">Process</a>
            <a href="#db-contact" className="rounded-full bg-[#f4ede1] px-5 py-2.5 text-[#14110d] transition hover:-translate-y-px hover:shadow-[0_15px_35px_-12px_rgba(244,237,225,0.5)]">Book a consult</a>
          </nav>
          <button onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] lg:hidden">
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/10 px-6 py-3 lg:hidden" aria-label="Mobile">
            {[['Index', '#db-work'], ['Manifesto', '#db-studio'], ['Process', '#db-process'], ['Contact', '#db-contact']].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 font-serif-d text-3xl italic last:border-0">{l}<span className="text-sm not-italic text-[#c9a86a]">→</span></a>
            ))}
          </nav>
        )}
      </header>

      <main id="db-top">
        {/* HERO — dark editorial */}
        <section className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-28 md:px-10 md:pt-36">
          <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a86a]">
            <span className="h-px w-10 bg-[#c9a86a]/60" /> Interior architecture — Est. 2011
            <span className="ml-auto hidden text-white/40 md:inline">Carmel · New York · Austin — N°14</span>
          </div>
          <h1 className="font-serif-d mt-6 leading-[0.92] tracking-[-0.03em] text-[17vw] sm:text-[13vw] lg:text-[10.5rem]">
            <span className="block overflow-hidden pb-1"><span className="db-line block">Light,</span></span>
            <span className="block overflow-hidden pb-3"><span className="db-line block italic font-medium text-[#e9d9bd]">kept longer.</span></span>
          </h1>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <p className="db-fade max-w-md text-[15px] leading-relaxed text-white/65 lg:col-span-4">
              A fictional boutique studio for calm, sun-led homes. Oak, lime plaster, honed stone — drawn to the inch, built without noise.
            </p>
            <div className="db-fade flex flex-wrap items-center gap-3 lg:col-span-8 lg:justify-end">
              <a href="#db-work" className="rounded-full bg-[#f4ede1] px-7 py-3.5 text-sm font-bold text-[#14110d] transition hover:-translate-y-0.5 hover:shadow-xl">Enter the index →</a>
              <a href="#db-studio" className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/85 transition hover:border-white/60 hover:text-white">Read the manifesto</a>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <div className="db-img-main relative overflow-hidden rounded-[6px] bg-[#241f18] lg:col-span-8 h-[64vw] sm:h-[440px] lg:h-[600px]">
              <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" alt="Sunlit minimal house with warm oak and plaster" fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 900px" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
                <span>Hale Residence — 7:42 AM</span><span className="hidden sm:inline">Oak / Plaster / Stone</span>
              </div>
            </div>
            <div className="flex flex-col gap-5 lg:col-span-4">
              <div className="db-img-sub relative flex-1 overflow-hidden rounded-[6px] bg-[#241f18] min-h-[240px] lg:min-h-0">
                <Image src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop" alt="Beige minimal armchair in soft daylight" fill className="object-cover" sizes="(max-width:1024px) 100vw, 450px" />
              </div>
              <div className="db-fade rounded-[6px] border border-white/12 bg-white/[0.04] p-6">
                <p className="font-serif-d text-2xl italic leading-snug">“Rooms that exhale.”</p>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/45">Manifesto — 6 rooms, 1 rule</p>
              </div>
            </div>
          </div>

          {/* stat strip */}
          <dl className="db-fade mt-8 grid grid-cols-3 divide-x divide-white/10 rounded-[6px] border border-white/10 bg-white/[0.03] text-center">
            {[['14', 'Years'], ['124', 'Homes'], ['9', 'Awards']].map(([n, l]) => (
              <div key={l} className="px-4 py-5"><dt className="sr-only">{l}</dt><dd className="font-serif-d text-4xl md:text-5xl">{n}</dd><dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/45">{l}</dd></div>
            ))}
          </dl>
        </section>

        {/* Ticker */}
        <div className="overflow-hidden border-y border-white/10 bg-[#1c1813] py-3.5" aria-hidden="true">
          <div className="db-ticker flex w-max gap-0 font-serif-d text-lg italic text-white/60">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0">
                {['White oak', 'Lime plaster', 'Honed travertine', 'Brushed brass', 'Belgian linen', 'Daylight studies'].map((t) => (
                  <span key={t} className="flex items-center whitespace-nowrap px-6"><span className="mr-6 inline-block h-1.5 w-1.5 rounded-full bg-[#c9a86a]" />{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* WORK INDEX — editorial rows */}
        <section id="db-work" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-16 md:px-10 md:py-24">
          <div className="db-reveal flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif-d text-5xl tracking-tight md:text-7xl">Index <span className="italic text-[#c9a86a]">of quiet</span></h2>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/45">04 houses — 2022 → 2024</p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {INDEX.map((p, idx) => (
                <li key={p.i}>
                  <button
                    onMouseEnter={() => setActive(idx)}
                    onFocus={() => setActive(idx)}
                    onClick={() => setActive(idx)}
                    className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-5 text-left transition md:gap-8 md:py-7 ${active === idx ? 'text-white' : 'text-white/55 hover:text-white'}`}
                    aria-pressed={active === idx}
                  >
                    <span className={`font-serif-d text-lg italic md:text-xl ${active === idx ? 'text-[#c9a86a]' : 'text-white/30'}`}>{p.i}</span>
                    <span>
                      <span className="font-serif-d block text-3xl leading-none tracking-tight md:text-5xl">{p.title}</span>
                      <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">{p.place} · {p.year} · {p.scope}</span>
                    </span>
                    <span className={`grid h-11 w-11 place-items-center rounded-full border transition ${active === idx ? 'border-[#c9a86a] bg-[#c9a86a] text-black' : 'border-white/20 text-white/60 group-hover:border-white/50'}`}>→</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="db-reveal relative overflow-hidden rounded-[6px] bg-[#241f18] min-h-[380px] lg:min-h-[560px] lg:sticky lg:top-24">
              {INDEX.map((p, idx) => (
                <Image key={p.i} src={p.img} alt={`${p.title} — ${p.scope}`} fill loading={idx === 0 ? 'eager' : 'lazy'} className={`object-cover transition-all duration-700 ${active === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'}`} sizes="(max-width:1024px) 100vw, 550px" />
              ))}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/65 to-transparent p-5">
                <span className="font-serif-d text-2xl italic">{INDEX[active].title}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">{INDEX[active].i} / 04</span>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section id="db-studio" className="scroll-mt-24 border-y border-[#2a241c] bg-[#ece2cc] text-[#1b1712]">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2">
            <div className="db-reveal">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#7a5f36]"><span className="h-px w-8 bg-[#7a5f36]" />Manifesto</p>
              <h2 className="font-serif-d mt-5 text-5xl leading-[1.0] tracking-tight md:text-6xl">We keep six projects at a time. <span className="italic">Yours gets our mornings.</span></h2>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop', 'Stone'],
                  ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop', 'Oak'],
                  ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=600&auto=format&fit=crop', 'Light'],
                ].map(([src, label]) => (
                  <figure key={label} className="overflow-hidden rounded-[4px] bg-[#d9cbae]">
                    <div className="relative aspect-square"><Image src={src} alt={`${label} material study`} fill loading="lazy" className="object-cover" sizes="200px" /></div>
                    <figcaption className="py-2 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#1b1712]/60">{label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="db-reveal flex flex-col justify-center">
              <p className="text-lg leading-relaxed text-[#1b1712]/85">A home should exhale. We measure the sun before we move a wall, draw furniture to the inch, and finish with a styling day down to the stems.</p>
              <ol className="mt-8 space-y-0 border-t border-[#1b1712]/15">
                {['Daylight model before any fixture', 'Tactile palette — oak, plaster, stone', 'Weekly site notes, one contact', 'Two revisions, fixed fee'].map((t, i) => (
                  <li key={t} className="flex items-center gap-5 border-b border-[#1b1712]/15 py-4 text-[15px] font-medium"><span className="font-serif-d italic text-[#7a5f36]">0{i + 1}</span>{t}</li>
                ))}
              </ol>
              <a href="#db-contact" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#1b1712] px-7 py-3.5 text-sm font-bold text-[#ece2cc] transition hover:-translate-y-0.5 hover:shadow-xl">Meet the studio →</a>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="db-process" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-16 md:px-10 md:py-24">
          <p className="db-reveal text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9a86a]">Process — 10 to 16 weeks</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10 md:grid-cols-4">
            {[
              ['01', 'Survey', 'Measure, photograph, model the sun.'],
              ['02', 'Design', 'Plans + palette board you can touch.'],
              ['03', 'Build', 'Licensed crews, weekly visits.'],
              ['04', 'Style', 'Art, stems, linen. Then exhale.'],
            ].map(([n, t, d]) => (
              <div key={n} className="db-reveal group bg-[#14110d] p-7 transition hover:bg-[#1e1913]">
                <div className="font-serif-d text-6xl italic text-white/15 transition group-hover:text-[#c9a86a]/60">{n}</div>
                <h3 className="font-serif-d mt-4 text-3xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{d}</p>
              </div>
            ))}
          </div>
          <blockquote className="db-reveal mx-auto mt-14 max-w-4xl text-center">
            <p className="font-serif-d text-3xl italic leading-tight md:text-5xl">“They removed everything we didn&apos;t need — the house felt twice as large.”</p>
            <cite className="mt-5 block text-[11px] font-semibold uppercase not-italic tracking-[0.28em] text-white/40">Hale Residence — Carmel 2024</cite>
          </blockquote>
        </section>

        {/* CONTACT */}
        <section id="db-contact" className="scroll-mt-24 border-t border-white/10 bg-[#f4ede1] text-[#14110d]">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="db-reveal">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7a5f36]">Spring — 2 slots left</p>
              <h2 className="font-serif-d mt-4 leading-[0.95] tracking-tight text-6xl md:text-8xl">Tell us<br /><span className="italic">about home.</span></h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black/60">City, size, what feels off. Two business days, honest fit, no pressure.</p>
              <p className="mt-8 font-serif-d text-2xl italic">hello@lumen-oak.example</p>
              <p className="text-sm text-black/55">(415) 555-0132</p>
            </div>
            {sent ? (
              <div className="flex flex-col items-start justify-center rounded-[8px] bg-[#14110d] p-10 text-[#f4ede1]" role="status">
                <p className="font-serif-d text-5xl italic">Thank you.</p>
                <p className="mt-3 text-white/65">Demo received. In production this routes to the studio with spam protection.</p>
                <button onClick={() => setSent(false)} className="mt-6 rounded-full border border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10">Send another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="db-reveal rounded-[8px] border border-black/10 bg-white/70 p-6 shadow-[0_30px_70px_-35px_rgba(20,17,13,0.5)] md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="db-name" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">Name</label><input id="db-name" required placeholder="June Hale" className="w-full rounded-[4px] border border-black/15 bg-white px-4 py-3.5 text-sm outline-none placeholder:text-black/30 focus:border-black focus:ring-2 focus:ring-black/10" /></div>
                  <div><label htmlFor="db-email" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">Email</label><input id="db-email" required type="email" placeholder="june@example.com" className="w-full rounded-[4px] border border-black/15 bg-white px-4 py-3.5 text-sm outline-none placeholder:text-black/30 focus:border-black focus:ring-2 focus:ring-black/10" /></div>
                </div>
                <div className="mt-4"><label htmlFor="db-city" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">City + size</label><input id="db-city" placeholder="Carmel · 2,400 sq ft" className="w-full rounded-[4px] border border-black/15 bg-white px-4 py-3.5 text-sm outline-none placeholder:text-black/30 focus:border-black focus:ring-2 focus:ring-black/10" /></div>
                <div className="mt-4"><label htmlFor="db-msg" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-black/50">What does the house need?</label><textarea id="db-msg" rows={4} placeholder="Morning light never reaches the kitchen…" className="w-full rounded-[4px] border border-black/15 bg-white px-4 py-3.5 text-sm outline-none placeholder:text-black/30 focus:border-black focus:ring-2 focus:ring-black/10" /></div>
                <button className="mt-5 w-full rounded-full bg-[#14110d] py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[#f4ede1] transition hover:-translate-y-0.5 hover:shadow-xl">Request consultation →</button>
                <p className="mt-3 text-center text-xs text-black/40">Fictional demo — stays in your browser.</p>
              </form>
            )}
          </div>
          <footer className="bg-[#14110d] text-white/50">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-7 text-[12px] md:flex-row md:items-center md:justify-between md:px-10">
              <span>© 2026 Lumen &amp; Oak — fictional studio demo</span>
              <span className="font-serif-d italic text-white/70">Rooms that hold the light.</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
