export interface Issue {
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