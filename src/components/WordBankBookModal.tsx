import React, { useState } from 'react';
import { BookOpen, Lock, Volume2, X } from 'lucide-react';
import { SENSES, SENSE_ORDER, WORD_BANK_ENTRIES } from '../data/sensoryCatalog';
import type { SenseId } from '../types/game';
import { audioEngine } from '../utils/audioEngine';
import { SenseIcon } from './SenseIcons';

interface WordBankBookModalProps {
  open: boolean;
  unlockedWords: string[];
  onClose: () => void;
}

export const WordBankBookModal: React.FC<WordBankBookModalProps> = ({
  open,
  unlockedWords,
  onClose,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | SenseId>('all');

  if (!open) return null;

  const filtered =
    activeFilter === 'all'
      ? WORD_BANK_ENTRIES
      : WORD_BANK_ENTRIES.filter((entry) => entry.sense === activeFilter);

  const unlockedCount = WORD_BANK_ENTRIES.filter((e) =>
    unlockedWords.includes(e.word)
  ).length;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kamus-title"
    >
      <div className="w-full max-w-3xl max-h-[86vh] flex flex-col bg-[#142328] border border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-pop-settle">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h2 id="kamus-title" className="font-display text-xl font-bold text-[#FAF7F0]">
                Kamus Bank Kata Panca Indra
              </h2>
              <p className="text-xs text-slate-400">
                Terkumpul{' '}
                <span className="font-mono tabular-nums text-amber-300 font-semibold">
                  {unlockedCount}/{WORD_BANK_ENTRIES.length}
                </span>{' '}
                kosakata sensorik
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
            aria-label="Tutup kamus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Sense Filter Tabs */}
        <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/10 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              activeFilter === 'all'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Semua Indra
          </button>
          {SENSE_ORDER.map((senseId) => {
            const meta = SENSES[senseId];
            return (
              <button
                key={senseId}
                type="button"
                onClick={() => setActiveFilter(senseId)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeFilter === senseId
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                <SenseIcon sense={senseId} className="w-3.5 h-3.5" />
                {meta.name}
              </button>
            );
          })}
        </div>

        {/* Word Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((entry) => {
            const isUnlocked = unlockedWords.includes(entry.word);
            const senseMeta = SENSES[entry.sense];

            return (
              <div
                key={entry.word}
                onClick={() => {
                  if (isUnlocked) {
                    audioEngine.playSenseClick();
                    audioEngine.speakIndonesian(
                      `${entry.word}. ${entry.meaning} Contoh kalimat: ${entry.exampleSentence}`
                    );
                  }
                }}
                className={`flex flex-col justify-between gap-2 p-3.5 rounded-xl border transition-colors ${
                  isUnlocked
                    ? 'bg-slate-900/80 border-white/15 hover:border-amber-400/40 cursor-pointer'
                    : 'bg-slate-950/50 border-white/5 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-lg font-bold text-[#FAF7F0]">
                    {entry.word}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <SenseIcon sense={entry.sense} className="w-3.5 h-3.5 text-amber-300" />
                    <span>{senseMeta.name}</span>
                  </div>
                </div>

                {isUnlocked ? (
                  <>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {entry.meaning}
                    </p>
                    <div className="flex items-start justify-between gap-2 text-[11px] text-emerald-300 pt-1.5 border-t border-white/5">
                      <span className="italic">"{entry.exampleSentence}"</span>
                      <Volume2 className="w-3.5 h-3.5 opacity-70 shrink-0 mt-0.5" />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 py-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Lengkapi kalimat deskripsi untuk membuka kata ini.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
