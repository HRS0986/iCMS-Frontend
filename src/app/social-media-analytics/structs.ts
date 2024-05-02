
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

export interface Campaign {
  id?: string;
  sm_id?: string;
  title?: string;
  company?: string;
  min_val?: number;
  max_val?: number;
  overall_sentiment?: string;
  color?:string;
  min?: number;
  max?: number;
}

export interface Content {
  subtitle?: string;
  data?: Campaign[];
}
