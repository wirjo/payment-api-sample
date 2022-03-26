import { MinLength, IsNumberString, Length } from "class-validator";
import { Beneficiary } from '../Beneficiary.interface';

export class CreateBeneficiaryDTO implements Beneficiary {
    @MinLength(3)
    name: string = '';

    @IsNumberString()
    @Length(6,6)
    bsb: string = '';

    @IsNumberString()
    @Length(7,9)
    account: string = '';
}