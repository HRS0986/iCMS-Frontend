export interface Issue {
    id: string;     // can be removed if not needed later
    issue: string;
    subject: string;
    status: 'new' | 'waiting' | 'update' | 'closed';
    client: string;
    company: string;
    dateOpened: Date;
    dateClosed?: Date;
    dateUpdate?: Date;
    isOverdue?: boolean;
    tags: string[];
    effectivity?: number;
    efficiency?: number;
}

// export interface IssueAdditionalData {
//     gibberish: string;  
// }

export interface PopupEmail {
    body: string;
    isClient: boolean;
    dateTime: Date;
}
export interface IssuePopupData {
    id: string;     // can be removed if not needed later
    issue: string;
    subject: string;
    status: 'new' | 'waiting' | 'update' | 'closed';
    client: string;
    company: string;
    dateOpened: Date;
    dateClosed?: Date;
    dateUpdate?: Date;
    isOverdue?: boolean;
    tags: string[];
    effectivity?: number;
    efficiency?: number;
    dateOverdue: Date;
    firstResponseTime?: number; // in minutes
    avgResponseTime?: number;   // in minutes
    resolutionTime?: number;    // in minutes
    sentiment?: number;
    emails: PopupEmail[];
}

export interface IssueMetaDataResponse {
    issues: Issue[];
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


// export interface MockIssueAdditionalDataResponse {
//     title: string;
//     body: string;
// }