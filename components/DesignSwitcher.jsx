'use client';

/* Floating design switcher. Hideable so it never pollutes screenshots.
   - Click × to hide. When hidden: tiny 10px dot bottom-right (hover to reveal).
   - Press "d" anytime to toggle it back.
   - ?design=1|a|b|c deep-links. ?clean=1 starts hidden. Persists to localStorage. */
export default function DesignSwitcher({ design, setDesign, hidden, setHidden }) {
  if (hidden) {
    return (
      <>
        <button
          onClick={() => setHidden(false)}
          aria-label="Show design switcher (or press D)"
          title="Show design switcher (D)"
          className="fixed bottom-3 right-3 z-[200] h-3 w-3 rounded-full bg-black/20 opacity-0 transition hover:opacity-100 hover:scale-150 focus:opacity-100 focus:outline-none"
        />
        <span className="sr-only">Press D to show design switcher</span>
      </>
    );
  }

  const btn = (key, label, hint) => (
    <button
      key={key}
      onClick={() => setDesign(key)}
      aria-pressed={design === key}
      title={hint}
      className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition ${
        design === key
          ? 'bg-[#1b1814] text-[#f7f3ed] shadow'
          : 'text-[#1b1814]/55 hover:bg-black/5 hover:text-[#1b1814]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-4 left-1/2 z-[200] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/85 py-1.5 pl-4 pr-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <span className="mr-1 hidden text-[10px] font-bold uppercase tracking-[0.22em] text-black/35 sm:inline">Design</span>
        {btn('1', '1 · Orig', 'Original saved design')}
        {btn('a', 'A · Refined', 'Premium minimal fix — same structure')}
        {btn('b', 'B · Editorial', 'Full art-direction overhaul')}
        {btn('c', 'C · Technical', 'Bang direction — grotesk, index, spec grid (default)')}
        <span className="mx-1 h-5 w-px bg-black/10" />
        <button
          onClick={() => setHidden(true)}
          aria-label="Hide design switcher (press D to bring back)"
          title="Hide (D brings it back)"
          className="grid h-8 w-8 place-items-center rounded-full text-black/40 transition hover:bg-black/5 hover:text-black"
        >
          ✕
        </button>
      </div>
      <p className="mt-1.5 text-center text-[10px] font-medium tracking-wide text-black/30 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]">
        press <kbd className="rounded border border-black/15 bg-white/70 px-1 font-sans font-bold">D</kbd> to hide / show · ?design=a · ?clean=1
      </p>
    </div>
  );
}
