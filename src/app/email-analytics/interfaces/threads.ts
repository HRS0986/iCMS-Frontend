export interface Thread {
    subject: string;
    type?: "hot" | "normal";
    snippet: string;
    summary: string;
    lastUpdate: Date;
    tags: string[];
}

export interface ThreadResponse {
    threads: Thread[];
    total: number;
    skip: number;
    limit: number;
}

export interface ThreadConversationSummary {
    summary: string;
}