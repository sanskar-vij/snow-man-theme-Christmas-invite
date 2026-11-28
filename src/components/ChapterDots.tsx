import { useEffect, useState } from 'react';

export interface ChapterSection {
  id: string;
  label: string;
}

interface ChapterDotsProps {
  sections: readonly ChapterSection[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

/**
 * Right-edge vertical progress dots with transient section labels for intuitive navigation.
 */
export function ChapterDots({ sections, activeSection, onNavigate }: ChapterDotsProps) {
  const [showActiveLabel, setShowActiveLabel] = useState(false);

  useEffect(() => {
    setShowActiveLabel(true);
    const timer = window.setTimeout(() => setShowActiveLabel(false), 1800);
    return () => window.clearTimeout(timer);
  }, [activeSection]);

  return (
    <nav
      aria-label="Invitation sections"
      className="fixed right-2.5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 min-[360px]:flex sm:right-[max(12px,calc(50%-203px))]"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            aria-label={`Jump to ${label}`}
            title={label}
            className="group relative flex items-center justify-end p-1"
          >
            <span
              className={`pointer-events-none mr-2 rounded-full border border-[#f5d27a]/35 bg-[#071226]/85 px-2 py-0.5 text-[9px] font-semibold tracking-[0.08em] text-[#fce8b5] uppercase shadow-md backdrop-blur-md transition-all duration-300 ${
                isActive && showActiveLabel
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'h-5 w-2 bg-[#f8d77f] shadow-[0_0_10px_rgba(248,215,127,0.85)]'
                  : 'h-2 w-2 bg-[#fff6df]/45 group-hover:bg-[#f8d77f]/80'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
