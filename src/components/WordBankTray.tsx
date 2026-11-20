import React from 'react';
import { Check, HelpCircle, RotateCcw, Volume2, X } from 'lucide-react';
import { SENSES, SENSE_ORDER } from '../data/sensoryCatalog';
import type { ObjectItem, SenseId } from '../types/game';
import { audioEngine } from '../utils/audioEngine';
import { SenseIcon } from './SenseIcons';

interface WordBankTrayProps {
  item: ObjectItem;
  shuffledBank: string[];
  selectedSense: SenseId | null;
  selectedWords: string[];
  hintTier: number;
  feedbackState: 'idle' | 'error' | 'success';
  feedbackMessage: string;
  onSelectSense: (sense: SenseId) => void;
  onToggleWord: (word: string) => void;
  onUseHint: () => void;
  onClearSlots: () => void;
  onSubmit: () => void;
}

export const WordBankTray: React.FC<WordBankTrayProps> = ({
  item,
  shuffledBank,
  selectedSense,
  selectedWords,
  hintTier,
  feedbackState,
  feedbackMessage,
  onSelectSense,
  onToggleWord,
  onUseHint,
  onClearSlots,
  onSubmit,
}) => {
  const canSubmit = selectedSense !== null && selectedWords.length === 2;
  const hintedSense = hintTier >= 1 ? item.sense : null;
  const hintedWord = hintTier >= 2 ? item.targetWords[0] : null;
  const [part0, part1, part2] = item.sentenceParts;

  const speakCurrentSentence = () => {
    const w1 = selectedWords[0] ?? 'titik-titik';
    const w2 = selectedWords[1] ?? 'titik-titik';
    audioEngine.speakIndonesian(`${part0}${w1}${part1}${w2}${part2}`);
  };

  const renderInlineSlot = (slotIdx: 0 | 1) => {
    const word = selectedWords[slotIdx];
    return (
      <button
        type="button"
        disabled={!word}
        onClick={() => word && onToggleWord(word)}
        className={`inline-flex items-center gap-1.5 mx-1 px-3 py-1 rounded-lg border-2 text-sm font-bold align-baseline transition-all duration-150 ${
          word
            ? 'bg-[#FAF7F0] text-slate-950 border-amber-400 cursor-pointer hover:bg-amber-50'
            : 'bg-slate-950/70 text-slate-400 border-dashed border-amber-400/45 cursor-default'
        }`}
      >
        <span>{word ? word : `kata ${slotIdx + 1}`}</span>
        {word && <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
      </button>
    );
  };

  return (
    <section
      aria-label="Panel Bank Kata dan Cerapan Panca Indra"
      className={`flex flex-col gap-4 bg-[#16272C] border border-white/12 rounded-2xl p-4 sm:p-5 shadow-lg ${
        feedbackState === 'error' ? 'animate-gentle-shake' : ''
      }`}
    >
      {/* Step 1: Cerapan Panca Indra Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#FAF7F0]">
            1. Tentukan Cerapan Panca Indra
          </h3>
          <span className="text-xs text-slate-400">Tombol 1–5</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SENSE_ORDER.map((senseId) => {
            const meta = SENSES[senseId];
            const isSelected = selectedSense === senseId;
            const isHinted = hintedSense === senseId && !isSelected;

            return (
              <button
                key={senseId}
                type="button"
                onClick={() => onSelectSense(senseId)}
                className={`relative flex items-center sm:flex-col sm:justify-center gap-2 sm:gap-1 px-2.5 py-2.5 min-h-[48px] rounded-xl border text-left sm:text-center transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                    : isHinted
                    ? 'bg-sky-500/15 text-sky-100 border-sky-400/60 ring-2 ring-sky-400/50'
                    : 'bg-slate-900/75 text-slate-200 border-white/10 hover:bg-slate-800/90 hover:border-white/25'
                }`}
              >
                <SenseIcon
                  sense={senseId}
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-slate-950' : 'text-amber-300'
                  }`}
                />
                <div className="flex flex-col sm:items-center min-w-0">
                  <span className="text-xs font-bold leading-tight whitespace-nowrap">
                    {meta.name}
                  </span>
                  <span
                    className={`text-[10px] leading-tight whitespace-nowrap ${
                      isSelected ? 'text-slate-800 font-medium' : 'text-slate-400'
                    }`}
                  >
                    {meta.phraseHint}
                  </span>
                </div>
                <span
                  className={`hidden sm:inline-block absolute top-1 right-1.5 text-[10px] font-mono ${
                    isSelected ? 'text-slate-800' : 'text-slate-500'
                  }`}
                >
                  {meta.keyHint}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Kalimat Teks Deskripsi Rumpang */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#FAF7F0]">
            2. Lengkapi Kalimat Teks Deskripsi
          </h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={speakCurrentSentence}
              className="inline-flex items-center gap-1 text-xs font-medium text-amber-300 hover:text-amber-200 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Bacakan Kalimat
            </button>
            {selectedWords.length > 0 && (
              <button
                type="button"
                onClick={onClearSlots}
                className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Kosongkan
              </button>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-white/12 px-4 py-3.5 text-sm sm:text-base text-[#FAF7F0] leading-loose">
          <span>{part0}</span>
          {renderInlineSlot(0)}
          <span>{part1}</span>
          {renderInlineSlot(1)}
          <span>{part2}</span>
        </div>
      </div>

      {/* Bank Kata Tile Tray */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-slate-400">
          Bank Kata — pilih 2 kata yang padu dengan kalimat di atas
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {shuffledBank.map((word) => {
            const isChosen = selectedWords.includes(word);
            const isHinted = hintedWord === word && !isChosen;

            return (
              <button
                key={word}
                type="button"
                onClick={() => onToggleWord(word)}
                className={`min-h-[44px] px-3 py-2 rounded-xl border text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-amber-400 ${
                  isChosen
                    ? 'bg-amber-400/20 text-amber-200 border-amber-400 ring-1 ring-amber-400/50'
                    : isHinted
                    ? 'bg-emerald-500/20 text-emerald-100 border-emerald-400 ring-2 ring-emerald-400/45'
                    : 'bg-slate-900/90 text-[#FAF7F0] border-white/12 hover:bg-slate-800 hover:border-white/30'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint Clue Display */}
      {hintTier >= 3 && (
        <div className="rounded-xl bg-sky-500/12 border border-sky-400/35 px-3.5 py-2.5 text-xs text-sky-100 animate-pop-settle">
          <span className="font-semibold text-sky-300">Kisi Bahasa: </span>
          {item.hintClue}
        </div>
      )}

      {/* Feedback Banner */}
      {feedbackMessage && (
        <div
          role="status"
          className={`rounded-xl px-3.5 py-2.5 text-xs font-medium border animate-pop-settle ${
            feedbackState === 'success'
              ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200'
              : 'bg-rose-500/15 border-rose-400/40 text-rose-200'
          }`}
        >
          {feedbackMessage}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <button
          type="button"
          onClick={onUseHint}
          disabled={hintTier >= 3 || feedbackState === 'success'}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-45 disabled:cursor-not-allowed border border-white/12 text-xs font-semibold text-slate-200 cursor-pointer whitespace-nowrap shrink-0 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-sky-300" />
          {hintTier === 0
            ? 'Petunjuk (1/3)'
            : hintTier === 1
            ? 'Buka Kata Pertama (2/3)'
            : hintTier === 2
            ? 'Baca Kisi Kalimat (3/3)'
            : 'Semua Petunjuk Terbuka'}
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit || feedbackState === 'success'}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 text-sm font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors shadow-sm"
        >
          <Check className="w-4 h-4" />
          Periksa Kalimat
        </button>
      </div>
    </section>
  );
};
