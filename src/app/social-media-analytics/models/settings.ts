export interface AlertType {
  name: string;
}

export interface SettingAlertsData {
  subtitle?: string;
  data?: AlertItem[];
}

export interface AlertItem {
  product?: string;
  alerttype?: string;
  min_val?: number;
  max_val?: number;
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
  alert_type: string;
  min_val: number;
  max_val: number;
  sm_id: string;
  id: string;
}
