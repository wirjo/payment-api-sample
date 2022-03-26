import { Account } from './Account.interface';

class AccountService {

    id: number;
    accounts : Account[] = [
        {
            id: 1,
            balance: 1000,
        }
    ];

    constructor(id: number) {
        this.id = id;
    }

    get = async () : Promise<Account | null> => this.find(this.id);

    find = async (id: number) : Promise<Account | null> => this.accounts.find(a => a.id == id) ?? null;

    updateBalance = (balance: number) : Account | null => {
        const index = this.accounts.findIndex(a => a.id == this.id);
        this.accounts[index].balance = balance;
        return this.accounts[index] ?? null;
    }

 }

export default AccountService;