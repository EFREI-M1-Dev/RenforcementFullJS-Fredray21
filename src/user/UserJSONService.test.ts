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

    it('doit supprimer un utilisateur', () => {
        fsMock.readFileSync.mockReturnValue(JSON.stringify(dataTest));
        const isDeleted = userService.remove(2);
        expect(isDeleted).toBeTruthy();
    });

    describe('add', () => {
        it('doit ajouter un utilisateur', () => {
            fsMock.existsSync.mockReturnValue(true); // Simuler l'existence du fichier
            fsMock.readFileSync.mockReturnValue(JSON.stringify(dataTest));
            fsMock.writeFileSync.mockImplementation(() => {}); // Éviter d'écrire réellement dans le fichier

            const user = userService.add(
                'user3',
                'emailUser2@user.com',
                'paSsw0rd-(',
            );

            expect(user).not.toBeNull();
            expect(user?.getId()).toBe(3);
        });

        it('username pas valide', () => {
            const usernameNotValid: string[] = [
                ' ',
                '  ',
                '   ',
                '    ',
                '     ',
                '      ',
                '       ',
                '        ',
                '         ',
                '          ',
                '           ',
                '            ',
            ];

            usernameNotValid.forEach((username) => {
                expect(() =>
                    userService.add(
                        username,
                        'emailValide@emailvalide.com',
                        'paSsw0rd-(',
                    ),
                ).toThrowError('Username is empty');
            });
        });

        //regex email : const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

        it('email pas valide', () => {
            const emailNotValid: string[] = [
                'email',
                'email@',
                'email@.',
                'email@.com',
                'email@.com.a.',
                'email@.com.a.b',
            ];

            emailNotValid.forEach((email) => {
                expect(() =>
                    userService.add('username', email, 'paSsw0rd-('),
                ).toThrowError('Email is not valid');
            });

            // regex password : const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            it('password pas valide', () => {
                const passwordNotValid: string[] = [
                    'pass',
                    'passwor',
                    'password1',
                    'passwordA',
                    'password1Aa',
                    'password1Aa(',
                ];

                passwordNotValid.forEach((password) => {
                    expect(() =>
                        userService.add('username', 'emailValide@emailvalide.com', password),
                    ).toThrowError('Password is not strong enough');
                });

            });




        });
    });
});
