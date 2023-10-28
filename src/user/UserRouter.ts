import { Router,NextFunction } from 'express';
import { UserController } from './UserController';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        //add
        this.router.post('/', (req, res,next) => {
            try {
                const result = this.userController.add(
                    req.body.username,
                    req.body.email,
                    req.body.password,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        //delete
        this.router.delete('/:id', (req, res,next) => {
            try {
                const result = this.userController.remove(
                    Number(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        //get
        this.router.get('/:id', (req, res,next) => {
            try {
                const result = this.userController.getById(
                    Number(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        //all
        this.router.get('/', (req, res,next) => {
            try {
                const result = this.userController.getAll();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
