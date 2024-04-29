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

export interface MockEmailMetadata {
    id: string;
    title: string;
    rating: number;
}
export interface MockEmailMetadataResponse {
    data: MockEmailMetadata[];
    total: number;
    skip: number;
    limit: number;
}