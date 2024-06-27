export interface Inquiry {
    id: string;
    inquiry: string;
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

export interface InquiryPopupData {
    id: string;     // can be removed if not needed later
    inquiry: string;
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

export interface InquiryDataResponse {
    inquiries: Inquiry[];
    total: number;
    skip: number;
    limit: number;
}

// END


// BUG: REMOVE in Production (everything with name Mock___)
export interface MockInquiryMetadata {
    id: string;
    title: string;
    rating: number;
    tags: string[];
    meta: {
        createdAt: Date;
    };
}
export interface MockInquiryMetadataResponse {
    products: MockInquiryMetadata[];
    total: number;
    skip: number;
    limit: number;
}

export interface MockInquiryAdditionalDataResponse {
    title: string;
    body: string;
}
// ---