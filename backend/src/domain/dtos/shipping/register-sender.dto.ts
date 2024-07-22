



export class RegisterSenderDto {

    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly documentType: string,
        public readonly documentId: string,
        public readonly phone: string,
        public readonly cellPhone: string,
        public readonly addressId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterSenderDto?] {

        const { firstName, lastName, email, password, documentType, documentId, phone, cellPhone, addressId } = object;

        return [undefined, new RegisterSenderDto(
            firstName,
            lastName,
            email,
            password,
            documentType,
            documentId,
            phone,
            cellPhone,
            addressId
        )];

    }

}