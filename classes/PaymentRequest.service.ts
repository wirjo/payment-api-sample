import PaymentRequestRepository from './PaymentRequest.repository';
import { PaymentRequest, PaymentStatus } from './PaymentRequest.interface';
import AuthService from './Auth.service';
import AccountService from './Account.service';
import calculateBusinessDays from '../util/calculateBusinessDays';

class PaymentRequestService extends PaymentRequestRepository {
    accountService: AccountService;

    constructor() {
        super();
        this.accountService = AuthService.account();
    }

    async create(paymentRequest: PaymentRequest) : Promise<PaymentRequest> {
        // Process payment
        paymentRequest.id = new Date().getTime();
        paymentRequest.created_at = new Date();
        paymentRequest = await this.processPaymentDate(paymentRequest);
        paymentRequest = await this.processPaymentToAccount(paymentRequest);
        const createdPaymentRequest = await super.create(paymentRequest);
        return createdPaymentRequest;
    }

    async edit(id: number, paymentRequest: Partial<PaymentRequest>) : Promise<PaymentRequest> {
        const originalPaymentRequest = await this.find(id);
        const editPaymentRequest = { ...originalPaymentRequest, ...paymentRequest } as PaymentRequest;
        paymentRequest = await this.processPaymentDate(editPaymentRequest);
        paymentRequest = await this.processPaymentToAccount(editPaymentRequest);
        const updatedPaymentRequest = await super.edit(id, editPaymentRequest);
        return updatedPaymentRequest;
    }

    async processPaymentDate(paymentRequest: PaymentRequest) : Promise<PaymentRequest> {
        const { payment_date } = paymentRequest;

        if ( !payment_date )
            return paymentRequest;

        const today = new Date(new Date().getDate());
        const nextBusinessDay = calculateBusinessDays(today, 1);
        const processPayment = payment_date >= today && payment_date <= nextBusinessDay;
        if ( processPayment ) {
            paymentRequest.status = PaymentStatus.PROCESSING;
        } else {
            paymentRequest.status = PaymentStatus.SCHEDULED;
        }
        return paymentRequest;
    }

    async processPaymentToAccount(paymentRequest: PaymentRequest) : Promise<PaymentRequest> {

        const { accountService } = this;
        const account = await accountService.get();

        if ( account ) 
            paymentRequest.account_id = account.id;

        if ( paymentRequest.status != PaymentStatus.PROCESSING )
            return paymentRequest;

        // Retrieve account balance
        const accountBalance = await account?.balance ?? 0;
        
        // Process payment if there is sufficient balance
        if ( accountBalance > paymentRequest.amount  ) {
            const updatedAccountBalance = accountBalance - paymentRequest.amount;
            await accountService.updateBalance(updatedAccountBalance);
            paymentRequest.status = PaymentStatus.PROCESSED;
        } else {
            throw new Error("Insufficient balance");
        }
        
        return paymentRequest;
    }

 }

export default PaymentRequestService;