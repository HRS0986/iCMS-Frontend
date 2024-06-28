export interface Suggestion {
    // id: string;
    suggestion: string;
    dateSuggested: Date;
    tags: string[];
    company: string;
}

export interface SuggestionResponse {
    suggestions: Suggestion[];
    total: number;
    skip: number;
    limit: number;
}

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

// ---Ranindu added interface
export interface SuggestionsData{
    receiver: string;
    date: string;
    products: string[];
    suggestion: string;
}

export interface RecepientsResponse{
   recepients: string[];
}

export interface ProductsResponse{
    products: string[];
 }
   
