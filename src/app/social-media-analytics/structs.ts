
export interface TabItem {
  title: string;
  img: string;
}

export interface Content {
  title?: string;
  subtitle?: string;
}

export interface SettingAlertsData {
  subtitle?: string;
  data?: AlertItem[];
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

export interface highlightedComments{
  id: string;
  name: string;
  img: string;
  comment: string;
  company: string;
  company_category: string;
  sentiment_score: number;
  color: string;
}

export interface piPageItem {
  title?: string;
  totalComments: number;
  commentsImprovement: number;
  totalReactions: number;
  reactionsImprovement: number;
  HighlightedComments: number;
}

export interface campaign {
  id?: string;
  title?: string;
  company?: string;
  overall_sentiment?: string;
  color?:string;
  min?: number;
  max?: number;
}

export interface Thresholds {
  
  platform: string;
  alert_type: string;
  overallSentiment: string | number; // Change the type to string | number
  color: string;
  min_val: number;
  max_val: number;
  
}