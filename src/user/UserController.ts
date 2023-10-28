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


    // checks
    private checkId(id: number): void {
        if(id < 0) throw new Error('Id is not valid');
        if(isNaN(id) || !Number.isInteger(id)) throw new Error('Id is not valid');
    }

    private checkUsername(username: string): void {
        if(username.trim() === '') throw new Error('Username is empty');
    }

    private checkEmail(email: string): void {
        if(!email.includes('@')) throw new Error('Email is not valid');
    }

    private checkPassword(password: string): void {
        if(password.length < 8) throw new Error('Password is not strong enough');
    }
}
