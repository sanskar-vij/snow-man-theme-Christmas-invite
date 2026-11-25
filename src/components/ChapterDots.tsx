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
 * Right-edge vertical progress dots used to jump between invitation scenes.
 */
export function ChapterDots({ sections, activeSection, onNavigate }: ChapterDotsProps) {
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
            className="group flex items-center justify-end p-1"
          >
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
