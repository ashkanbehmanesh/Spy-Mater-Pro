
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
  VOTING = 'VOTING',
  SUMMARY = 'SUMMARY'
}

export interface Player {
  id: string;
  name: string;
  isSpy: boolean;
  hasSeenRole: boolean;
  votedForId?: string; // New: Tracks who this player suspect
  isHost?: boolean;
  isMe?: boolean;
}

export interface WordPair {
  en: string;
  fa: string;
}

export type PeerMessageType = 'STATE_UPDATE' | 'START_GAME' | 'PLAYER_JOINED' | 'PLAYER_LEFT' | 'SYNC_PLAYERS' | 'SUBMIT_VOTE';

export interface PeerMessage {
  type: PeerMessageType;
  payload: any;
}
