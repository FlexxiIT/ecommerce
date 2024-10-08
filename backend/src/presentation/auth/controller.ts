import { Request, Response } from "express";
import { RegisterClientDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { LoginClientDto } from "../../domain/dtos/auth/login-client.dto";
import { handleError } from "../../config";



export class AuthController {

    //DI
    constructor(
        public readonly authService: AuthService,
    ) { }

    registerUser = (req: Request, res: Response) => {

        const [error, registerDto] = RegisterClientDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authService.registerUser(registerDto!)
            .then(user => res.json(user))
            .catch(error => handleError(res, error));

    };

    loginUser = (req: Request, res: Response) => {

        const [error, loginDto] = LoginClientDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authService.loginUser(loginDto!)
            .then(user => res.json({ user }))
            .catch(error => handleError(res, error));

    };

    validateEmail = (req: Request, res: Response) => {

        const { token } = req.params;

        this.authService.validateEmail(token)
            .then(() => res.json('Email was validated properly'))
            .catch(error => handleError(res, error));

    };

}