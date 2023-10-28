import { User } from './User';
import { UserService } from './UserService';
import * as fs from 'fs';

export class UserJSONService implements UserService {

    private filePath: string = "./src/data/userData.json";

    add(username: string, email: string, password: string): User {
        const users: User[] = fs.existsSync(this.filePath) ? this.getAll() : [];

        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync('./src/data', { recursive: true });
            fs.writeFileSync(this.filePath, '[]', 'utf8');
        }

        // Trouver l'ID le plus élevé parmi les utilisateurs existants
        const maxId = users.reduce(
            (max, user) => Math.max(max, user.getId()),
            0,
        );

        // Trouver un ID unique en incrémentant
        let newUserId = maxId + 1;
        while (users.find((user) => user.getId() === newUserId)) {
            newUserId++;
        }

        const newUser = new User(newUserId, username, email, password);

        users.push(newUser);

        // Écrire les utilisateurs dans le fichier JSON
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(users),
            'utf8',
        );

        return newUser;
    }

    remove(id: number): Boolean {
        const users = this.getAll();
        const index = users.findIndex((user) => user.getId() === id);
        if (index === -1) {
            return false;
        }
        users.splice(index, 1);
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(users),
            'utf8',
        );
        return true;
    }

    getAll(): User[] {
        try {
            // Read JSON User file
            const data = fs.readFileSync(this.filePath, 'utf8');
            const jsonData = JSON.parse(data);

            // Créer des instances de User à partir des données JSON
            return jsonData.map((userJson: any) => {
                return new User(
                    userJson.id,
                    userJson.username,
                    userJson.email,
                    userJson.password,
                );
            });
        } catch (e) {
            if (
                e instanceof Error &&
                (e as NodeJS.ErrnoException).code === 'ENOENT'
            ) {
                // En cas d'erreur, par exemple si le fichier n'existe pas, renvoyez un tableau vide
                console.error(
                    "Une erreur s'est produite lors de la lecture du fichier userData.json:",
                    e,
                );
                return [];
            } else {
                throw e;
            }
        }
    }

    getById(id: number): User | null {
        const users = this.getAll();
        const index = users.findIndex((user) => user.getId() === id);
        if (index === -1) {
            return null;
        }
        return users[index];
    }
}
