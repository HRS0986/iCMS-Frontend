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
