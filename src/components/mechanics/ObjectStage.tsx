import React from 'react';
import { CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import type { ObjectItem } from '../../types/game';
import { audioEngine } from '../../utils/audioEngine';
import { FocusLensStage } from './FocusLensStage';
import { SoundWaveStage } from './SoundWaveStage';
import { ScentFanStage } from './ScentFanStage';
import { TasteDropperStage } from './TasteDropperStage';
import { TextureRubStage } from './TextureRubStage';

interface ObjectStageProps {
  item: ObjectItem;
  progress: number;
  onProgressChange: (next: number) => void;
}

export const ObjectStage: React.FC<ObjectStageProps> = ({
  item,
  progress,
  onProgressChange,
}) => {
  const isExplored = progress >= 100;

  return (
    <section
      aria-label={`Penghayatan Benda: ${item.name}`}
      className="flex flex-col gap-3.5 bg-[#16272C] border border-white/12 rounded-2xl p-4 sm:p-5 shadow-lg"
    >
      {/* Specimen Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{item.category}</span>
            <span aria-hidden="true">·</span>
            <span>Penghayatan Benda</span>
          </div>
          <div className="flex items-center gap-2.5 mt-0.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAF7F0]">
              {item.name}
            </h2>
            <button
              type="button"
              onClick={() =>
                audioEngine.speakIndonesian(`${item.name}. ${item.instruction}`)
              }
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-amber-300 cursor-pointer transition-colors"
              aria-label={`Bacakan petunjuk untuk ${item.name}`}
              title="Bacakan petunjuk"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Discovery Progress Readout */}
        <div className="flex flex-col items-end gap-1 min-w-[130px]">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            {isExplored ? (
              <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Kesan Terbuka
              </span>
            ) : (
              <span className="text-amber-300 font-mono tabular-nums">
                Penghayatan {progress}%
              </span>
            )}
          </div>
          <div className="w-32 h-2 rounded-full bg-slate-900 overflow-hidden border border-white/10">
            <div
              className={`h-full transition-all duration-150 ${
                isExplored ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Guiding Instruction */}
      <p className="text-sm text-slate-300 leading-relaxed">
        {item.instruction}
      </p>

      {/* Active Object-Specific Sensory Mechanic */}
      {item.mechanicType === 'focus_lens' && (
        <FocusLensStage
          item={item}
          progress={progress}
          onProgressChange={onProgressChange}
        />
      )}
      {item.mechanicType === 'sound_wave' && (
        <SoundWaveStage
          item={item}
          progress={progress}
          onProgressChange={onProgressChange}
        />
      )}
      {item.mechanicType === 'scent_fan' && (
        <ScentFanStage
          item={item}
          progress={progress}
          onProgressChange={onProgressChange}
        />
      )}
      {item.mechanicType === 'taste_dropper' && (
        <TasteDropperStage
          item={item}
          progress={progress}
          onProgressChange={onProgressChange}
        />
      )}
      {item.mechanicType === 'texture_rub' && (
        <TextureRubStage
          item={item}
          progress={progress}
          onProgressChange={onProgressChange}
        />
      )}

      {/* Unlocked Sensory Discovery Banner */}
      {isExplored && (
        <div className="flex items-start justify-between gap-2.5 rounded-xl bg-emerald-500/12 border border-emerald-400/35 px-3.5 py-2.5 text-sm text-emerald-100 animate-pop-settle">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-emerald-200">Kesan Panca Indra: </span>
              {item.sensoryDiscovery}
            </div>
          </div>
          <button
            type="button"
            onClick={() => audioEngine.speakIndonesian(item.sensoryDiscovery)}
            className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-200 shrink-0 cursor-pointer transition-colors"
            aria-label="Bacakan kesan panca indra"
            title="Bacakan kesan"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </section>
  );
};
