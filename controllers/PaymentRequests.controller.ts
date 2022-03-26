import { Request, Response } from 'express';
import PaymentRequestService from '../classes/PaymentRequest.service';
import { CreatePaymentRequestDTO } from '../classes/dto/PaymentRequest.dto';
import { validateOrReject } from 'class-validator';
import { CreateBeneficiaryDTO } from '../classes/dto/Beneficiary.dto';
import { plainToClass } from 'class-transformer';
import AuthService from '../classes/Auth.service';
import { EditPaymentRequestDTO } from '../classes/dto/PaymentRequest.dto';

class PaymentRequestController {
    service: PaymentRequestService;

    constructor() {
        this.service = new PaymentRequestService();
    }

    create = async (req: Request, res: Response) : Promise<Response> => {
        try {
            const createPaymentRequest = plainToClass(CreatePaymentRequestDTO, req.body);
            createPaymentRequest.payment_date = new Date(createPaymentRequest.payment_date);
            createPaymentRequest.beneficiary = plainToClass(CreateBeneficiaryDTO, createPaymentRequest.beneficiary);
            await validateOrReject(createPaymentRequest, { whitelist: true, validationError: { target: false }});
            const paymentRequest = await this.service.create(createPaymentRequest);

            // Output with account balance
            const accountService = AuthService.account();
            const account = await accountService.get();
            return res.status(200).json({ account: account, ...paymentRequest });
        } catch(e) {
            return res.status(500).json(e);
        }
    }

    findAll = async (req: Request, res: Response) : Promise<Response> => {
        try {
            const paymentRequests = await this.service.findAll();
            return res.status(200).json(paymentRequests);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    find = async (req: Request, res: Response) : Promise<Response> => {
        try {
            const { id } = req.params;
            const paymentRequest = await this.service.find(parseInt(id));
            return res.status(200).json(paymentRequest);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    edit = async (req: Request, res: Response) : Promise<Response> => {
        try {
            const { id } = req.params;
            const editPaymentRequest = plainToClass(EditPaymentRequestDTO, req.body);
            if ( editPaymentRequest.payment_date )
                editPaymentRequest.payment_date = new Date(editPaymentRequest.payment_date);
            if ( editPaymentRequest.beneficiary ) 
                editPaymentRequest.beneficiary = plainToClass(CreateBeneficiaryDTO, req.body.beneficiary);
            await validateOrReject(editPaymentRequest, { whitelist: true, skipMissingProperties: true, validationError: { target: false }});
            const paymentRequest = await this.service.edit(parseInt(id), editPaymentRequest);
            return res.status(200).json(paymentRequest);
        } catch (e) {
            return res.status(500).json(e);
        }
    }


}

export default PaymentRequestController;