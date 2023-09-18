import { User } from './User';
import { UserService } from './UserService';

export class UserJSONService implements UserService {
    add(username: string, email: string, password: string): User {
        throw new Error('Method not implemented.');
    }

    remove(id: number): Boolean {
        throw new Error('Method not implemented.');
    }

    getAll(): User[] {
        throw new Error('Method not implemented.');
    }

    getById(id: number): User | null {
        return new User(1, 'username', 'email', 'password');
        //throw new Error('Method not implemented.');
    }
}
