export interface GeneratedNameResult {
  name: string;
  explanation?: string;
}

export interface ScoredName extends GeneratedNameResult {
  score: number;
}

export interface GenerationResponse {
  success: boolean;
  names: ScoredName[];
  error?: string;
}
