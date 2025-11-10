
export enum AppState {
  IDLE,
  CONNECTING,
  FETCHING_POSTS,
  ANALYZING,
  AWAITING_PERMISSION,
  GENERATING_COMMENT,
  COMMENT_READY,
  NOT_RELEVANT,
  ERROR,
}

export interface PostAnalysis {
  isRelevant: boolean;
  topic: string;
  summary: string;
}