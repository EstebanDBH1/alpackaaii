export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export enum Tone {
  NEUTRAL = 'Neutral',
  PROFESSIONAL = 'Profesional',
  CREATIVE = 'Creativo',
  PRECISE = 'Preciso',
  PERSUASIVE = 'Persuasivo'
}

export enum Complexity {
  CONCISE = 'Conciso',
  BALANCED = 'Equilibrado',
  DETAILED = 'Detallado'
}

export interface PromptRequest {
  originalPrompt: string;
  tone: Tone;
  complexity: Complexity;
  targetModel: string;
}

export interface OptimizationResult {
  original: string;
  optimized: string;
  explanation: string;
  timestamp: number;
}