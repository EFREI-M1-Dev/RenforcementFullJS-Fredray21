import { User } from './User';
import { UserService } from './UserService';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string, email: string, password: string): User {
        this.checkUsername(username);
        this.checkEmail(email);
        this.checkPassword(password);

        return this.userService.add(username, email, password);
    }

    getById(id: number): User | null {
        this.checkId(id);

        return this.userService.getById(id);
    }

    remove(id: number): Boolean {
        this.checkId(id);

        return this.userService.remove(id);
    }

    getAll(): User[] {
        return this.userService.getAll();
    }


    // 1. id est un entier positif
    private checkId(id: number): void {
        const idRegex = /^(0|[1-9]\d*)$/;
        if (!idRegex.test(String(id))) {
            throw new Error('Id is not valid, must be a positive integer');
        }
    }

    // 2. username n'est pas vide
    private checkUsername(username: string): void {
        const usernameRegex = /^\s*$/;
        if (usernameRegex.test(username)) {
            throw new Error('Username is empty');
        }
    }

    // 3. email est valide
    private checkEmail(email: string): void {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!emailRegex.test(email)) {
            throw new Error('Email is not valid');
        }
    }

    // 4. password est assez fort (au moins 8 caractères, une majuscule, une minuscule et un chiffre)
    private checkPassword(password: string): void {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error('Password is not strong enough');
        }
    }
}
