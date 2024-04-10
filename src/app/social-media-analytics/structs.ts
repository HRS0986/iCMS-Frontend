
export interface TabItem {
  title: string;
  img: string;
}

export interface Content {
  title?: string;
  description?: string;
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