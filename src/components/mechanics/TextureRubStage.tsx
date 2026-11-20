import React, { useRef, useState } from 'react';
import { Hand } from 'lucide-react';
import type { ObjectItem } from '../../types/game';
import { audioEngine } from '../../utils/audioEngine';

interface TextureRubStageProps {
  item: ObjectItem;
  progress: number;
  onProgressChange: (next: number) => void;
}

export const TextureRubStage: React.FC<TextureRubStageProps> = ({
  item,
  progress,
  onProgressChange,
}) => {
  const padRef = useRef<HTMLDivElement>(null);
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const [rubCount, setRubCount] = useState(0);

  const roughness = item.visual.roughnessAudio ?? 10;
  const touchFeeling = item.visual.touchFeeling ?? 'Terasa di ujung jari';
  const touchSurface = item.visual.touchSurface ?? 'Permukaan khas benda';

  const handleStroke = (clientX?: number, clientY?: number) => {
    if (clientX !== undefined && clientY !== undefined && padRef.current) {
      const rect = padRef.current.getBoundingClientRect();
      setTouchPos({
        x: Math.min(92, Math.max(8, ((clientX - rect.left) / rect.width) * 100)),
        y: Math.min(88, Math.max(12, ((clientY - rect.top) / rect.height) * 100)),
      });
    }
    audioEngine.playTextureRub(roughness);
    setRubCount((c) => c + 1);
    onProgressChange(Math.min(100, progress + 12));
  };

  const renderTactileSurface = () => {
    if (item.id === 'es-batu') {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full">
          <defs>
            <linearGradient id="iceGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <rect x="65" y="28" width="190" height="144" rx="22" fill="url(#iceGrad)" stroke="#BAE6FD" strokeWidth="3" />
          <polygon points="86,44 134,44 98,108" fill="#FFFFFF" opacity="0.45" />
          <polygon points="180,66 234,54 216,136" fill="#FFFFFF" opacity="0.28" />
          <circle cx="110" cy="146" r="5" fill="#E0F2FE" opacity="0.7" />
          <circle cx="204" cy="150" r="7" fill="#E0F2FE" opacity="0.6" />
        </svg>
      );
    }

    if (item.id === 'durian') {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full">
          <ellipse cx="160" cy="100" rx="88" ry="74" fill="#65A30D" stroke="#3F6212" strokeWidth="3" />
          {[
            [115, 58], [160, 48], [205, 58],
            [95, 96], [138, 92], [182, 92], [225, 96],
            [115, 136], [160, 144], [205, 136],
          ].map(([cx, cy], idx) => (
            <polygon
              key={idx}
              points={`${cx - 12},${cy + 10} ${cx},${cy - 16} ${cx + 12},${cy + 10}`}
              fill="#A16207"
              stroke="#FEF08A"
              strokeWidth="1"
            />
          ))}
        </svg>
      );
    }

    // Kapas Murni
    return (
      <svg viewBox="0 0 320 200" className="w-full h-full">
        <g fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5">
          <circle cx="120" cy="105" r="42" />
          <circle cx="164" cy="86" r="48" />
          <circle cx="202" cy="110" r="40" />
          <circle cx="158" cy="126" r="42" />
        </g>
        <path d="M124 88 Q160 70 194 90" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={padRef}
        onPointerMove={(e) => {
          if (e.buttons > 0 || e.pointerType === 'mouse') {
            handleStroke(e.clientX, e.clientY);
          }
        }}
        onClick={(e) => handleStroke(e.clientX, e.clientY)}
        className="relative w-full h-56 sm:h-64 rounded-xl border border-white/15 bg-gradient-to-b from-orange-950/35 via-slate-900 to-slate-950 overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none"
      >
        {renderTactileSurface()}

        {touchPos && (
          <div
            className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-300/80 bg-orange-400/20 pointer-events-none transition-transform duration-75"
            style={{ left: `${touchPos.x}%`, top: `${touchPos.y}%` }}
          />
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleStroke();
          }}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-orange-400/40 text-xs font-semibold text-orange-200 cursor-pointer"
        >
          <Hand className="w-3.5 h-3.5" />
          Usap Permukaan ({rubCount})
        </button>
      </div>

      {/* Qualitative Bahasa Indonesia Tactile Impression */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs">
        <div className="text-orange-200">
          <span className="text-slate-400">Kesan Sentuhan: </span>
          <span className="font-semibold text-white">
            {progress >= 30 ? touchFeeling : 'Usap benda untuk merasakan...'}
          </span>
        </div>
        <div className="text-orange-200">
          <span className="text-slate-400">Permukaan: </span>
          <span className="font-semibold text-white">
            {progress >= 60 ? touchSurface : 'Belum terasa'}
          </span>
        </div>
      </div>
    </div>
  );
};
