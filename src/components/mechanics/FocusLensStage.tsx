import React, { useRef, useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import type { ObjectItem } from '../../types/game';
import { audioEngine } from '../../utils/audioEngine';

interface FocusLensStageProps {
  item: ObjectItem;
  progress: number;
  onProgressChange: (next: number) => void;
}

export const FocusLensStage: React.FC<FocusLensStageProps> = ({
  item,
  progress,
  onProgressChange,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const [focusLevel, setFocusLevel] = useState(32); // 0..100 sharpness
  const [lampOn, setLampOn] = useState(false);

  const blurPx = Math.max(0, Math.round((100 - focusLevel) / 10));
  const detailTags = item.visual.visualDetailTags ?? [];

  const updatePointer = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(90, Math.max(10, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(86, Math.max(14, ((clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y });

    // Scanning across the object with high focus or lamp increments discovery
    const increment = focusLevel >= 65 || lampOn ? 7 : 3;
    const next = Math.min(100, progress + increment);
    if (next > progress) {
      onProgressChange(next);
      audioEngine.playLensFocus();
    }
  };

  const handleFocusSlider = (val: number) => {
    setFocusLevel(val);
    audioEngine.playLensFocus();
    if (val >= 70) {
      onProgressChange(Math.min(100, Math.max(progress, val)));
    } else {
      onProgressChange(Math.min(100, Math.max(progress, Math.round(val * 0.6))));
    }
  };

  const toggleLamp = () => {
    const nextLamp = !lampOn;
    setLampOn(nextLamp);
    audioEngine.playSenseClick();
    if (nextLamp) {
      setFocusLevel((prev) => Math.max(prev, 78));
      onProgressChange(Math.min(100, progress + 35));
    }
  };

  const renderObjectArtwork = (sharp: boolean) => {
    const opacityClass = sharp ? 'opacity-100' : 'opacity-75';
    if (item.id === 'pelangi') {
      return (
        <svg viewBox="0 0 360 220" className={`w-full h-full ${opacityClass}`}>
          <defs>
            <linearGradient id="skyBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lampOn ? '#0C4A6E' : '#0F172A'} />
              <stop offset="100%" stopColor={lampOn ? '#0369A1' : '#1E293B'} />
            </linearGradient>
          </defs>
          <rect width="360" height="220" rx="16" fill="url(#skyBg)" />
          {/* Sun rays */}
          <circle cx="295" cy="48" r="24" fill="#FDE047" opacity={lampOn ? 0.95 : 0.45} />
          {/* 7 Rainbow bands */}
          {[
            { r: 128, color: '#EF4444' },
            { r: 118, color: '#F97316' },
            { r: 108, color: '#FACC15' },
            { r: 98, color: '#22C55E' },
            { r: 88, color: '#06B6D4' },
            { r: 78, color: '#3B82F6' },
            { r: 68, color: '#8B5CF6' },
          ].map((arc, i) => (
            <path
              key={i}
              d={`M ${180 - arc.r} 185 A ${arc.r} ${arc.r} 0 0 1 ${180 + arc.r} 185`}
              fill="none"
              stroke={arc.color}
              strokeWidth="10"
              strokeLinecap="round"
              opacity={sharp ? 0.95 : 0.65}
            />
          ))}
          {/* Clouds */}
          <g fill="#F8FAFC" opacity="0.92">
            <circle cx="72" cy="182" r="22" />
            <circle cx="98" cy="176" r="26" />
            <circle cx="122" cy="184" r="20" />
            <circle cx="242" cy="184" r="20" />
            <circle cx="268" cy="176" r="25" />
            <circle cx="294" cy="184" r="20" />
          </g>
        </svg>
      );
    }

    if (item.id === 'mercusuar') {
      return (
        <svg viewBox="0 0 360 220" className={`w-full h-full ${opacityClass}`}>
          <rect width="360" height="220" rx="16" fill="#082032" />
          {/* Night sea */}
          <rect y="168" width="360" height="52" fill="#0F3460" />
          <path d="M0 176 Q45 168 90 176 T180 176 T270 176 T360 176" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.5" />
          {/* Light beam */}
          <polygon
            points="180,68 355,22 355,126"
            fill="#FEF08A"
            opacity={lampOn || sharp ? 0.42 : 0.14}
          />
          <polygon
            points="180,68 12,32 12,118"
            fill="#FEF08A"
            opacity={lampOn || sharp ? 0.28 : 0.08}
          />
          {/* Lighthouse tower */}
          <polygon points="154,174 164,84 196,84 206,174" fill="#F8FAFC" />
          <polygon points="159,134 162,108 198,108 201,134" fill="#DC2626" />
          <rect x="160" y="76" width="40" height="8" rx="2" fill="#1E293B" />
          {/* Lamp lantern */}
          <rect x="166" y="54" width="28" height="22" rx="4" fill="#FEF08A" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="180" cy="65" r={lampOn ? 11 : 6} fill="#FFFFFF" opacity="0.95" />
          <polygon points="162,54 180,36 198,54" fill="#DC2626" />
        </svg>
      );
    }

    // Bunga Matahari
    return (
      <svg viewBox="0 0 360 220" className={`w-full h-full ${opacityClass}`}>
        <rect width="360" height="220" rx="16" fill={lampOn ? '#134E4A' : '#112A28'} />
        {/* Stem & Leaves */}
        <path d="M180 120 Q176 170 180 218" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M180 170 Q135 152 124 176 Q148 190 180 176Z" fill="#4ADE80" />
        <path d="M180 156 Q225 138 236 162 Q212 176 180 162Z" fill="#4ADE80" />
        {/* Petals */}
        <g transform="translate(180,96)">
          {Array.from({ length: 16 }).map((_, idx) => (
            <ellipse
              key={idx}
              cx="0"
              cy="-52"
              rx="11"
              ry="26"
              fill={idx % 2 === 0 ? '#FACC15' : '#F59E0B'}
              transform={`rotate(${idx * 22.5})`}
            />
          ))}
          <circle cx="0" cy="0" r="32" fill="#451A03" stroke="#92400E" strokeWidth="4" />
          {/* Seed spiral dots */}
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = i * 2.4;
            const radius = Math.sqrt(i) * 5.8;
            return (
              <circle
                key={i}
                cx={Math.cos(angle) * radius}
                cy={Math.sin(angle) * radius}
                r="2.2"
                fill="#FDE68A"
                opacity="0.75"
              />
            );
          })}
        </g>
      </svg>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Interactive Viewport */}
      <div
        ref={stageRef}
        onPointerMove={(e) => {
          if (e.buttons > 0 || e.pointerType === 'mouse') {
            updatePointer(e.clientX, e.clientY);
          }
        }}
        onClick={(e) => updatePointer(e.clientX, e.clientY)}
        className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-white/15 bg-slate-950 cursor-crosshair select-none touch-none"
      >
        {/* Blurred base layer */}
        <div
          className="absolute inset-0 transition-all duration-150"
          style={{ filter: `blur(${lampOn ? Math.max(0, blurPx - 3) : blurPx}px) brightness(${lampOn ? 1.12 : 0.72})` }}
        >
          {renderObjectArtwork(false)}
        </div>

        {/* Crisp Magnifying Lens Layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `circle(64px at ${lensPos.x}% ${lensPos.y}%)`,
          }}
        >
          <div className="w-full h-full scale-[1.04] transition-transform duration-75">
            {renderObjectArtwork(true)}
          </div>
        </div>

        {/* Frame Ring Overlay */}
        <div
          className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-amber-300/90 shadow-[0_0_0_2px_rgba(15,23,42,0.7),inset_0_0_24px_rgba(255,255,255,0.2)] pointer-events-none flex items-end justify-center pb-1.5"
          style={{ left: `${lensPos.x}%`, top: `${lensPos.y}%` }}
        >
          <span className="text-[10px] font-sans font-semibold text-amber-200 bg-slate-950/80 px-2 py-0.5 rounded">
            PANDANGAN
          </span>
        </div>

        {/* Revealed visual tags when progress >= 60 */}
        {progress >= 60 && (
          <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap gap-2 pointer-events-none animate-pop-settle">
            {detailTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-sky-100 bg-slate-950/85 border border-sky-400/35 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Visual Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 border border-white/10 rounded-xl px-3.5 py-2.5">
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <Eye className="w-4 h-4 text-sky-400 shrink-0" />
          <label htmlFor="focus-slider" className="text-xs font-medium text-slate-300 whitespace-nowrap">
            Kejelasan Rupa
          </label>
          <input
            id="focus-slider"
            type="range"
            min={10}
            max={100}
            value={focusLevel}
            onChange={(e) => handleFocusSlider(Number(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-2"
          />
          <span className="text-xs font-mono tabular-nums text-sky-300 w-9 text-right">
            {focusLevel}%
          </span>
        </div>

        <button
          type="button"
          onClick={toggleLamp}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            lampOn
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-white/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {lampOn ? 'Cahaya Terang' : 'Terangi Pandangan'}
        </button>
      </div>
    </div>
  );
};
