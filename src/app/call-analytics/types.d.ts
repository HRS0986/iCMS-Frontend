export interface CallStatistics {
  totalCalls: number;
  positiveCalls: number;
  negativeCalls: number;
  neutralCalls: number;
  averageCallTime: number;
  totalMinutes: number;
}

export interface OverallCallStatusPercentages {
  positive: number;
  negative: number;
  neutral: number;
}

export interface CallRecording {
  id: string;
  description: string;
  date: Date;
  duration: number;
  sentiment: string;
  callUrl: string;
  transcription: string;
  operator_id: number;
}
 export interface QueuedFile {
   file: File;
   description: string;
   date: Date;
 }

export interface ApiResponse {
  message: string;
  // Add other properties as needed
}

export interface CallOperator {
  name: string;
  operator_id: number;
  id?: string;
}

export interface ApiResponse {
  status: boolean;
  data: any;
  message: string;
  error_message: string[] | string;
}
