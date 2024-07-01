export interface OverallCallStatusPercentages {
  positive: number;
  negative: number;
  neutral: number;
}
export interface Topic {
  name: string;
  code: string;
}

export interface SentiCatg {
  name: string;
  code: string;
}
export interface CallRecording {
  call_id: string;
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
   operatorId: number;
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
  _id?: string;
  is_lower_threshold_enabled?: boolean;
  sentiment_lower_threshold?: number;
  is_upper_threshold_enabled?: boolean;
  sentiment_upper_threshold?: number;
  alert_keywords?: string[];
  is_keyword_alerts_enabled: boolean;
  topics?: string[];
  alert_email_receptions?: string[];
  is_email_alerts_enabled?: boolean;
  is_push_notifications_enabled?: boolean;
}

export interface CallOperatorDetails {
  total_calls: number;
  avg_handle_time: number;
  calls_in_last_day: number;
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

export interface BestOperatorItem {
  _id: number;
  name: string;
  avg_duration: number;
  total: number;
}

export interface SentimentOverTimeDataSet {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}
