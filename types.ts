
export enum Language {
  EN = 'EN',
  FA = 'FA'
}

export enum GameState {
  SETUP = 'SETUP',
  REVEAL = 'REVEAL',
  PLAYING = 'PLAYING',
  SUMMARY = 'SUMMARY'
}

export interface Player {
  id: string;
  name: string;
  isSpy: boolean;
  hasSeenRole: boolean;
}

export interface WordPair {
  en: string;
  fa: string;
}
