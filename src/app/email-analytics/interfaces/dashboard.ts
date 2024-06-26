import { StringSchemaDefinition } from "mongoose";

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


//---------- End of Ravindu's interfaces--------------------------------------------------------

export interface get_current_overall_sentiments_response{
    positive_percentage:number;
    neutral_percentage:number;
    negative_percentage:number;
}


export interface word_cloud_single_response{
    topic: string;
    frequency: number;
    color: string;
}


export interface stat_card_single_response{
    title: number;
    sub_title: string;
    header: string;
    sentiment: string;
    imgPath: string;
}

export interface SentimentsByTopicResponse{
    sbtChartLabels: string[];
    sbtChartColors: string[];
    sbtChartValues: number[];
}
    
export interface SentimentsByTimeResponse{
    labels: string[];
    positive_values: number[];
    neutral_values: number[];
    negative_values: number[];
}


export interface SentimentsDistributionByTimeResponse{
    labels_freq: string[];
    positive_values_freq: number[];
    neutral_values_freq: number[];
    negative_values_freq: number[];
    labels_mean: string[];
    positive_values_mean: number[];
    neutral_values_mean: number[];
    negative_values_mean: number[];
}
    
export interface GaugeChartResponse{
    value: number;
}


//-------------------------------------------------Issues and inquires interfaces---------------------------------------------------

export interface IssueInquiryFreqByProdcuts{
    product_labels: string[];
    issue_freq: number[];
    inquiry_freq: number[];
    best_product: string;
    worst_product: string;
}

export interface IssueInquiryFreqByTypeResponse{
    issue_type_labels: string[];
    issue_type_frequencies: number[];
    inquiry_type_labels: string[];
    inquiry_type_frequencies: number[];
}
    
export interface IssuesByEfficiencyEffectivenessResponse{
    effectiveness_categories:string[];
    effectiveness_frequencies: number[];
    efficiency_categories: string[];
    efficiency_frequencies: number[];
}

export interface InquiriesByEfficiencyEffectivenessResponse{
    effectiveness_categories: string[];
    effectiveness_frequencies: number[];
    efficiency_categories: string[];
    efficiency_frequencies: number[];
    
}
export interface OverallyEfficiencyEffectivenessPecentagesResponse{
    effectiveness_categories: string[];
    effectiveness_percentages: number[];
    efficiency_categories: string[];
    efficiency_percentages: number[];
    
}
export interface OngoingAndClosedStatsResponse{
    count_total_closed_issues: number; 
    count_total_ongoing_issues: number; 
    count_total_closed_inquiries: number;  
    count_total_ongoing_inquiries: number; 
    ongoing_percentage: number;  
    closed_percentage: number; 
    ongoing_percentage_issues: number;  
    closed_percentage_issues: number; 
    ongoing_percentage_inquiry: number;  
    closed_percentage_inquiry: number; 

}
    
    
export interface BestPerformingEmailAccResponse{  
    best_performing_email_acc: string;
}
    
export interface EmailAccEfficiencyResponse{
    
    all_reading_email_accs: string[]; 
    ineff_percentages: number[];
    less_eff_percentages: number[]; 
    mod_eff_percentages: number[]; 
    highly_eff_percentages: number[];
    
}
    
export interface OverdueIssuesResponse{  
    
    sum_overdue_issues:number; 
    all_reading_email_accs: string[];
    overdue_issues_count_per_each_email: number[];
    total_ongoing_issues: number;  
}