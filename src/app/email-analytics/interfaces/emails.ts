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


// BUG: REMOVE in Production (everything with name Mock___)
export interface MockEmailMetadata {
    id: string;
    title: string;
    rating: number;
}
export interface MockEmailMetadataResponse {
    products: MockEmailMetadata[];
    total: number;
    skip: number;
    limit: number;
}
// ---