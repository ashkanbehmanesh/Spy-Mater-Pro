
export enum Language {
  EN = 'EN',
  FA = 'FA'
}

export enum GameMode {
  LOCAL = 'LOCAL',
  ONLINE = 'ONLINE'
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
  isHost?: boolean;
  isMe?: boolean;
}

export interface WordPair {
  en: string;
  fa: string;
}

export type PeerMessageType = 'STATE_UPDATE' | 'START_GAME' | 'PLAYER_JOINED' | 'SYNC_PLAYERS';

export interface PeerMessage {
  type: PeerMessageType;
  payload: any;
}
