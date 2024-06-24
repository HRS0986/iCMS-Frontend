export interface Filter {
    selectedSenders: string[];
    selectedReceivers: string[];
    selectedTags: string[];
    reqAllTags: boolean;
    selectedStatus: string[];
    selectedDate: Date[];
    searchText: string;
    importantOnly: boolean;
    newOnly: boolean;    
}

export interface AllTags {
    tags: string[];
}

export interface AllStatus {
    status: string[];
}

export interface AllCompanyAddresses {
    company_addresses: string[];
}

export interface ClientAddresses {
    client_addresses: string[];
}