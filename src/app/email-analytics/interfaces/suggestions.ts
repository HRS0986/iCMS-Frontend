export interface Suggestion {
    id: string;
    suggestion: string;
    isNew: boolean;
    isPopular: boolean;
    dateSuggested: Date;
    tags: string[];
    sender: string;
    recipient: string;
}

// Ranindu added interface
export interface SuggestionsData{
        receiver: string
        date: string
        products: string[]
        suggestion: string
}

export interface SuggestionMetaDataResponse {
    data: Suggestion[];
    total: number;
    skip: number;
    limit: number;
}

// export interface SuggestionAdditionalData {
//     gibberish: string;
// }

export interface PopupEmail {
    body: string;
    isClient: boolean;
    dateTime: Date;
}
export interface SuggestionPopupData {
    emails: PopupEmail[];
}
// BUG: REMOVE in Production (everything with name Mock___)
export interface MockSuggestionMetadata {
    id: string;
    title: string;
    rating: number;
    tags: string[];
    meta: {
        createdAt: Date;
    };
}
export interface MockSuggestionMetadataResponse {
    products: MockSuggestionMetadata[];
    total: number;
    skip: number;
    limit: number;
}


export interface MockSuggestionAdditionalDataResponse {
    title: string;
    body: string;
}

// ---