export interface Issue {
    id: string;     // can be removed if not needed later
    issue: string;
    isNew: boolean;
    isOverdue: boolean;
    isClosed: boolean;
    sender: string;
    recipient: string;
    dateOpened: Date;
    dateClosed?: Date;
    tags: string[];
    effectivity: number;
    efficiency: number;
}

export interface IssueMetaDataResponse {
    data: Issue[];
    total: number;
    skip: number;
    limit: number;
}

// BUG: REMOVE in Production (everything with name Mock___)
export interface MockIssueMetadata {
    id: string;
    title: string;
    rating: number;
    tags: string[];
    meta: {
        createdAt: Date;
    };
}
export interface MockIssueMetadataResponse {
    products: MockIssueMetadata[];
    total: number;
    skip: number;
    limit: number;
}
// ---