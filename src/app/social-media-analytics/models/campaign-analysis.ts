export interface Content {
  title?: string;
  subtitle?: string;
}

export interface Campaign {
  _id?: string;
  platform?: string;
  description?: string;
  title?: string;
  company?: string;
  s_score?: number;
  color?:string;
}

export interface CampaignData {
  subtitle?: string;
  data?: Campaign[];
}
