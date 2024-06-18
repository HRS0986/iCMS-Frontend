export interface Content {
  title?: string;
  subtitle?: string;
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

export interface CampaignData {
  subtitle?: string;
  data?: Campaign[];
}
