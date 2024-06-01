export interface Inquiry {
    id: string;
    inquiry: string;
    inquiry_type: string;
    status: string;
    isNew: boolean;
    isNewUpdate: boolean;
    isAnswered: boolean;
    dateInquired: Date;
    dateAnswered?: Date;
    lastUpdate?: Date;
    tags: string[];
    sender: string;
    recipient: string;
    effectivity: number;
    efficiency: number;
}

export interface InquiryAdditionalData {
    gibberish: string;  // TODO: replace with actual data
}

export interface InquiryMetaDataResponse {
    data: Inquiry[];
    total: number;
    skip: number;
    limit: number;
}

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