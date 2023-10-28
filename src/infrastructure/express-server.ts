import express from 'express';
import { ExpressRouter } from './express-router';

export class ExpressServer {
    private express = express();

    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.setupMiddleware();
        this.configureRoutes();
    }

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }

    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
    }

    private setupMiddleware(): void {
        // Middleware pour analyser les données du formulaire
        this.express.use(express.urlencoded({ extended: false }));

        // Middleware pour analyser les données JSON
        this.express.use(express.json());
    }
}
