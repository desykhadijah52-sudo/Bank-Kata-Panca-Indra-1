import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import type { ObjectItem } from '../../types/game';
import { audioEngine } from '../../utils/audioEngine';

interface TasteDropperStageProps {
  item: ObjectItem;
  progress: number;
  onProgressChange: (next: number) => void;
}

export const TasteDropperStage: React.FC<TasteDropperStageProps> = ({
  item,
  progress,
  onProgressChange,
}) => {
  const [serveCount, setServeCount] = useState(0);
  const [tasted, setTasted] = useState(false);

  const mood = item.visual.tasteMood ?? 'manis';
  const actionLabel = item.visual.tasteActionLabel ?? 'Sajikan';

  const handlePrepare = () => {
    audioEngine.playTasteDrop(mood);
    setServeCount((c) => c + 1);
    onProgressChange(Math.min(100, progress + 35));
  };

  const handleTaste = () => {
    audioEngine.playTasteDrop(mood);
    setTasted(true);
    onProgressChange(100);
  };

  const getTasteDescription = () => {
    if (item.id === 'jeruk-nipis') {
      return tasted
        ? 'Kesan Cicip: Sari jeruk terasa kecut menyegarkan seketika di mulut!'
        : serveCount > 0
        ? 'Perasan sari jeruk menetes ke dalam gelas. Klik "Cicipi Sajian" untuk merasakan!'
        : 'Klik belahan jeruk nipis untuk memeras sarinya ke dalam gelas.';
    }
    if (item.id === 'gula-merah') {
      return tasted
        ? 'Kesan Cicip: Manis legit dan kental khas gula aren terasa nikmat!'
        : serveCount > 0
        ? 'Lelehan gula aren bercampur ke mangkuk. Klik "Cicipi Sajian"!'
        : 'Klik keping gula aren untuk menuangkan lelehannya ke mangkuk.';
    }
    return tasted
      ? 'Kesan Cicip: Rasa asin alami garam laut berpadu gurih di kuah hangat!'
      : serveCount > 0
      ? 'Butiran garam larut di kuah hangat. Klik "Cicipi Sajian"!'
      : 'Klik kristal garam laut untuk menaburkannya ke dalam mangkuk kuah.';
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full h-56 sm:h-64 rounded-xl border border-white/15 bg-gradient-to-b from-rose-950/35 via-slate-900 to-slate-950 flex items-center justify-around px-5 gap-4 overflow-hidden select-none">
        {/* Interactive Food Source */}
        <button
          type="button"
          onClick={handlePrepare}
          className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-white/15 cursor-pointer active:scale-95 transition-transform"
        >
          {item.id === 'jeruk-nipis' && (
            <svg viewBox="0 0 120 120" className="w-24 h-24">
              <circle cx="60" cy="60" r="46" fill="#65A30D" />
              <circle cx="60" cy="60" r="39" fill="#ECFCCB" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <path
                  key={deg}
                  d="M60 60 L48 26 A36 36 0 0 1 72 26 Z"
                  fill="#BEF264"
                  transform={`rotate(${deg} 60 60)`}
                />
              ))}
              <circle cx="60" cy="60" r="5" fill="#ECFCCB" />
            </svg>
          )}
          {item.id === 'gula-merah' && (
            <svg viewBox="0 0 120 120" className="w-24 h-24">
              <ellipse cx="60" cy="84" rx="42" ry="18" fill="#78350F" />
              <path d="M18 84 L24 44 C24 32, 96 32, 96 44 L102 84 Z" fill="#92400E" />
              <ellipse cx="60" cy="44" rx="36" ry="14" fill="#B45309" />
              <ellipse cx="52" cy="41" rx="14" ry="5" fill="#F59E0B" opacity="0.45" />
            </svg>
          )}
          {item.id === 'garam-laut' && (
            <svg viewBox="0 0 120 120" className="w-24 h-24">
              <path d="M22 76 Q60 98 98 76 L90 92 Q60 106 30 92 Z" fill="#475569" />
              <polygon points="35,74 52,50 68,74" fill="#F8FAFC" stroke="#BAE6FD" strokeWidth="1.5" />
              <polygon points="56,76 74,44 90,76" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.5" />
              <polygon points="46,78 60,58 76,78" fill="#FFFFFF" />
            </svg>
          )}
          <span className="text-xs font-semibold text-rose-200 whitespace-nowrap">
            {actionLabel} ({serveCount})
          </span>
        </button>

        {/* Serving Glass / Bowl & Taste Action */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-36 h-32 flex items-center justify-center">
            {item.id === 'jeruk-nipis' ? (
              <svg viewBox="0 0 140 130" className="w-full h-full">
                {/* Tall Glass */}
                <path d="M40 24 H100 L92 114 H48 Z" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
                {/* Liquid fill proportional to serveCount */}
                <path
                  d={`M${44 - Math.min(serveCount, 3)} ${95 - Math.min(serveCount, 3) * 18} H${96 + Math.min(serveCount, 3)} L91 112 H49 Z`}
                  fill="#BEF264"
                  opacity={serveCount > 0 ? 0.85 : 0.2}
                />
                {/* Ice cubes */}
                {serveCount > 0 && (
                  <>
                    <rect x="55" y="72" width="16" height="16" rx="3" fill="#E0F2FE" opacity="0.7" transform="rotate(-12 63 80)" />
                    <rect x="72" y="82" width="14" height="14" rx="3" fill="#E0F2FE" opacity="0.6" transform="rotate(14 79 89)" />
                  </>
                )}
              </svg>
            ) : (
              <svg viewBox="0 0 140 130" className="w-full h-full">
                {/* Warm Ceramic Bowl */}
                <path d="M24 58 H116 C116 96, 94 112, 70 112 C46 112, 24 96, 24 58 Z" fill="#F5F5F4" stroke="#CBD5E1" strokeWidth="2.5" />
                <ellipse
                  cx="70"
                  cy="58"
                  rx="44"
                  ry="11"
                  fill={
                    item.id === 'gula-merah'
                      ? serveCount > 0
                        ? '#92400E'
                        : '#FEF3C7'
                      : serveCount > 0
                      ? '#FDE68A'
                      : '#E2E8F0'
                  }
                />
                {serveCount > 0 && (
                  <path d="M52 38 Q56 26 52 16 M72 34 Q76 22 72 12 M90 38 Q94 26 90 16" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" opacity="0.45" fill="none" />
                )}
              </svg>
            )}
          </div>

          <button
            type="button"
            onClick={handleTaste}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
              tasted
                ? 'bg-rose-500 text-white'
                : 'bg-rose-500/20 hover:bg-rose-500/35 text-rose-100 border border-rose-400/40'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            {tasted ? 'Sudah Dicicipi' : 'Cicipi Sajian'}
          </button>
        </div>
      </div>

      {/* Feedback Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs">
        <span className="text-rose-100">{getTasteDescription()}</span>
        <span className="font-mono tabular-nums text-rose-300 font-semibold shrink-0">
          {progress}%
        </span>
      </div>
    </div>
  );
};
