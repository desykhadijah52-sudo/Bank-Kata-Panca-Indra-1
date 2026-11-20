import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Heart,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PauseModal, SummaryModal } from './components/GameModals';
import { TitleEmblemLockup } from './components/SenseIcons';
import { WordBankBookModal } from './components/WordBankBookModal';
import { WordBankTray } from './components/WordBankTray';
import { ObjectStage } from './components/mechanics/ObjectStage';
import { OBJECTS, SENSES, SENSE_ORDER } from './data/sensoryCatalog';
import type {
  DifficultyMode,
  GameState,
  ObjectItem,
  RoundRecord,
  SenseId,
} from './types/game';
import { audioEngine } from './utils/audioEngine';

const TITLE_ART_URL =
  '/src/assets/images/title_sensory_workbench_1795140163637.jpg';
const SCHOOL_LOGO_URL = '/assets/aistudio/LOGO_SMPN_9_a8d1b2ad.png';
const STORAGE_KEY_UNLOCKED = 'bank_kata_panca_indra_unlocked_v1';

function shuffleArray<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildBalancedDeck(count: number): ObjectItem[] {
  if (count >= OBJECTS.length) {
    return shuffleArray(OBJECTS);
  }
  // Ensure at least 1 object from each of the 5 senses in shorter rounds
  const bySense = SENSE_ORDER.map((sense) =>
    shuffleArray(OBJECTS.filter((o) => o.sense === sense))
  );
  const picked: ObjectItem[] = [];
  let layer = 0;
  while (picked.length < count) {
    for (const group of bySense) {
      if (group[layer] && picked.length < count) {
        picked.push(group[layer]);
      }
    }
    layer++;
  }
  return shuffleArray(picked);
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [difficulty, setDifficulty] = useState<DifficultyMode>('santai');
  const [roundCount, setRoundCount] = useState<5 | 10 | 15>(5);
  const [deck, setDeck] = useState<ObjectItem[]>(() => buildBalancedDeck(5));
  const [currentIndex, setCurrentIndex] = useState(0);

  // Per-round interactive state
  const [inspectionProgress, setInspectionProgress] = useState(0);
  const [selectedSense, setSelectedSense] = useState<SenseId | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [hintTier, setHintTier] = useState(0);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'error' | 'success'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Score & session progression
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [records, setRecords] = useState<RoundRecord[]>([]);

  // Audio & Kamus Dictionary
  const [muted, setMuted] = useState(false);
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [titleImgError, setTitleImgError] = useState(false);
  const [unlockedWords, setUnlockedWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_UNLOCKED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const currentItem = deck[currentIndex] ?? deck[0];

  const shuffledBank = useMemo(() => {
    if (!currentItem) return [];
    const combined = Array.from(
      new Set([...currentItem.targetWords, ...currentItem.distractorWords])
    );
    return shuffleArray(combined);
  }, [currentItem]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(unlockedWords));
    } catch {
      // Ignore storage quota errors
    }
  }, [unlockedWords]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      audioEngine.setMuted(next);
      return next;
    });
  }, []);

  const resetRoundInputs = useCallback(() => {
    setInspectionProgress(0);
    setSelectedSense(null);
    setSelectedWords([]);
    setHintTier(0);
    setFeedbackState('idle');
    setFeedbackMessage('');
  }, []);

  const startNewGame = useCallback(
    (overrideCount?: 5 | 10 | 15, overrideMode?: DifficultyMode) => {
      const count = overrideCount ?? roundCount;
      const mode = overrideMode ?? difficulty;
      const newDeck = buildBalancedDeck(count);
      setDeck(newDeck);
      setCurrentIndex(0);
      setScore(0);
      setStreak(0);
      setBestStreak(0);
      setLives(mode === 'tantangan' ? 3 : 99);
      setRecords([]);
      resetRoundInputs();
      setGameState('PLAYING');
      audioEngine.playSenseClick();
    },
    [difficulty, resetRoundInputs, roundCount]
  );

  const handleSelectSense = useCallback(
    (sense: SenseId) => {
      if (feedbackState === 'success') return;
      setSelectedSense(sense);
      setFeedbackState('idle');
      setFeedbackMessage('');
      audioEngine.playSenseClick();
    },
    [feedbackState]
  );

  const handleToggleWord = useCallback(
    (word: string) => {
      if (feedbackState === 'success') return;
      setFeedbackState('idle');
      setFeedbackMessage('');
      setSelectedWords((prev) => {
        if (prev.includes(word)) {
          audioEngine.playTileRemove();
          return prev.filter((w) => w !== word);
        }
        audioEngine.playTileSelect();
        audioEngine.speakIndonesian(word, 1.0);
        if (prev.length >= 2) {
          return [prev[0], word];
        }
        return [...prev, word];
      });
    },
    [feedbackState]
  );

  const handleUseHint = useCallback(() => {
    if (hintTier >= 3 || feedbackState === 'success') return;
    audioEngine.playHintPing();
    setHintTier((prev) => {
      const next = prev + 1;
      if (next === 1) {
        setSelectedSense(currentItem.sense);
      }
      return next;
    });
  }, [currentItem, feedbackState, hintTier]);

  const handleSubmit = useCallback(() => {
    if (!currentItem || selectedSense === null || selectedWords.length !== 2) return;
    if (feedbackState === 'success') return;

    const senseCorrect = selectedSense === currentItem.sense;
    const exactOrderMatch =
      selectedWords[0] === currentItem.targetWords[0] &&
      selectedWords[1] === currentItem.targetWords[1];
    const hasBothWordsSwapped =
      selectedWords[0] === currentItem.targetWords[1] &&
      selectedWords[1] === currentItem.targetWords[0];

    if (senseCorrect && exactOrderMatch) {
      audioEngine.playSuccessChime();
      const nextStreak = streak + 1;
      const exploreBonus = inspectionProgress >= 100 ? 25 : 0;
      const streakBonus = (nextStreak - 1) * 20;
      const hintPenalty = hintTier * 15;
      const pointsEarned = Math.max(40, 100 + exploreBonus + streakBonus - hintPenalty);

      setScore((prev) => prev + pointsEarned);
      setStreak(nextStreak);
      setBestStreak((prev) => Math.max(prev, nextStreak));
      setFeedbackState('success');
      setFeedbackMessage(
        `Tepat! Kalimat deskripsi ${currentItem.name} mencerminkan cerapan ${SENSES[currentItem.sense].name.toLowerCase()} (+${pointsEarned} poin).`
      );
      const [p0, p1, p2] = currentItem.sentenceParts;
      audioEngine.speakIndonesian(
        `${p0}${currentItem.targetWords[0]}${p1}${currentItem.targetWords[1]}${p2}`
      );

      // Unlock words in dictionary
      setUnlockedWords((prev) =>
        Array.from(new Set([...prev, ...currentItem.targetWords]))
      );

      const newRecord: RoundRecord = {
        objectId: currentItem.id,
        objectName: currentItem.name,
        sense: currentItem.sense,
        correct: true,
        hintsUsed: hintTier,
        pointsEarned,
        wordsMatched: currentItem.targetWords,
      };
      setRecords((prev) => [...prev, newRecord]);

      setTimeout(() => {
        if (currentIndex + 1 < deck.length) {
          setCurrentIndex((i) => i + 1);
          resetRoundInputs();
        } else {
          audioEngine.playVictoryFanfare();
          setGameState('ROUND_SUMMARY');
        }
      }, 2100);
    } else if (senseCorrect && hasBothWordsSwapped) {
      audioEngine.playHintPing();
      setFeedbackState('error');
      setFeedbackMessage(
        'Kedua katanya sudah tepat, tetapi posisinya masih tertukar! Lepas lalu pasang kembali agar kalimatnya padu.'
      );
    } else {
      audioEngine.playErrorThud();
      setStreak(0);
      setFeedbackState('error');

      if (!senseCorrect) {
        setFeedbackMessage(
          'Cerapan panca indra belum tepat. Hayati kembali benda di sebelah kiri.'
        );
      } else {
        setFeedbackMessage(
          `Cerapan ${SENSES[currentItem.sense].name} sudah tepat, namun pilihan kata di Bank Kata belum padu dengan kalimat.`
        );
      }

      if (difficulty === 'tantangan') {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          const failedRecord: RoundRecord = {
            objectId: currentItem.id,
            objectName: currentItem.name,
            sense: currentItem.sense,
            correct: false,
            hintsUsed: hintTier,
            pointsEarned: 0,
            wordsMatched: currentItem.targetWords,
          };
          setRecords((prev) => [...prev, failedRecord]);
          setTimeout(() => {
            setGameState('GAME_OVER');
          }, 650);
        }
      }
    }
  }, [
    currentIndex,
    currentItem,
    deck.length,
    difficulty,
    feedbackState,
    hintTier,
    inspectionProgress,
    lives,
    resetRoundInputs,
    selectedSense,
    selectedWords,
    streak,
  ]);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (dictionaryOpen) {
        if (e.key === 'Escape') setDictionaryOpen(false);
        return;
      }

      if (gameState === 'TITLE_MENU') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startNewGame();
        }
        return;
      }

      if (gameState === 'PLAYING') {
        if (e.key === 'Escape') {
          e.preventDefault();
          setGameState('PAUSED');
          return;
        }
        const num = Number(e.key);
        if (num >= 1 && num <= 5) {
          e.preventDefault();
          handleSelectSense(SENSE_ORDER[num - 1]);
          return;
        }
        if (e.key === 'Enter' && selectedSense && selectedWords.length === 2) {
          e.preventDefault();
          handleSubmit();
        }
      } else if (gameState === 'PAUSED' && e.key === 'Escape') {
        e.preventDefault();
        setGameState('PLAYING');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    dictionaryOpen,
    gameState,
    handleSelectSense,
    handleSubmit,
    selectedSense,
    selectedWords.length,
    startNewGame,
  ]);

  // Render Title Screen
  if (gameState === 'TITLE_MENU') {
    return (
      <main className="relative w-full min-h-screen overflow-hidden bg-[#0B171A] text-[#FAF7F0] flex flex-col justify-between">
        {/* Key-Art Workbench Backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          {!titleImgError ? (
            <img
              src={TITLE_ART_URL}
              alt="Meja kerja uji benda panca indra dengan kaca pembesar, gendang, kopi, jeruk nipis, dan batu alam"
              referrerPolicy="no-referrer"
              onError={() => setTitleImgError(true)}
              className="w-full h-full object-cover object-right opacity-85"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0F2328] via-[#132226] to-[#1E293B]" />
          )}
          {/* Directional calm negative space scrim on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#091417] via-[#091417]/90 to-[#091417]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091417] via-transparent to-[#091417]/50" />
        </div>

        {/* Top Corner School Identity & Utility Controls */}
        <div className="relative z-10 flex items-center justify-between gap-4 px-6 sm:px-12 lg:px-16 pt-5">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={SCHOOL_LOGO_URL}
              alt="Logo SMP Negeri 9 Penajam Paser Utara"
              referrerPolicy="no-referrer"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain shrink-0 drop-shadow"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold text-[#FAF7F0] truncate">
                SMP Negeri 9 Penajam Paser Utara
              </span>
              <span className="text-[11px] text-amber-300/90 font-medium truncate">
                Media Pembelajaran Bahasa Indonesia
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setDictionaryOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-xs font-semibold text-slate-200 cursor-pointer transition-colors whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Kamus Bank Kata</span> ({unlockedWords.length})
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-slate-200 cursor-pointer transition-colors"
              aria-label={muted ? 'Nyalakan suara' : 'Matikan suara'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Left Hero Lockup & Game Setup */}
        <div className="relative z-10 flex-1 flex items-center px-6 sm:px-12 lg:px-16 py-6">
          <div className="max-w-lg flex flex-col gap-5">
            <TitleEmblemLockup />

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-md">
              Rasakan setiap benda secara langsung—lihat rupa, dengar bunyi, hirup wangi, cicipi
              rasa, dan raba permukaannya—lalu pilih cerapan panca indra serta lengkapi kalimat
              Teks Deskripsi dari Bank Kata.
            </p>

            {/* Mode & Round Length Segmented Selectors */}
            <div className="flex flex-col gap-3 bg-slate-950/70 border border-white/12 rounded-2xl p-4 max-w-md">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-slate-400">
                  Mode Permainan
                </span>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setDifficulty('santai')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                      difficulty === 'santai'
                        ? 'bg-amber-400 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Santai (Bebas Latihan)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDifficulty('tantangan')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                      difficulty === 'tantangan'
                        ? 'bg-amber-400 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Tantangan (3 Nyawa)
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-slate-400">
                  Jumlah Benda
                </span>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 rounded-xl">
                  {([5, 10, 15] as const).map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setRoundCount(cnt)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold font-mono tabular-nums cursor-pointer transition-colors whitespace-nowrap ${
                        roundCount === cnt
                          ? 'bg-slate-100 text-slate-950'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {cnt} Benda
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Start CTA */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => startNewGame()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-base font-bold cursor-pointer transition-transform active:scale-[0.98] shadow-lg whitespace-nowrap shrink-0"
              >
                <Play className="w-5 h-5 fill-current" />
                Mulai Bermain
              </button>
            </div>
          </div>
        </div>

        {/* Single Flat Control-Hint Line */}
        <footer className="relative z-10 px-6 sm:px-12 lg:px-16 pb-5">
          <p className="text-xs text-slate-400 font-medium">
            Klik atau Usap Benda untuk Menghayati · Tombol 1–5 Pilih Cerapan Indra · Enter Periksa Kalimat · Esc Jeda
          </p>
        </footer>

        <WordBankBookModal
          open={dictionaryOpen}
          unlockedWords={unlockedWords}
          onClose={() => setDictionaryOpen(false)}
        />
      </main>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0F1E22] text-[#FAF7F0] flex flex-col">
      {/* Compact Perimeter Game HUD */}
      <header className="w-full border-b border-white/10 bg-[#0B171A] px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Left: School Crest, Title & Round Progress */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={SCHOOL_LOGO_URL}
              alt="Logo SMP Negeri 9 Penajam Paser Utara"
              referrerPolicy="no-referrer"
              className="w-8 h-8 object-contain shrink-0"
            />
            <span className="font-display text-base sm:text-lg font-bold text-[#FAF7F0] whitespace-nowrap truncate">
              Bank Kata Panca Indra
            </span>
            <span className="text-xs font-mono tabular-nums text-amber-300 font-semibold whitespace-nowrap shrink-0">
              Benda {currentIndex + 1}/{deck.length}
            </span>
          </div>

          {/* Right: Telemetry Readouts + Utility Controls */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {difficulty === 'tantangan' && (
              <div
                className="flex items-center gap-1 text-rose-400"
                aria-label={`Sisa nyawa: ${lives}`}
              >
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Heart
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < lives ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 text-xs font-mono tabular-nums">
              <span className="text-slate-300">
                Skor <strong className="text-amber-300">{score}</strong>
              </span>
              <span className="hidden sm:inline text-slate-600" aria-hidden="true">
                ·
              </span>
              <span className="hidden sm:inline text-slate-300">
                Kombo <strong className="text-emerald-300">{streak}×</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setDictionaryOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-xs font-medium text-slate-200 cursor-pointer whitespace-nowrap"
                title="Kamus Bank Kata"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Kamus</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-slate-200 cursor-pointer"
                aria-label={muted ? 'Nyalakan suara' : 'Matikan suara'}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setGameState('PAUSED')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-xs font-medium text-slate-200 cursor-pointer whitespace-nowrap"
              >
                <Pause className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Jeda</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Two-Column Playfield */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left: Object-Specific Interactive Sensory Stage */}
          <div className="lg:col-span-6">
            <ObjectStage
              key={currentItem.id}
              item={currentItem}
              progress={inspectionProgress}
              onProgressChange={setInspectionProgress}
            />
          </div>

          {/* Right: Sense Selector & Word Bank Tray */}
          <div className="lg:col-span-6">
            <WordBankTray
              item={currentItem}
              shuffledBank={shuffledBank}
              selectedSense={selectedSense}
              selectedWords={selectedWords}
              hintTier={hintTier}
              feedbackState={feedbackState}
              feedbackMessage={feedbackMessage}
              onSelectSense={handleSelectSense}
              onToggleWord={handleToggleWord}
              onUseHint={handleUseHint}
              onClearSlots={() => {
                audioEngine.playTileRemove();
                setSelectedWords([]);
              }}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <PauseModal
        open={gameState === 'PAUSED'}
        onResume={() => setGameState('PLAYING')}
        onOpenDictionary={() => setDictionaryOpen(true)}
        onRestart={() => startNewGame()}
        onBackToTitle={() => setGameState('TITLE_MENU')}
      />

      <SummaryModal
        open={gameState === 'ROUND_SUMMARY' || gameState === 'GAME_OVER'}
        score={score}
        bestStreak={bestStreak}
        records={records}
        isVictory={gameState === 'ROUND_SUMMARY'}
        onPlayAgain={() => startNewGame()}
        onOpenDictionary={() => setDictionaryOpen(true)}
        onBackToTitle={() => setGameState('TITLE_MENU')}
      />

      <WordBankBookModal
        open={dictionaryOpen}
        unlockedWords={unlockedWords}
        onClose={() => setDictionaryOpen(false)}
      />
    </div>
  );
}
