// src/app/models/ticket.model.ts
export interface Ticket {
    id: number;
    creationDateTime: string;
    phoneNumber: string;
    governorate: string;
    city: string;
    district: string;
    isHandled: boolean;
}
