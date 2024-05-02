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

export interface OperatorAnalyticsOverTimeRecord {
  operator_id: number;
  operator_name: string;
  positive: number;
  negative: number;
  neutral: number;
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

export interface OperatorListItem {
  name: string;
  operator_id: number;
  id?: string;
}

export interface CallSettingsDetails {
  bellowNotify?: boolean;
  bellowScore?: number;
  aboveNotify?: boolean;
  aboveScore?: number;
  keywords?: string[];
  emails?: string[];
  checked?: boolean; //enable/disable email notifications
  dir?: string;
}

export interface CallOperatorDetails {
  total_calls: number;
  avg_handle_time: number;
  positive_calls: number;
  negative_calls: number;
  neutral_calls: number;
}

export interface ApiResponse {
  status: boolean;
  data: any;
  message: string;
  error_message: string[] | string;
}

export interface CallStatistics {
  total_calls: number;
  total_duration_in_sec: number;
  avg_call_time_in_sec: number;
}

export interface SentimentPercentages {
  positive: number;
  negative: number;
  neutral: number;
}
