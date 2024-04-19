import { JwtAdapter, bcryptAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import { ClientEntity, CustomError } from "../../domain";
import { LoginClientDto } from "../../domain/dtos/login-client.dto";
import { RegisterClientDto } from "../../domain/dtos/register-client.dto";




export class AuthService {

    constructor() { }

    public async registerUser(registerClientDto: RegisterClientDto) {

        const existUser = await prisma.client.findFirst({ where: { email: registerClientDto.email } });
        if (existUser) throw CustomError.badRequest('Email already exist');

        try {

            // Hashear la contraseña
            const hashedPassword = await bcryptAdapter.hash(registerClientDto.password);

            // Crear el usuario en la base de datos
            const newUser = await prisma.client.create({
                data: {
                    ...registerClientDto,
                    password: hashedPassword,
                },
            });

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

}