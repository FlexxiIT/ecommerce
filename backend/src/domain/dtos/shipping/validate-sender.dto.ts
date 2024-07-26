



export class ValidateSenderDto {

    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, ValidateSenderDto?] {

        const { email, password } = object;

        if (!email) return ['Missing email'];
        if (!password) return ['Missing password'];

        return [undefined, new ValidateSenderDto(
            email,
            password
        )];

    }

}