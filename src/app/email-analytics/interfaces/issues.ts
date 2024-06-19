export interface Issue {
    id: string;     // can be removed if not needed later
    issue: string;
    isOverdue?: boolean;
    status: 'New' | 'Waiting' | 'Update' | 'Closed';
    sender: string;
    recipient: string;
    dateOpened: Date;
    dateClosed?: Date;
    dateUpdate?: Date;
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
    emails: PopupEmail[];
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


// export interface MockIssueAdditionalDataResponse {
//     title: string;
//     body: string;
// }