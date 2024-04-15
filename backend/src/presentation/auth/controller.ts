import { Request, Response } from "express";
import { CustomError, RegisterClientDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { LoginClientDto } from "../../domain/dtos/login-client.dto";



export class AuthController {

    //DI
    constructor(
        public readonly authService: AuthService,
    ) {}

    private handleError = (res: Response, error: unknown) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });

    };

    registerUser = (req: Request, res: Response) => {

        const [error, registerDto] = RegisterClientDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authService.registerUser(registerDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(res, error));

    };

    loginUser = (req: Request, res: Response) => {

        const [error, loginDto] = LoginClientDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authService.loginUser(loginDto!)
            .then(user => res.json({user}))
            .catch(error => this.handleError(res, error));

    };

    validateEmail = (req: Request, res: Response) => {

        res.json('validate');

    };

}