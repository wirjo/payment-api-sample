import { PaymentRequest } from './PaymentRequest.interface';

class PaymentRequestRepository {
    paymentRequests: PaymentRequest[];

    constructor() {
        this.paymentRequests = [];
    }

    async create(paymentRequest: PaymentRequest) : Promise<PaymentRequest> {
        this.paymentRequests.push(paymentRequest);
        return paymentRequest; 
    }

    find = async (id: number) : Promise<PaymentRequest | null> => this.paymentRequests.find(p => p.id == id) ?? null;

    findAll = async () : Promise<PaymentRequest[]> => this.paymentRequests;

    async edit(id: number, newPaymentRequest: Partial<PaymentRequest>) : Promise<PaymentRequest> {
        const paymentRequest = await this.find(id);
        if (!paymentRequest)
            throw Error("Cannot find payment request");
        const index = this.paymentRequests.findIndex(p => p.id == id);
        this.paymentRequests[index] = { ...paymentRequest, ...newPaymentRequest };
        return this.paymentRequests[index];
    }
}

export default PaymentRequestRepository;