export interface DashboardIssueData {
    timeUpdated: Date;
    newIssues: number;
    avgIssuePercentage: number;
}

export interface DashboardInquiryData {
    timeUpdated: Date;
    newInquiries: number;
    avgInquiryPercentage: number;
}

export interface DashboardSuggestionData {
    timeUpdated: Date;
    newSuggestions: number;
    avgSuggestionPercentage: number;
}

export interface DashboardSentimentData {
    timeUpdated: Date;
    currentSentimentScore: number;
    avgSentimentPercentage: number;
}

export interface DashboardSmallCardData {
    timeUpdated: Date;
    new: number;
    total: number;
    avg: number;
    avgPercentage: number;
}
