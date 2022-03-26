import { IsDate, IsEmpty, IsInt, IsObject, IsString, MaxDate, Min, MinDate, MinLength, ValidateNested } from "class-validator";
import calculateBusinessDays from "../../util/calculateBusinessDays";
import { PaymentRequest, PaymentStatus } from '../PaymentRequest.interface';
import { CreateBeneficiaryDTO } from './Beneficiary.dto';

const today = new Date(new Date().getDate());

export class EditPaymentRequestDTO implements Partial<PaymentRequest> {

    @IsEmpty()
    id: number;

    @IsEmpty()
    account_id: number;

    @IsEmpty()
    created_at: Date;

    @IsEmpty()
    status: PaymentStatus;

    @IsInt()
    @Min(0, {
       message: 'Please enter a payment amount greater than zero'
    })
    amount: number;
    
    @MinLength(3)
    description: string;

    @IsObject()
    @ValidateNested()
    beneficiary: CreateBeneficiaryDTO;

    @IsDate()
    @MinDate(today, {
        message: 'You can only schedule payments in the future'
    })
    @MaxDate(calculateBusinessDays(new Date(), 20), {
        message: 'You can only schedule payments within 20 business days'
    })
    payment_date: Date;

}

export class CreatePaymentRequestDTO extends EditPaymentRequestDTO {

    @IsInt()
    id: number = new Date().getTime();

    @IsDate()
    created_at: Date = new Date();

    @IsInt()
    account_id: number = 0;

    @IsString()
    status: PaymentStatus = PaymentStatus.PROCESSING;

    @IsDate()
    payment_date : Date = today;

}