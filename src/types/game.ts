export type SenseId =
  | 'penglihatan'
  | 'pendengaran'
  | 'penciuman'
  | 'pengecapan'
  | 'perabaan';

export type MechanicType =
  | 'focus_lens'
  | 'sound_wave'
  | 'scent_fan'
  | 'taste_dropper'
  | 'texture_rub';

export type GameState =
  | 'TITLE_MENU'
  | 'PLAYING'
  | 'PAUSED'
  | 'ROUND_SUMMARY'
  | 'GAME_OVER';

export type DifficultyMode = 'santai' | 'tantangan';

export interface SenseMeta {
  id: SenseId;
  name: string;
  phraseHint: string;
  mechanicLabel: string;
  shortDesc: string;
  accentHex: string;
  keyHint: string;
}

export interface ObjectVisualSpec {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  soundPreset?: 'drum' | 'guitar' | 'alarm';
  tasteActionLabel?: string;
  tasteMood?: 'asam' | 'manis' | 'asin';
  touchFeeling?: string;
  touchSurface?: string;
  roughnessAudio?: number;
  aromaNotes?: string[];
  visualDetailTags?: string[];
}

export interface ObjectItem {
  id: string;
  name: string;
  category: string;
  sense: SenseId;
  mechanicType: MechanicType;
  instruction: string;
  sensoryDiscovery: string;
  /** Three text segments framing the 2 blank word slots in a Bahasa Indonesia descriptive sentence */
  sentenceParts: [string, string, string];
  targetWords: [string, string];
  distractorWords: string[];
  hintClue: string;
  visual: ObjectVisualSpec;
}

export interface WordBankEntry {
  word: string;
  sense: SenseId;
  meaning: string;
  exampleSentence: string;
}

export interface RoundRecord {
  objectId: string;
  objectName: string;
  sense: SenseId;
  correct: boolean;
  hintsUsed: number;
  pointsEarned: number;
  wordsMatched: [string, string];
}
