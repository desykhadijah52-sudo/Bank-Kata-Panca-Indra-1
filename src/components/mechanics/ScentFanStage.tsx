import React, { useState } from 'react';
import { Wind } from 'lucide-react';
import type { ObjectItem } from '../../types/game';
import { audioEngine } from '../../utils/audioEngine';

interface ScentFanStageProps {
  item: ObjectItem;
  progress: number;
  onProgressChange: (next: number) => void;
}

interface PlumeParticle {
  id: number;
  x: number;
  drift: number;
}

export const ScentFanStage: React.FC<ScentFanStageProps> = ({
  item,
  progress,
  onProgressChange,
}) => {
  const [fanAngle, setFanAngle] = useState(0);
  const [plumes, setPlumes] = useState<PlumeParticle[]>([
    { id: 1, x: 42, drift: 14 },
    { id: 2, x: 50, drift: 22 },
    { id: 3, x: 58, drift: 10 },
  ]);
  const [waftCount, setWaftCount] = useState(0);

  const notes = item.visual.aromaNotes ?? [];

  const handleWaft = (clientX?: number) => {
    audioEngine.playScentWaft();
    setFanAngle((prev) => (prev === 18 ? -18 : 18));
    setWaftCount((c) => c + 1);

    const newId = Date.now() + Math.random();
    const baseX = clientX ? 38 + (clientX % 24) : 40 + Math.random() * 20;
    setPlumes((prev) => [
      ...prev.slice(-7),
      { id: newId, x: baseX, drift: 24 + Math.random() * 26 },
    ]);

    onProgressChange(Math.min(100, progress + 25));
  };

  const renderScentSubject = () => {
    if (item.id === 'melati') {
      return (
        <svg viewBox="0 0 200 140" className="w-44 h-32">
          <path d="M100 130 Q100 95 100 72" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
          <path d="M100 112 Q70 98 62 115 Q80 124 100 115Z" fill="#059669" />
          <path d="M100 105 Q132 90 140 108 Q122 118 100 108Z" fill="#34D399" />
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="100"
              cy="46"
              rx="13"
              ry="24"
              fill="#F8FAFC"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              transform={`rotate(${deg} 100 68)`}
            />
          ))}
          <circle cx="100" cy="68" r="8" fill="#FDE047" />
        </svg>
      );
    }

    if (item.id === 'kopi') {
      return (
        <svg viewBox="0 0 200 140" className="w-44 h-32">
          <ellipse cx="100" cy="116" rx="64" ry="12" fill="#94A3B8" opacity="0.35" />
          <path d="M56 54 H144 L136 106 Q134 116 100 116 Q66 116 64 106 Z" fill="#F5F5F4" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M142 64 C162 64, 162 96, 139 96" fill="none" stroke="#F5F5F4" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="100" cy="54" rx="44" ry="10" fill="#291206" />
          <ellipse cx="100" cy="54" rx="34" ry="6" fill="#78350F" opacity="0.55" />
        </svg>
      );
    }

    // Roti Panggang
    return (
      <svg viewBox="0 0 200 140" className="w-44 h-32">
        <rect x="44" y="68" width="112" height="52" rx="10" fill="#334155" stroke="#64748B" strokeWidth="2" />
        <path d="M62 68 V46 C62 30, 138 30, 138 46 V68 Z" fill="#D97706" stroke="#92400E" strokeWidth="3" />
        <path d="M72 68 V48 C72 37, 128 37, 128 48 V68 Z" fill="#FDE68A" />
        {/* Melting butter */}
        <rect x="88" y="45" width="24" height="14" rx="3" fill="#FACC15" transform="rotate(-8 100 52)" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        onPointerMove={(e) => {
          if (e.buttons > 0) handleWaft(e.clientX);
        }}
        className="relative w-full h-56 sm:h-64 rounded-xl border border-white/15 bg-gradient-to-b from-emerald-950/50 via-slate-900 to-slate-950 flex items-center justify-between px-6 overflow-hidden select-none touch-none"
      >
        {/* Left: Scent Fan Control Visual */}
        <button
          type="button"
          onClick={() => handleWaft()}
          className="relative z-10 flex flex-col items-center gap-2 p-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/35 cursor-pointer active:scale-95 transition-transform"
        >
          <div
            className="transition-transform duration-150"
            style={{ transform: `rotate(${fanAngle}deg)` }}
          >
            <Wind className="w-9 h-9 text-emerald-300" />
          </div>
          <span className="text-xs font-semibold text-emerald-100 whitespace-nowrap">
            Kibaskan Kipas
          </span>
        </button>

        {/* Center: Aromatic Subject + Vapor Plumes */}
        <div className="relative flex flex-col items-center justify-end h-full pb-3">
          <div className="absolute inset-x-0 top-2 bottom-20 pointer-events-none">
            {plumes.map((p) => (
              <div
                key={p.id}
                className="absolute bottom-0 w-7 h-7 rounded-full bg-emerald-300/25 blur-[2px]"
                style={
                  {
                    left: `${p.x}%`,
                    '--drift-x': `${p.drift}px`,
                    animation: 'scent-rise 1.6s ease-out forwards',
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          {renderScentSubject()}
        </div>

        {/* Right: Olfactory Notes */}
        <div className="relative z-10 flex flex-col gap-1.5 w-36">
          <span className="text-[11px] font-medium text-emerald-300/80">
            Kesan Wangi
          </span>
          {notes.map((note, idx) => {
            const unlocked = progress >= (idx + 1) * 30;
            return (
              <div
                key={note}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  unlocked
                    ? 'bg-emerald-500/20 border-emerald-400/45 text-emerald-100'
                    : 'bg-slate-900/70 border-white/10 text-slate-500'
                }`}
              >
                {unlocked ? note : '???'}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer guidance */}
      <div className="flex items-center justify-between bg-slate-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-300">
        <span>
          Kibaskan angin perlahan untuk menghirup wangi benda ({waftCount}× kibasan).
        </span>
        <span className="font-mono tabular-nums text-emerald-300 font-semibold">
          {progress}% Tercium
        </span>
      </div>
    </div>
  );
};
