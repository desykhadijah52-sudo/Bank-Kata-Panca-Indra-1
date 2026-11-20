import React from 'react';
import type { SenseId } from '../types/game';

interface SenseIconProps {
  sense: SenseId;
  className?: string;
}

export const SenseIcon: React.FC<SenseIconProps> = ({ sense, className = 'w-5 h-5' }) => {
  switch (sense) {
    case 'penglihatan':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="3.2" />
          <circle cx="13" cy="11" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'pendengaran':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 3.2-2.2 4.3-3 6.2-.5 1.2-.8 2.8-2.4 2.8-1.4 0-2.1-1-2.1-2" />
          <path d="M10.5 9.5a2 2 0 0 1 3.5 1.4c0 1.1-.8 1.7-1.4 2.3" />
          <path d="M19.5 6.5c1.2 1.6 1.8 3.5 1.8 5.5s-.6 3.9-1.8 5.5" />
        </svg>
      );
    case 'penciuman':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M12 4v8.2c0 1.4 2.8 2.2 2.8 4.2a2.6 2.6 0 0 1-2.6 2.6c-1.1 0-1.9-.6-2.4-.6s-1.3.6-2.4.6a2.6 2.6 0 0 1-2.6-2.6c0-1.7 1.9-2.4 2.4-3.7" />
          <path d="M17.5 6c.9-1 1.2-2.2.3-3.2" />
          <path d="M20.5 9c.9-1 1.2-2.2.3-3.2" />
        </svg>
      );
    case 'pengecapan':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M5 9.5C5 7 8 5.5 12 5.5S19 7 19 9.5c0 5.5-2.5 10-7 10s-7-4.5-7-10Z" />
          <path d="M12 7v8" />
          <path d="M3.5 9.5c2.2 1 5.2 1.5 8.5 1.5s6.3-.5 8.5-1.5" />
        </svg>
      );
    case 'perabaan':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M18 11V6a1.5 1.5 0 0 0-3 0v4" />
          <path d="M15 10V4.5a1.5 1.5 0 0 0-3 0V10" />
          <path d="M12 10V5.5a1.5 1.5 0 0 0-3 0V12" />
          <path d="M9 12.5 7.3 10.8a1.5 1.5 0 0 0-2.1 2.1l3.6 4.8A4.8 4.8 0 0 0 12.6 20h1.6a4.8 4.8 0 0 0 4.8-4.8V11a1.5 1.5 0 0 0-3 0" />
        </svg>
      );
  }
};

export const TitleEmblemLockup: React.FC = () => (
  <svg
    viewBox="0 0 440 116"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-[440px] h-auto select-none"
    aria-label="Bank Kata Panca Indra"
  >
    <path
      d="M12 22H92M108 22H122"
      stroke="#F59E0B"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="100" cy="22" r="3.5" fill="#F59E0B" />
    <text
      x="132"
      y="26"
      fill="#FCD34D"
      fontFamily="Plus Jakarta Sans, sans-serif"
      fontSize="12"
      fontWeight="600"
      letterSpacing="2"
    >
      CERAPAN INDRA · BAHASA INDONESIA
    </text>
    <text
      x="10"
      y="68"
      fill="#FAF7F0"
      fontFamily="Fraunces, Georgia, serif"
      fontSize="42"
      fontWeight="700"
    >
      Bank Kata
    </text>
    <text
      x="12"
      y="104"
      fill="#F59E0B"
      fontFamily="Fraunces, Georgia, serif"
      fontSize="31"
      fontWeight="600"
    >
      Panca Indra
    </text>
  </svg>
);
