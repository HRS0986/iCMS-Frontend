export interface ThreadSummary {
    id: string;
    subject: string;
    sender: string;
    receiver: string;
    date: string;
    time: string;
    sentiment: string;
    topics: string[];
    summary: string;
}

export interface ThreadSummaryResponse {
    data: ThreadSummary[];
    total: number;
    skip: number;
    limit: number;
}

export interface MockThreadSummary {
    id: string;
    title: string;
    rating: number;
}
export interface MockThreadSummaryResponse {
    products: MockThreadSummary[];
    total: number;
    skip: number;
    limit: number;
}