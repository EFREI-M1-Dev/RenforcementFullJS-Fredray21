import { Router,NextFunction } from 'express';
import { UserController } from './UserController';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/add-user', (req, res,next) => {
            try {
                const { username, email, password } = req.body;
                const newUser = this.userController.add(username, email, password);
                res.status(201).json(newUser);
            } catch (error: unknown) {
                //res.status(400).json({ message: error });
                next(error);
            }
        });

        this.router.get('/:id', (req, res,next) => {
            try {
                const result = this.userController.getById(
                    Number(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                //res.status(400).json({ message: error });
                next(error);
            }
        });
    }
}
