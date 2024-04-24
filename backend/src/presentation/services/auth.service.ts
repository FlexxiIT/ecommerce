import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { prisma } from "../../data/postgres";
import { ClientEntity, CustomError } from "../../domain";
import { LoginClientDto } from "../../domain/dtos/login-client.dto";
import { RegisterClientDto } from "../../domain/dtos/register-client.dto";
import { EmailService } from "./email.service";




export class AuthService {

    //DI
    constructor(
        private readonly emailService: EmailService
    ) { }

    public async registerUser(registerClientDto: RegisterClientDto) {

        const existUser = await prisma.client.findFirst({ where: { email: registerClientDto.email } });
        if (existUser) throw CustomError.badRequest('Email already exist');

        try {

            // Hashear la contraseña
            const hashedPassword = await bcryptAdapter.hash(registerClientDto.password);

            // Crear el usuario en la base de datos
            const newUser = await prisma.client.create({
                data: {
                    email: registerClientDto.email,
                    name: registerClientDto.name,
                    surname: registerClientDto.surname,
                    phoneNumber: registerClientDto.surname,
                    password: hashedPassword,
                },
            });

            //Enviar mail de confirmación
            this.sendEmailValidationLink(newUser.email);

            // Generar token JWT
            const token = await JwtAdapter.generateToken({ id: newUser.id });
            if (!token) throw CustomError.internalServer('Error while creating JWT');

            // Eliminar la contraseña del objeto de respuesta
            const { password, ...clientEntity } = ClientEntity.fromObject(newUser);

            return {
                user: { clientEntity },
                token: token,
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    };

    public async loginUser(loginClientDto: LoginClientDto) {

        try {

            const user = await prisma.client.findFirst({ where: { email: loginClientDto.email } });
            if (!user) throw CustomError.badRequest('Invalid email or password');

            const hasMatched = bcryptAdapter.compare(loginClientDto.password, user.password);

            if (!hasMatched) throw CustomError.badRequest('Invalid email or password');

            const { password, ...clientEntity } = ClientEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({ id: user.id });
            if (!token) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: { ...clientEntity },
                token: token,
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    private sendEmailValidationLink = async (email: string) => {

        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEB_URL}validate-email/${token}`;
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        };

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer('Error sending email');

        return true;

    }

    public validateEmail = async (token: string) => {

        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Email not in token');

        const user = await prisma.client.findFirst({ where: { email } });
        if (!user) throw CustomError.internalServer('Email not exists');

        if(user.emailValidated === true) throw CustomError.badRequest('The email was already validated');

        // Actualizar el campo emailValidated a true
        await prisma.client.update({
            where: { id: user.id },
            data: { emailValidated: true },
        });

        // Si la actualización se realiza con éxito, se devuelve true
        return true;
    }

}