import { Router } from 'express';
import { UserService } from '../user/UserService';
import { UserRouter } from '../user/UserRouter';
import { UserController } from '../user/UserController';

export class ExpressRouter {
    router = Router();
    private userController!: UserController;
    private userRouter!: UserRouter;

    constructor(private UserService: UserService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.UserService);
    }

    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
    }

    private configureRoutes(): void {
        this.router.use('/user', this.userRouter.router);
    }
}
