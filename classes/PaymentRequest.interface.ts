import { Beneficiary } from './Beneficiary.interface';

export enum PaymentStatus {
    SCHEDULED = 'SCHEDULED',
    PROCESSING = 'PROCESSING',
    PROCESSED = 'PROCESSED',
}

export interface PaymentRequest {
    id: number;
    created_at: Date,
    account_id: number,
    amount: number,
    beneficiary: Beneficiary,
    description: string,
    status: PaymentStatus,
    payment_date: Date,
}