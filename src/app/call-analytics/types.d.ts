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
  id: string;
}

export interface CallRecord {
  description: string;
  transcription: string;
  call_recording_url: string;
  call_duration: number;
  call_date: string;
  call_code: string;
  sentiment_category: string;
  keywords: string[];
  summary: string;
  sentiment_score: number;
  call_id: string;
  analytics_id: string;
}

export interface ApiResponse {
  status: boolean;
  data: any;
  message: string;
  error_message: string[] | string;
}
