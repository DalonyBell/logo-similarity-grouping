
export interface Logo {
  id: string;
  url: string;
  websiteUrl: string;
  imageUrl: string;
  similarityScore?: number;
  groupId?: string;
}

export interface LogoGroup {
  id: string;
  logos: Logo[];
  similarityThreshold: number;
}

export type ProcessState = 'idle' | 'extracting' | 'processing' | 'success' | 'error';

export interface ProcessStatus {
  state: ProcessState;
  message?: string;
  progress?: number;
}
