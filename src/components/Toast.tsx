interface ToastProps {
  message: string | null;
}

/**
 * Festive bottom toast notification.
 */
export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-50 w-[90%] max-w-[380px] -translate-x-1/2 rounded-full border border-[#f5d27a]/55 bg-[#0c1a33]/92 px-4 py-2.5 text-center text-xs font-medium tracking-wide text-[#fff2cc] shadow-[0_10px_30px_rgba(0,0,0,0.75)] backdrop-blur-md animate-fade-up"
    >
      ✨ {message}
    </div>
  );
}
