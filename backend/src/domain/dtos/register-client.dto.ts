import { regularExps } from "../../config/regular-exp";




export class RegisterClientDto {

    private constructor(
        public email: string,
        public password: string,
        public confirmPassword: string,
        public DNI: string,
        public name: string,
        public surname: string,
        public phoneNumber: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterClientDto?] {

        const { email, password, confirmPassword, DNI, name, surname, phoneNumber } = object;

        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (!confirmPassword) return ['Missing confirm password'];

        if(password !== confirmPassword) return ['The password must be equal to the confirm password']

        if (password.length < 8 && password.length > 20) return ['The password must have at least 8 minimum caracters and 20 maximum caracters'];
        if (!name) return ['Missing name'];
        if (!surname) return ['Missing surname'];
        if (!phoneNumber) return ['Missing phone number'];

        return [undefined, new RegisterClientDto(email, password, confirmPassword, DNI, name, surname, phoneNumber)];

    };

}