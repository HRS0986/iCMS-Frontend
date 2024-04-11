import { Email } from './email';

export interface Summary {
    id: string;
    subject: string;
    sentiment: string;
    receiver: string;
    sender: string;
    summary: string;      
}

export interface EmailThread {
    id: string;
    subject: string;
    emails: Email[];
}