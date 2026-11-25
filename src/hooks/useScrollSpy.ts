import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view (for the chapter dots nav).
 */
export function useScrollSpy(ids: string[], threshold = 0.45): string {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|'), threshold]);

  return active;
}
