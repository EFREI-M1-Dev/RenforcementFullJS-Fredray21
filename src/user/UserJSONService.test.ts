import { UserJSONService } from './UserJSONService';
import * as fs from 'fs';

// mock permettant de simuler le comportement de fs sans toucher au système de fichier
jest.mock('fs');
const fsMock = fs as jest.Mocked<typeof fs>;

const dataTest = [
    {
        id: 1,
        username: 'user1',
        email: 'email.test@email.com',
        password: 'paSsw0rd-(',
    },
    {
        id: 2,
        username: 'user2',
        email: 'email.test@email.com',
        password: 'paSsw0rd-(',
    },
];

describe('UserJSONService', () => {
    let userService: UserJSONService;

    beforeEach(() => {
        userService = new UserJSONService();
        jest.resetAllMocks();
    });

    it("doit renvoyer un utilisateur par son identifiant s'il existe", () => {
        fsMock.readFileSync.mockReturnValue(JSON.stringify(dataTest));

        const user = userService.getById(2);
        expect(user).not.toBeNull();
        expect(user?.getId()).toBe(2);
    });

    it("devrait renvoyer null pour un identifiant qui n'existe pas", () => {
        fsMock.readFileSync.mockReturnValue(JSON.stringify(dataTest));

        const user = userService.getById(12);
        expect(user).toBeNull();
    });

    it('doit renvoyer tous les utilisateurs', () => {
        fsMock.readFileSync.mockReturnValue(JSON.stringify(dataTest));

        const users = userService.getAll();
        expect(users).toHaveLength(2);
        expect(users[0].getId()).toBe(1);
        expect(users[1].getId()).toBe(2);
    });

    it('doit ajouter un utilisateur', () => {
        fsMock.existsSync.mockReturnValue(true); // Simuler l'existence du fichier
        fsMock.readFileSync.mockReturnValue(JSON.stringify(dataTest));
        fsMock.writeFileSync.mockImplementation(() => {}); // Éviter d'écrire réellement dans le fichier

        const user = userService.add('user3', 'emailUser2@user.com', 'paSsw0rd-(');

        expect(user).not.toBeNull();
        expect(user?.getId()).toBe(3);
    });

    it('doit supprimer un utilisateur', () => {
        fsMock.readFileSync.mockReturnValue(JSON.stringify(dataTest));
        const isDeleted = userService.remove(2);
        expect(isDeleted).toBeTruthy();
    });
});
