export interface PiPageItem {
  title?: string;
  totalComments: number;
  commentsImprovement: number;
  totalReactions: number;
  reactionsImprovement: number;
  HighlightedComments: number;
}

export interface HighlightedComments{
  id: string;
  name: string;
  img: string;
  comment: string;
  company: string;
  company_category: string;
  sentiment_score: number;
  color: string;
}
