import { CustomError } from "../errors/custom-error";




export class ClientEntity {

    constructor(
        public id: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public name: string,
        public surname: string,
        public phoneNumber: string,
        public DNI?: string,
        
    ) { }

    static fromObject(object: { [key: string]: any }): ClientEntity {

        const { id, email, emailValidated, password, name, surname, phoneNumber, DNI } = object;

        
        if (!id) throw CustomError.badRequest('Missing id');
        if (!email) throw CustomError.badRequest('Missing email');
        if (emailValidated === undefined) throw CustomError.badRequest('Missing emailValidated');
        if (!password) throw CustomError.badRequest('Missing password');
        if (!name) throw CustomError.badRequest('Missing name');
        if (!surname) throw CustomError.badRequest('Missing surname');
        if (!phoneNumber) throw CustomError.badRequest('Missing phoneNumber');

        return new ClientEntity(id, email, emailValidated, password, name, surname, phoneNumber, DNI);

    };

};