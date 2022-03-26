import AccountService from './Account.service';

class AuthService {
    private static accountService: AccountService;
    private constructor() { }

    public static account() : AccountService {
        const currentAccountId = 1;

        if ( !AuthService.accountService ) {
            this.accountService = new AccountService(currentAccountId);
        }

        return this.accountService;
    }

}

export default AuthService;