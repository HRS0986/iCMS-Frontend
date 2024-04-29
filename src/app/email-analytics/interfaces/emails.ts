export interface EmailMetadata {
    id: string;
    subject: string;
    sender: string;
    receiver: string;
    date: string;
    time: string;
    sentiment: string;
    topics: string[];
}

export interface EmailMetadataResponse {
    data: EmailMetadata[];
    total: number;
    skip: number;
    limit: number;
}