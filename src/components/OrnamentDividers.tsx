import React from 'react';

interface DividerProps {
  color?: string;
  className?: string;
}

export const SnowflakeDivider: React.FC<DividerProps> = ({
  color = '#2b180c',
  className = '',
}) => (
  <div className={`flex items-center justify-center gap-2.5 ${className}`} aria-hidden="true">
    <span
      className="h-[1px] flex-1 max-w-[74px] opacity-75"
      style={{
        background: `linear-gradient(90deg, transparent 0%, ${color} 100%)`,
      }}
    />
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 animate-snowflake-spin"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
      <polyline points="9.5 4.5 12 7 14.5 4.5" />
      <polyline points="9.5 19.5 12 17 14.5 19.5" />
      <polyline points="4.5 9.5 7 12 4.5 14.5" />
      <polyline points="19.5 9.5 17 12 19.5 14.5" />
    </svg>
    <span
      className="h-[1px] flex-1 max-w-[74px] opacity-75"
      style={{
        background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
      }}
    />
  </div>
);

export const ParchmentFlourish: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 18"
    fill="none"
    className={`w-36 h-4 mx-auto ${className}`}
    aria-hidden="true"
  >
    <path
      d="M12 9H78C84 9 87 4 92 4C96 4 98 7 100 9C102 7 104 4 108 4C113 4 116 9 122 9H188"
      stroke="#3b2312"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.72"
    />
    <path
      d="M78 9C84 9 87 14 92 14C96 14 98 11 100 9C102 11 104 14 108 14C113 14 116 9 122 9"
      stroke="#3b2312"
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.6"
    />
    <circle cx="100" cy="9" r="2" fill="#3b2312" opacity="0.8" />
    <circle cx="72" cy="9" r="1.3" fill="#3b2312" opacity="0.65" />
    <circle cx="128" cy="9" r="1.3" fill="#3b2312" opacity="0.65" />
  </svg>
);

export const GoldCalligraphyFlourish: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 220 26"
    fill="none"
    className={`w-44 h-6 mx-auto ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="goldFlourish" x1="0" y1="0" x2="220" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f6d379" stopOpacity="0.2" />
        <stop offset="30%" stopColor="#fff2be" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#e6af49" stopOpacity="1" />
        <stop offset="70%" stopColor="#fff2be" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#f6d379" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path
      d="M28 16C48 6 70 4 92 13C100 16 108 19 116 14C126 8 148 5 174 14C185 18 196 14 198 10"
      stroke="url(#goldFlourish)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M72 18C88 22 104 14 114 9C123 4 136 5 144 10"
      stroke="url(#goldFlourish)"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.85"
    />
    <circle cx="110" cy="13" r="2.2" fill="#fff3c4" />
  </svg>
);
