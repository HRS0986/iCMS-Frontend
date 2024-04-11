export interface Email {
    id: string;
    date: Date;
    body: string;
    sentiment: string;
    sender: string;
    receiver: string;
}