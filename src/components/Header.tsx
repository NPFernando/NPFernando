import { useEffect, useState } from 'react';
import { FEATURE_FLAGS } from '@lib/constants';
import { clsx } from 'clsx';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#learning', label: 'Learning' },
  { href: '#future', label: 'Future Ready' },
  { href: '#contact', label: 'Contact' }
];

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (FEATURE_FLAGS.enableLocalThemePersistence) {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    if (FEATURE_FLAGS.enableLocalThemePersistence) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-alt/60 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a className="font-semibold tracking-tight" href="#hero">
          Naveen Fernando
        </a>
        <nav aria-label="Primary" className="hidden gap-6 text-sm font-medium sm:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className="text-muted transition hover:text-accent" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted" aria-live="polite">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={clsx(
              'flex h-9 items-center rounded-full border px-3 text-sm font-medium transition',
              theme === 'dark'
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-surface-alt bg-white/80 text-surface'
            )}
          >
            Toggle
          </button>
        </div>
      </div>
    </header>
  );
}
