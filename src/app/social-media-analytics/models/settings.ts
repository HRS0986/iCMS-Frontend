export interface AlertType {
  name: string;
}

export interface SettingAlertsData {
  subtitle?: string;
  data?: AlertItem[];
}

export interface AlertItem {
  keyword?: string;
  sm_id?: string;
  alerttype?: string;
  threshold?: string;
  min_val?: number;
  max_val?: number;
  author?: string;
}

export interface SettingContent{
  title: string;
  content: any;
}

export interface AlertItem {
  keyword?: string;
  sm_id?: string;
  alerttype?: string;
  threshold?: string;
  min_val?: number;
  max_val?: number;
  author?: string;
}

export interface Thresholds {
  platform: string;
  alert_type: string;
  overallSentiment: string | number; // Change the type to string | number
  color: string;
  min_val: number;
  max_val: number;
}
