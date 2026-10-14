'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  {
    title: 'Hale Residence',
    meta: 'Carmel, California — 2024',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Atelier Meridian',
    meta: 'New York — 2023',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Casa Alba',
    meta: 'Austin, Texas — 2023',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function Page() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, stagger: 0.12, ease: 'power4.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.hero-fade',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.7 }
      );
      gsap.fromTo(
        '.hero-img',
        { clipPath: 'inset(8% 6% 8% 6%)', scale: 1.08 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.6, ease: 'power3.out', delay: 0.4 }
      );
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
      });
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = Number(el.getAttribute('data-count'));
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-[#f7f3ed]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-serif-d text-2xl tracking-tight">
            Lumen <span className="text-[#9a7b4f]">&amp;</span> Oak
          </a>
          <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-[0.18em] uppercase md:flex">
            <a href="#work" className="opacity-70 hover:opacity-100">Work</a>
            <a href="#studio" className="opacity-70 hover:opacity-100">Studio</a>
            <a href="#process" className="opacity-70 hover:opacity-100">Process</a>
            <a href="#contact" className="border border-[#1b1814] px-5 py-2.5 hover:bg-[#1b1814] hover:text-[#f7f3ed] transition">
              Book a consult
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-32 md:pt-40">
        <p className="hero-fade eyebrow text-[#9a7b4f]">Interior architecture — Est. 2011</p>
        <h1 className="font-serif-d mt-6 text-[13vw] leading-[0.95] tracking-tight md:text-[7.5rem]">
          <span className="block overflow-hidden"><span className="hero-line block">Rooms that</span></span>
          <span className="block overflow-hidden"><span className="hero-line block italic font-medium">hold the light.</span></span>
        </h1>
        <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
          <p className="hero-fade max-w-xl text-[15px] leading-relaxed opacity-70 md:col-span-5">
            Lumen &amp; Oak is a fictional boutique studio designing calm,
            light-filled homes across California and New York. Every project
            begins with proportion, material honesty, and quiet restraint.
          </p>
          <div className="hero-fade flex gap-4 md:col-span-7 md:justify-end">
            <a href="#work" className="bg-[#1b1814] px-7 py-3.5 text-sm font-medium text-[#f7f3ed] hover:opacity-85 transition">
              View selected work
            </a>
            <a href="#contact" className="border hairline px-7 py-3.5 text-sm font-medium hover:border-[#1b1814] transition">
              Start a project
            </a>
          </div>
        </div>
        <div className="img-frame hero-img relative mt-12 h-[52vw] md:h-[560px]">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop"
            alt="Calm neutral living room with oak furniture"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1100px"
          />
        </div>
        <p className="mt-3 text-xs tracking-wide opacity-50">
          Photography: Unsplash (free to use under the Unsplash License). Fictional project.
        </p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-3 divide-x hairline border-y hairline">
          {[
            { n: 14, label: 'Years of practice' },
            { n: 120, label: 'Homes completed' },
            { n: 9, label: 'Design awards' },
          ].map((s) => (
            <div key={s.label} className="reveal px-6 py-8 text-center md:py-10">
              <div className="font-serif-d text-5xl md:text-6xl">
                <span data-count={s.n}>0</span>
              </div>
              <div className="eyebrow mt-3 opacity-60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y hairline py-4">
        <div className="marquee-track font-serif-d text-2xl italic opacity-70">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 gap-12 pr-12">
              {['Full-home design', 'Kitchen & bath', 'Custom millwork', 'Lighting plans', 'Styling'].map((t) => (
                <span key={t} className="whitespace-nowrap">— {t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <div className="reveal flex items-end justify-between">
          <div>
            <p className="eyebrow text-[#9a7b4f]">Selected work</p>
            <h2 className="font-serif-d mt-4 text-5xl tracking-tight md:text-6xl">Three quiet houses</h2>
          </div>
          <span className="hidden text-sm opacity-50 md:block">2023 — 2024</span>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {WORKS.map((w) => (
            <article key={w.title} className="reveal group">
              <div className="img-frame relative h-80">
                <Image src={w.img} alt={w.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
              </div>
              <h3 className="font-serif-d mt-5 text-3xl">{w.title}</h3>
              <p className="mt-1 text-[13px] tracking-[0.14em] uppercase opacity-50">{w.meta}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Studio */}
      <section id="studio" className="border-y hairline bg-[#efe8d9]/60">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow text-[#9a7b4f]">Studio philosophy</p>
            <h2 className="font-serif-d mt-4 text-5xl leading-tight tracking-tight">
              Less, but <span className="italic">better considered.</span>
            </h2>
          </div>
          <div className="reveal space-y-6 text-[15px] leading-relaxed opacity-80">
            <p>We believe a home should exhale. Our fictional team of six keeps a deliberately small project list so each house gets full attention — from first survey to final styling day.</p>
            <ul className="space-y-3 border-t hairline pt-6">
              {['Natural oak, lime plaster, honed stone', 'Daylight modelling before any fixture', 'Furniture plans drawn to the inch', 'One point of contact, weekly site notes'].map((li) => (
                <li key={li} className="flex gap-3"><span className="text-[#9a7b4f]">✓</span>{li}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-6xl px-6 py-24">
        <p className="reveal eyebrow text-[#9a7b4f]">How we work</p>
        <div className="mt-8 grid gap-px border hairline bg-[#e5dccb] md:grid-cols-3">
          {[
            { n: '01', t: 'Survey & light study', d: 'Two weeks measuring, photographing and modelling daylight so the plan follows the sun.' },
            { n: '02', t: 'Design & materials', d: 'Plans, elevations and a tactile palette board. Two revision rounds, no surprise fees.' },
            { n: '03', t: 'Build & styling', d: 'Licensed contractors, weekly site visits, and a final styling day down to the stems.' },
          ].map((s) => (
            <div key={s.n} className="reveal bg-[#f7f3ed] p-8">
              <div className="font-serif-d text-xl opacity-40">{s.n}</div>
              <h3 className="font-serif-d mt-4 text-3xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-70">{s.d}</p>
            </div>
          ))}
        </div>
        <blockquote className="reveal mx-auto mt-20 max-w-3xl text-center">
          <p className="font-serif-d text-3xl italic leading-snug md:text-4xl">
            “They removed everything we didn&apos;t need — and suddenly the house felt twice as large.”
          </p>
          <cite className="eyebrow mt-6 block opacity-50 not-italic">— Imaginary client, Hale Residence</cite>
        </blockquote>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#1b1814] text-[#f7f3ed]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <div className="reveal">
            <p className="eyebrow text-[#c9a86a]">New projects for spring</p>
            <h2 className="font-serif-d mt-4 text-5xl tracking-tight md:text-6xl">Tell us about your house.</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed opacity-70">
              Fictional demo contact — no messages are sent. In a real build this form would route to your inbox with spam protection.
            </p>
          </div>
          <form className="reveal space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 md:grid-cols-2">
              <input required placeholder="Name" className="border border-white/20 bg-transparent px-4 py-3 text-sm placeholder:text-white/40 focus:border-white/60 focus:outline-none" />
              <input required type="email" placeholder="Email" className="border border-white/20 bg-transparent px-4 py-3 text-sm placeholder:text-white/40 focus:border-white/60 focus:outline-none" />
            </div>
            <input placeholder="Project city + sq ft" className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm placeholder:text-white/40 focus:border-white/60 focus:outline-none" />
            <textarea rows={4} placeholder="What does the house need?" className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm placeholder:text-white/40 focus:border-white/60 focus:outline-none" />
            <button className="w-full bg-[#f7f3ed] py-4 text-sm font-semibold tracking-[0.18em] uppercase text-[#1b1814] hover:opacity-90 transition">
              Request consultation
            </button>
          </form>
        </div>
        <footer className="border-t border-white/15">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-[13px] opacity-60 md:flex-row md:items-center md:justify-between">
            <span>© 2026 Lumen &amp; Oak Studio (fictional demo). Built with Next.js + GSAP + Tailwind.</span>
            <span>hello@lumen-oak.example — (415) 555-0132</span>
          </div>
        </footer>
      </section>
    </div>
  );
}
