import { regularExps } from "../../../config/regular-exp";




export class RegisterClientDto {

    private constructor(
        public email: string,
        public password: string,
        public confirmPassword: string,
        public name: string,
        public surname: string,
        public phoneNumber: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterClientDto?] {

        const { email, password, confirmPassword, name, surname, phoneNumber } = object;

        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (!confirmPassword) return ['Missing confirm password'];

        if (password.length < 8 || password.length > 20) return ['The password must have at least 8 minimum caracters and 20 maximum caracters'];
        
        if(password !== confirmPassword) return ['The password must be equal to the confirm password']

        if (!name) return ['Missing name'];
        if (name.length < 3 || name.length > 20) return ['The name must have at least 3 minimum caracters and 20 maximum caracters'];
        if (!surname) return ['Missing surname'];
        if (surname.length < 3 || surname.length > 20) return ['The surname must have at least 3 minimum caracters and 20 maximum caracters'];
        if (!phoneNumber) return ['Missing phone number'];

        return [undefined, new RegisterClientDto(email, password, confirmPassword, name, surname, phoneNumber)];

    };

}