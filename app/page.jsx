'use client';

import { useCallback, useEffect, useState } from 'react';
import DesignOne from '../components/designs/DesignOne';
import DesignA from '../components/designs/DesignA';
import DesignB from '../components/designs/DesignB';
import DesignC from '../components/designs/DesignC';
import DesignSwitcher from '../components/DesignSwitcher';

export default function Page() {
  const [design, setDesign] = useState('c');
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get('design') || '').toLowerCase();
    const stored = window.localStorage.getItem('lumen-design');
    if (q === '1' || q === 'a' || q === 'b' || q === 'c') setDesign(q);
    else if (stored === '1' || stored === 'a' || stored === 'b' || stored === 'c') setDesign(stored);
    if (params.get('clean') === '1' || window.localStorage.getItem('lumen-switcher') === 'hidden') {
      setHidden(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem('lumen-design', design);
    const url = new URL(window.location.href);
    url.searchParams.set('design', design);
    window.history.replaceState(null, '', url.toString());
    window.scrollTo({ top: 0 });
  }, [design, ready]);

  useEffect(() => {
    window.localStorage.setItem('lumen-switcher', hidden ? 'hidden' : 'shown');
  }, [hidden]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === 'd' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        setHidden((h) => !h);
      }
      if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        setDesign(e.key === '1' ? '1' : e.key === '2' ? 'a' : e.key === '3' ? 'b' : 'c');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const set = useCallback((d) => setDesign(d), []);

  return (
    <div>
      {design === '1' && <DesignOne key="d1" />}
      {design === 'a' && <DesignA key="da" />}
      {design === 'b' && <DesignB key="db" />}
      {design === 'c' && <DesignC key="dc" />}
      <DesignSwitcher design={design} setDesign={set} hidden={hidden} setHidden={setHidden} />
    </div>
  );
}
