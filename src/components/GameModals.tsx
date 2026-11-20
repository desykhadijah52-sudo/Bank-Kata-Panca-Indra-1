import React from 'react';
import { Award, BookOpen, CheckCircle2, Home, Play, RotateCcw, XCircle } from 'lucide-react';
import { SENSES } from '../data/sensoryCatalog';
import type { RoundRecord } from '../types/game';
import { SenseIcon } from './SenseIcons';

interface PauseModalProps {
  open: boolean;
  onResume: () => void;
  onOpenDictionary: () => void;
  onRestart: () => void;
  onBackToTitle: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  open,
  onResume,
  onOpenDictionary,
  onRestart,
  onBackToTitle,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-slate-950/80 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-title"
    >
      <div className="w-full max-w-sm bg-[#16272C] border border-white/15 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-pop-settle">
        <div className="text-center">
          <h2 id="pause-title" className="font-display text-2xl font-bold text-[#FAF7F0]">
            Permainan Dijeda
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Istirahat sejenak sebelum melanjutkan menyusun kalimat deskripsi.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onResume}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold cursor-pointer transition-colors"
          >
            <Play className="w-4 h-4" />
            Lanjutkan Bermain
          </button>

          <button
            type="button"
            onClick={onOpenDictionary}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-white/10 text-sm font-semibold cursor-pointer transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            Buka Kamus Bank Kata
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-white/10 text-sm font-semibold cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Mulai Ulang Babak
          </button>

          <button
            type="button"
            onClick={onBackToTitle}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-slate-800/70 text-slate-300 text-sm font-medium cursor-pointer transition-colors"
          >
            <Home className="w-4 h-4" />
            Kembali ke Layar Utama
          </button>
        </div>
      </div>
    </div>
  );
};

interface SummaryModalProps {
  open: boolean;
  score: number;
  bestStreak: number;
  records: RoundRecord[];
  isVictory: boolean;
  onPlayAgain: () => void;
  onOpenDictionary: () => void;
  onBackToTitle: () => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  open,
  score,
  bestStreak,
  records,
  isVictory,
  onPlayAgain,
  onOpenDictionary,
  onBackToTitle,
}) => {
  if (!open) return null;

  const correctCount = records.filter((r) => r.correct).length;
  const accuracy = records.length > 0 ? Math.round((correctCount / records.length) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-40 bg-slate-950/85 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-title"
    >
      <div className="w-full max-w-xl max-h-[88vh] flex flex-col bg-[#16272C] border border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-pop-settle">
        {/* Top Banner */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 id="summary-title" className="font-display text-2xl font-bold text-[#FAF7F0]">
                {isVictory ? 'Babak Deskripsi Selesai!' : 'Permainan Berakhir'}
              </h2>
              <p className="text-xs text-slate-400">
                Rekap cerapan panca indra dan kosakata Bahasa Indonesia yang berhasil dikuasai.
              </p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-3 gap-3 px-6 py-4 bg-slate-900/50 border-b border-white/10">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Total Skor</span>
            <span className="font-mono tabular-nums text-2xl font-bold text-amber-300">
              {score}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Ketepatan</span>
            <span className="font-mono tabular-nums text-2xl font-bold text-emerald-300">
              {accuracy}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Kombo Terbaik</span>
            <span className="font-mono tabular-nums text-2xl font-bold text-sky-300">
              {bestStreak}×
            </span>
          </div>
        </div>

        {/* Per-object Breakdown */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2">
          {records.map((rec, idx) => (
            <div
              key={`${rec.objectId}-${idx}`}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-white/10"
            >
              <div className="flex items-center gap-3 min-w-0">
                {rec.correct ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#FAF7F0] truncate">
                    {rec.objectName}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <SenseIcon sense={rec.sense} className="w-3 h-3 text-amber-300" />
                    <span>{SENSES[rec.sense].name}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">{rec.wordsMatched.join(', ')}</span>
                  </div>
                </div>
              </div>
              <span className="font-mono tabular-nums text-xs font-semibold text-amber-300 shrink-0">
                +{rec.pointsEarned}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 bg-slate-900/40">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenDictionary}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-semibold text-slate-200 cursor-pointer whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              Kamus Kata
            </button>
            <button
              type="button"
              onClick={onBackToTitle}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-transparent hover:bg-slate-800 text-xs font-semibold text-slate-300 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Home className="w-4 h-4" />
              Layar Utama
            </button>
          </div>

          <button
            type="button"
            onClick={onPlayAgain}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Main Lagi
          </button>
        </div>
      </div>
    </div>
  );
};
