import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import type { ObjectItem } from '../../types/game';
import { audioEngine } from '../../utils/audioEngine';

interface SoundWaveStageProps {
  item: ObjectItem;
  progress: number;
  onProgressChange: (next: number) => void;
}

export const SoundWaveStage: React.FC<SoundWaveStageProps> = ({
  item,
  progress,
  onProgressChange,
}) => {
  const [waveBars, setWaveBars] = useState<number[]>(Array(16).fill(12));
  const [pulseId, setPulseId] = useState(0);
  const [activeNoteLabel, setActiveNoteLabel] = useState<string>('Ketuk atau petik benda untuk memicu bunyi');
  const [vibratingString, setVibratingString] = useState<number | null>(null);
  const [bellTilt, setBellTilt] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setWaveBars((prev) =>
        prev.map((val) => Math.max(10, Math.round(val * 0.72)))
      );
    }, 85);
    return () => clearInterval(timer);
  }, []);

  const spikeWaveform = (amplitude: number) => {
    setWaveBars(
      Array.from({ length: 16 }, (_, idx) => {
        const centerFactor = 1 - Math.abs(idx - 7.5) / 9;
        return Math.min(96, Math.round(18 + amplitude * centerFactor * (0.65 + Math.random() * 0.45)));
      })
    );
    setPulseId((p) => p + 1);
  };

  const triggerDrum = (isRim: boolean) => {
    audioEngine.playDrumHit(isRim);
    spikeWaveform(isRim ? 72 : 95);
    setActiveNoteLabel(isRim ? 'Ketukan Tepi: Tak! Bunyi bertalu cepat' : 'Tabuhan Tengah: Dung! Suara bergema kuat');
    onProgressChange(Math.min(100, progress + 26));
  };

  const triggerGuitarString = (stringIndex: number) => {
    const noteNames = ['Senar 1', 'Senar 2', 'Senar 3', 'Senar 4', 'Senar 5', 'Senar 6'];
    audioEngine.playGuitarPluck(stringIndex);
    setVibratingString(stringIndex);
    setTimeout(() => setVibratingString(null), 260);
    spikeWaveform(62 + stringIndex * 5);
    setActiveNoteLabel(`${noteNames[stringIndex]} dipetik: Berdenting merdu dan jernih`);
    onProgressChange(Math.min(100, progress + 22));
  };

  const triggerAlarm = (mode: 'bell' | 'tick') => {
    audioEngine.playAlarmRing(mode);
    setBellTilt((prev) => !prev);
    spikeWaveform(mode === 'bell' ? 92 : 46);
    setActiveNoteLabel(
      mode === 'bell'
        ? 'Lonceng Weker: Kringgg! Berdering nyaring'
        : 'Jarum Detik: Tik-tik-tik, berdetak teratur'
    );
    onProgressChange(Math.min(100, progress + (mode === 'bell' ? 35 : 22)));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Acoustic Arena */}
      <div className="relative w-full h-56 sm:h-64 rounded-xl border border-white/15 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center overflow-hidden p-4 select-none">
        {/* Expanding Ripple */}
        {pulseId > 0 && (
          <div
            key={pulseId}
            className="absolute w-36 h-36 rounded-full border-2 border-amber-400/60 pointer-events-none animate-ripple-out"
          />
        )}

        {item.id === 'gendang' && (
          <div className="relative flex items-center gap-5 z-10">
            <button
              type="button"
              onClick={() => triggerDrum(false)}
              className="group relative w-40 h-40 rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-amber-300 border-[8px] border-amber-800 shadow-lg flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform duration-100"
              aria-label="Tabuh bagian tengah gendang"
            >
              <span className="w-16 h-16 rounded-full border-2 border-dashed border-amber-800/40 flex items-center justify-center text-xs font-bold text-amber-950">
                TENGAH
              </span>
            </button>
            <button
              type="button"
              onClick={() => triggerDrum(true)}
              className="px-4 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
            >
              Ketuk Tepi Kayu
            </button>
          </div>
        )}

        {item.id === 'gitar' && (
          <div className="relative w-full max-w-md h-40 rounded-xl bg-[#451A03] border-2 border-amber-700/60 flex flex-col justify-between py-3 px-4 z-10 shadow-inner">
            {/* Soundhole */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#1C0A00] border-4 border-amber-500/60 pointer-events-none" />
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => triggerGuitarString(idx)}
                onPointerEnter={(e) => {
                  if (e.buttons > 0) triggerGuitarString(idx);
                }}
                className="relative w-full h-5 flex items-center cursor-pointer group focus-visible:outline-none"
                aria-label={`Petik senar ${idx + 1}`}
              >
                <span
                  className={`block w-full rounded-full transition-transform duration-75 ${
                    vibratingString === idx
                      ? 'bg-amber-300 scale-y-150 shadow-[0_0_8px_rgba(252,211,77,0.8)]'
                      : 'bg-amber-100/80 group-hover:bg-amber-300'
                  }`}
                  style={{ height: `${1.5 + idx * 0.35}px` }}
                />
              </button>
            ))}
          </div>
        )}

        {item.id === 'weker' && (
          <div className="relative flex items-center gap-6 z-10">
            <button
              type="button"
              onClick={() => triggerAlarm('bell')}
              className={`relative w-36 h-36 rounded-full bg-red-600 border-4 border-slate-200 shadow-lg flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform ${
                bellTilt ? 'rotate-2' : '-rotate-2'
              }`}
              aria-label="Bunyikan lonceng jam weker"
            >
              {/* Twin bells */}
              <div className="absolute -top-4 left-3 w-8 h-5 rounded-t-full bg-amber-300 border-2 border-amber-600" />
              <div className="absolute -top-4 right-3 w-8 h-5 rounded-t-full bg-amber-300 border-2 border-amber-600" />
              <div className="w-24 h-24 rounded-full bg-slate-50 flex flex-col items-center justify-center text-slate-900">
                <span className="font-mono text-sm font-bold">06:00</span>
                <span className="text-[11px] font-semibold text-red-600">DERING!</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => triggerAlarm('tick')}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/15 text-slate-200 text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
            >
              Dengar Detak Jarum
            </button>
          </div>
        )}
      </div>

      {/* Live Oscilloscope Bar */}
      <div className="flex items-center justify-between gap-4 bg-slate-900/70 border border-white/10 rounded-xl px-3.5 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-medium text-amber-100 truncate">
            {activeNoteLabel}
          </span>
        </div>
        <div className="flex items-end gap-1 h-7 shrink-0" aria-hidden="true">
          {waveBars.map((heightPct, i) => (
            <span
              key={i}
              className="w-1.5 rounded-t bg-amber-400/90 transition-[height] duration-75"
              style={{ height: `${heightPct}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
