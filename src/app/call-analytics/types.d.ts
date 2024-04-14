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
  title: string;
  date: Date;
  status: string;
  callUrl: string;
}
 export interface QueuedFile {
   file: File;
   description: string;
   date: Date;
 }

interface ApiResponse {
  message: string;
  // Add other properties as needed
}

interface CallRecord {
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
