export interface Issue {
    id: string;     
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
    effectivity?: string;
    efficiency?: string;
}

export interface PopupEmail {
    body: string;
    isClient: boolean;
    dateTime: Date;
}
export interface IssuePopupData {
    id: string;    
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
    effectivity?: string;
    efficiency?: string;
    dateOverdue: Date;
    firstResponseTime?: number; // in minutes
    avgResponseTime?: number;   // in minutes
    resolutionTime?: number;    // in minutes
    sentiment?: number;
    emails: PopupEmail[];
}

export interface IssueDataResponse {
    issues: Issue[];
    total: number;
    skip: number;
    limit: number;
}

// END

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