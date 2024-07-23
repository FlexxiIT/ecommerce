import { isUUID } from "../../../config";




export class RegisterSenderDto {

    constructor(
        public readonly clientId: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly documentType: string,
        public readonly documentId: string,
        public readonly phone: string,
        public readonly cellPhone: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterSenderDto?] {

        const { clientId, firstName, lastName, email, password, documentType, documentId, phone, cellPhone } = object;

        if(!clientId) return ['Missing client id'];
        if(!isUUID(clientId)) return['Client id is not a valid id'];
        if(!firstName) return ['Missing first name'];
        if(!lastName) return ['Missing last name'];
        if(!email) return ['Missing email'];
        if(!password) return ['Missing password'];
        if(!documentType) return ['Missing document Type'];
        if(!documentId) return ['Missing document Id'];
        if(!phone) return ['Missing phone'];
        if(!cellPhone) return ['Missing cellPhone'];

        return [undefined, new RegisterSenderDto(
            clientId,
            firstName,
            lastName,
            email,
            password,
            documentType,
            documentId,
            phone,
            cellPhone,
        )];

    }

}