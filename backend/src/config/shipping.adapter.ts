import { RegisterSenderDto } from "../domain/dtos/shipping/register-sender.dto";
import { envs } from "./envs";

interface completeRegisterBody {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    documentType: string,
    documentId: string,
    phone: string,
    cellPhone: string,
    address: AddressInfo,
}

export interface AddressInfo {
    streetName: string
    streetNumber: string
    floor: string
    apartment: string
    locality: string
    city: string
    state: string
    provinceCode: string
    postalCode: string
}


export class ShippingAdapter {

    constructor() { }

    static async registerSender(registerSenderDto: RegisterSenderDto, addressInfo: AddressInfo) {

        const {clientId, ...registerInfoFromDto} = registerSenderDto;

        const registerInfo: completeRegisterBody = { ...registerInfoFromDto, address: addressInfo }

        return registerInfo

    }

    static validateSender() {

    }

    static getRates() {

    }

    static importShipping() {

    }

}